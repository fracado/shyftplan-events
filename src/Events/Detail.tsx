import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import doApiCall from '../helper/api';
import moment from 'moment';
import Event from '../sharedTypes/eventType';
import Employee from '../sharedTypes/employeeType';

type EventDetailProps = {
    location: {
        state: {
            id: number
        }
    }
};

type EventDetail = Event & {
    employees: Employee[]
};

const Detail = (props: EventDetailProps) => {
    const [event, setEvent] = useState({} as EventDetail);
    const { location: {state: {id}} } = props;
    let history = useHistory();

    useEffect(() => {
        doApiCall(`events/${id}`)
            .then((response) => {
                setEvent(response);
            });
    }, [id]);

    const redirectToList = () => {
        history.push("/");
    };

    return (
        <>
            <p>
                {event.position?.name}
                {moment(event.startsAt).format('DD.MM.YYYY HH:mm')}
                {moment(event.endsAt).format('DD.MM.YYYY HH:mm')}
                {event.employees && event.employees.map((employee) => (
                        <>
                           <span>
                               {employee.firstName} {employee.lastName}
                           </span>
                            <img src={employee.image} alt={`${employee.firstName} ${employee.lastName} avatar`} />
                        </>
                    ))
            }
            </p>
            <button type='button' onClick={redirectToList}>
                Back to list
            </button>
        </>
    )
};

export default Detail;
