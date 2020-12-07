import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'

const UsersList = ({users, handler}) => {
  return(
    <CardDeck>
      {users.map((item, index) => (
        <Card key={index} href=" " className="text-center user-card card" onClick={(e) => {e.preventDefault(); handler(item.node.login);}}>
          <Card.Img variant="top" src={item.node.avatarUrl} />
          <Card.Body>
            <Card.Title>{item.node.login}</Card.Title>  
          </Card.Body>
        </Card>
      ))}
    </CardDeck>
  );
};

export default UsersList;