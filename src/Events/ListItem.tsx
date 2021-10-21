import React from 'react';
import Event from '../sharedTypes/eventType';
import moment from 'moment';

const ListItem = ({startsAt, endsAt, id, position}: Event): JSX.Element => {
    return (
        <tr>
            <td>{position?.name}</td>
            <td>{moment(startsAt).format('DD.MM.YYYY HH:mm')}</td>
            <td>{moment(endsAt).format('DD.MM.YYYY HH:mm')}</td>
        </tr>
    )
};

export default ListItem;