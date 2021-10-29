import React from 'react';
import Event from '../sharedTypes/eventType';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const ListItem = ({startsAt, endsAt, id, position}: Event): JSX.Element => {
    let history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: `/event/${id}`,
            state: {
                id: id
            }
        });
    };

    return (
        <tr className='list-item' role="button" tabIndex={0} onClick={handleClick}>
            <td>{position?.name}</td>
            <td>{moment(startsAt).format('DD.MM.YYYY HH:mm')}</td>
            <td>{moment(endsAt).format('DD.MM.YYYY HH:mm')}</td>
        </tr>
    )
};

export default ListItem;