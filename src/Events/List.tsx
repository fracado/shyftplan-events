import React, {useEffect, useState} from 'react';
import doApiCall from '../helper/api';
import Event from '../sharedTypes/eventType';
import ListItem from './ListItem';
import Pagination from '../Common/Pagination';
import Filter from '../Common/Filter';

const List = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(1);
    const [count, setCount] = useState(0);
    const [events, setEvents] = useState<Event[]>([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        doApiCall(`events?limit=${limit}&offset=${offset}`)
            .then((response) => {
                setEvents(response.items);
                setCount(response.pagination.count);
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

    if (pending) {
        return <>
            Loading...
        </>;
    }

    return (
        <>
        <Filter limit={limit} offset={offset} handleFilterChange={handleFilterChange} />
        <br />
        <Pagination count={count} limit={limit} handlePageChange={handlePageChange} />
        {events.map((event) =>
            <ListItem
                startsAt={event.startsAt}
                endsAt={event.endsAt}
                id={event.id}
                position={event.position}
            /> )}
        <button type='button' onClick={handleLoadMore} disabled={events.length+1 === count}>
            Load more
        </button>
        </>
    )
};

export default List;
