import React, {useState} from 'react';
import doApiCall from "../helper/api";
import EventProps from '../sharedTypes/eventType';

type FilterProps = {
    limit: number,
    offset: number,
    handleFilterChange: (events: EventProps[], count: number) => void,
};

const Filter = ({limit, offset, handleFilterChange}: FilterProps): JSX.Element => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const filterQuery = `&startsAt=${start}&endsAt=${end}`;

    const handleDateTimeFilter = (filterQuery: string|null) => {
        doApiCall(`events?limit=${limit}&offset=${offset}`+filterQuery)
            .then((response) => handleFilterChange(response.items, response.pagination.count))
        };

    return (
        <>
            <label htmlFor="start-at">Start at</label>
            <input
                type="datetime-local"
                id="start-at"
                name="start-at"
                value={start}
                onChange={e => setStart(e.target.value)}
            />
            <label htmlFor="end-at">End at</label>
            <input
                type="datetime-local"
                id="end-at"
                name="end-at"
                value={end}
                min={start}
                onChange={e => setEnd(e.target.value)}
            />
            <button type='button' onClick={() => handleDateTimeFilter(filterQuery)}>
                Filter
            </button>
            <button type='button' onClick={() => {
                setStart("");
                setEnd("");
                handleDateTimeFilter(null);
            }}>
                Clear Filter
            </button>
        </>
    );
};

export default Filter;
