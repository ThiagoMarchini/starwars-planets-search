import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Header() {
  return(
    <Container>
      <Row>
        <Col>
          <Image src="/images/generic.png" height="100px" rounded />
        </Col>
        <Col xs={6}>
          <h1>Star Wars Planets Info</h1>
        </Col>
        <Col>
          <Image src="/images/alderaan.png"  height="100px" rounded />
        </Col>
      </Row>
    </Container>
  )
}

export default Header;