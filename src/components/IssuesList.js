import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";

const IssuesList = ({ issues, owner, repoName }) => {
  return (
    <Container className="issues">
      {issues.length === 0 && (
        <Jumbotron fluid>
          <Container>
            <h2>Oops!</h2>
            <p>
              It seems [<b>{owner}</b>] doesn't have open issues for [{repoName}].
            </p>
            <p>Try another repositories.</p>
          </Container>
        </Jumbotron>
      )}

      {issues.map((item, index) => {
        return (
          <Row className="issues-row justify-content-between" key={index}>
            <Col xs={3} className="issues-cell">
              {item.node.title}
            </Col>
            <Col xs={3} className="issues-cell text-left">                   
              {new Date(item.node.createdAt).getDate()}.{new Date(item.node.createdAt).getMonth()+1}.{new Date(item.node.createdAt).getFullYear()}{"  "}by{"  "}{item.node.author.login}      
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default IssuesList;