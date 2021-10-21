import React, {useEffect, useState} from 'react';
import doApiCall from '../helper/api';
import Event from '../sharedTypes/eventType';
import ListItem from './ListItem';
import Pagination from '../Common/Pagination';
import Filter from '../Common/Filter';
import AlertMessage from '../Common/Alert';
import Header from '../Common/Header';
import { Button, Container, InputGroup, Spinner, Table } from 'react-bootstrap';

const List = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(1);
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState<Event[]>([]);
    const [pending, setPending] = useState(true);
    const [errors, setErrors] = useState<number|null>(null);

    useEffect(() => {
        doApiCall(`events?limit=${limit}&offset=${offset}`)
            .then((response) => {
                if (response.items) {
                    setEvents(response.items);
                    setCount(response.pagination.count);
                } else handleErrors(response)
            })
            .then(() => setPending(false))
    }, [limit, offset]);

    const handleLoadMore = () => {
        setLimit(limit + 10);
    };

    const handlePageChange = (pageNum: number) => {
        setOffset(pageNum);
        setLimit(10);
    };

    const handleFilterChange = (events: Event[], count: number) => {
        setEvents(events);
        setCount(count);
    };

    const handleErrors = (error: number) => {
        setErrors(error);
    };

    if (pending) {
        return <Container id="spinner-container" className="d-flex align-items-center justify-content-center mt-10">
            <Spinner id="spinner" animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    }

    return (
        <>
        <Header />
        {errors && <AlertMessage error={errors} />}
        <Container className="mt-3">
            <InputGroup className="mb-3">
                <Filter limit={limit} offset={offset} handleFilterChange={handleFilterChange} handleErrors={handleErrors} />
            </InputGroup>
            <br />
            <Pagination count={count} limit={limit} currentPage={offset} handlePageChange={handlePageChange} />
            <Table striped hover>
                <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Starts at</th>
                    <th>Ends at</th>
                </tr>
                </thead>
                <tbody>
                {events.map((event) =>
                    <ListItem
                        startsAt={event.startsAt}
                        endsAt={event.endsAt}
                        id={event.id}
                        position={event.position}
                    />
                )}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleLoadMore} disabled={events.length+1 === count}>
                Load More
            </Button>
        </Container>
        </>
    )
};

export default List;
