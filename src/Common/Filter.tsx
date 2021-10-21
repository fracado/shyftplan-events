import React, {useState} from 'react';
import doApiCall from "../helper/api";
import EventProps from '../sharedTypes/eventType';
import {Button, Col, Form, Row} from 'react-bootstrap';

type FilterProps = {
    limit: number,
    offset: number,
    handleFilterChange: (events: EventProps[], count: number) => void,
    handleErrors: (error: number) => void
};

const Filter = ({limit, offset, handleFilterChange, handleErrors}: FilterProps): JSX.Element => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const filterQuery = `&startsAt=${start}&endsAt=${end}`;

    const handleDateTimeFilter = (filterQuery: string|null) => {
        doApiCall(`events?limit=${limit}&offset=${offset}`+filterQuery)
            .then((response) => {
                (response && response.items) ? handleFilterChange(response.items, response.pagination.count) : handleErrors(response)
            })
    };

    return (
        <Form id="filter-form">
            <Form.Label as="h6">Filter</Form.Label>
            <Form.Text className="text-muted pb-2">Select date and time range</Form.Text>
            <Row className="mt-3">
                <Form.Group as={Row} controlId="start-at" className="mb-3">
                    <Form.Label column>Starts at</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            as="input"
                            type="datetime-local"
                            name="start-at"
                            value={start}
                            onChange={e => setStart(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="end-at" className="mb-3">
                    <Form.Label column>Ends at</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            as="input"
                            type="datetime-local"
                            name="end-at"
                            min={start}
                            value={end}
                            onChange={e => setEnd(e.target.value)}
                        />
                    </Col>
                </Form.Group>
            </Row>
            <Button variant="primary" onClick={() => handleDateTimeFilter(filterQuery)}>Filter</Button>
            <Button className='m-3' variant="light" onClick={() => {
                setStart("");
                setEnd("");
                handleDateTimeFilter(null);
            }}>Clear Filter</Button>
        </Form>
    );
};

export default Filter;
