import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>        
        <Row>
          <Col lg={12} className="text-center mt-5">
            <p className="copy text-white-50">Copyright Reserved to Tetiana Zaslon. { new Date().getFullYear()}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;