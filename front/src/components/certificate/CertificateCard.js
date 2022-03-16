import React, {useState} from 'react';
import { Card, Row, Button, Col, Form } from "react-bootstrap";

function CertificateCard() {
  const certificateCard = {
    title: '운전면허증',
    description: '운전면허증임',
    date: '2022-03-16'
  }
  return (
    <Card.Text>
      <Row>
        <Col>
          <span>{certificateCard.title}</span><br />
          <Form.Text className="text-muted">
            <span>{certificateCard.description}</span><br />
            <span>{certificateCard.date}</span><br />
          </Form.Text>
        </Col>
        <Col xs lg="1">
          <Button
             variant="outline-info"
             className='mr-3 btn-sm'
          >
            편집
          </Button>
        </Col>
      </Row>
    </Card.Text>
  )
}

export default CertificateCard