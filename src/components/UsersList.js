import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { setActive } from '../utils/userList';

const UsersList = ({users, handler}) => {
  
  const handlerClick = (e, userLogin) => {
    e.preventDefault(); 
    handler(userLogin); 
    setActive("users-list", e.target);
  };

  return(
    <CardDeck id="users-list" className="justify-content-center">
      {/* Comment */}
      {users.map((item, index) => (
        <Card key={index} href=" " as="a" className="text-center user-card" onClick={(e) => {handlerClick(e, item.node.login)}}>
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