import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";

const RepositoriesList = ({ repos, owner, handler }) => {
  return (
    <Container className="repos">
      {repos.length === 0 && (
        <Jumbotron fluid>
          <Container>
            <h2>Oops!</h2>
            <p>
              It seems [<b>{owner}</b>] doesn't
              have repos yet.
            </p>
            <p>Try another user.</p>
          </Container>
        </Jumbotron>
      )}
      {repos.map((item, index) => {
        return (
          <Row className="repos-row justify-content-between" key={index} onClick={(e) => {e.preventDefault(); handler(item.node.name)}}>
            <Col xs={3} className="repos-cell">
              {item.node.name}
            </Col>
            <Col xs={3} className="repos-cell text-center">
              {item.node.stargazerCount} start / {item.node.watchers.totalCount}{" "}
              watching
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default RepositoriesList;