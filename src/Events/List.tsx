import React, {useEffect, useState} from 'react';
import doApiCall from '../helper/api';
import Event from '../sharedTypes/eventType';
import ListItem from './ListItem';

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

    if (pending) {
        return <>
            Loading...
        </>;
    }

    return (
        <>
        {events.map((event) =>
            <ListItem
                startsAt={event.startsAt}
                endsAt={event.endsAt}
                id={event.id}
                position={event.position}
            /> )}
        </>
    )
};

export default List;
