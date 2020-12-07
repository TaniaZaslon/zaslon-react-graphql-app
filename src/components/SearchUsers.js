import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SearchUsers = ({handler}) => {
  const [user, setUser] = useState("");

  return (
    <Form onSubmit={(e) => {e.preventDefault(); handler(user);}}>
      <Form.Row className="justify-content-center">
        <Col xs={4}>
          <Form.Control type="text" value={user} placeholder="Search Users..." onChange={(e) => setUser(e.target.value)} />
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" type="submit">Submit</Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchUsers;