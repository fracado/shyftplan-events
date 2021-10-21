import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import doApiCall from '../helper/api';
import moment from 'moment';
import Event from '../sharedTypes/eventType';
import Employee from '../sharedTypes/employeeType';
import AlertMessage from '../Common/Alert';
import {Row, Col, Container, Card, ListGroup, Button} from 'react-bootstrap';

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
    const [errors, setErrors] = useState<number|null>(null);
    const { location: {state: {id}} } = props;
    let history = useHistory();

    useEffect(() => {
        doApiCall(`events/${id}`)
            .then((response) => {
                if (response.id) {
                    setEvent(response);
                } else handleErrors(response)
            });
    }, [id]);

    const redirectToList = () => {
        history.push("/");
    };

    const handleErrors = (error: number) => {
        setErrors(error);
    };

    return (
        <>
            {errors && <AlertMessage error={errors} />}
            <Container className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Button variant="primary" onClick={redirectToList}>
                            Back to list
                        </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card style={{ width: '19rem' }}>
                            <Card.Body>
                                <Card.Title>Event Details</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <b>Name: </b>
                                        {event.position?.name}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Starts at: </b>
                                        {moment(event.startsAt).format('DD.MM.YYYY HH:mm')}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Ends at: </b>
                                        {moment(event.endsAt).format('DD.MM.YYYY HH:mm')}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card.Title>Employees</Card.Title>
                        {event.employees &&
                        <Row xs={2} md={4} className="g-4">
                            {event.employees.length === 0 ? <p>No employees found</p> : event.employees.map((employee) => (
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={employee.image} alt={`${employee.firstName} ${employee.lastName} avatar`} loading="lazy" />
                                        <Card.Body>
                                            <Card.Text>{employee.firstName} {employee.lastName}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>}
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        </>
    )
};

export default Detail;
