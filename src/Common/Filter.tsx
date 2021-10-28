import React, {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';

type FilterProps = {
    handleFilterChange: (filterQuery: string|null) => void,
};

const Filter = ({handleFilterChange}: FilterProps): JSX.Element => {
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const filterQuery = `&startsAt=${start}&endsAt=${end}`;

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
            <Button variant="primary" onClick={() => handleFilterChange(filterQuery)}>Filter</Button>
            <Button className='m-3' variant="light" onClick={() => {
                setStart("");
                setEnd("");
                handleFilterChange(null);
            }}>Clear Filter</Button>
        </Form>
    );
};

export default Filter;
