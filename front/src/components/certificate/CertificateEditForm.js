import React, {useState} from 'react';
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import Certificate from './Certificate'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CertificateEditForm () {
  const [ certificate, setCertificate ] = useState("")
  const [ awards, setAwards ] = useState('')
  const [ startDate, setStartDate ] = useState(new Date)

  return (
    <Form className="mb-2">
      <Form.Group className="mt-3">
        <Form.Control 
          type="text"
          placeholder="자격증 제목"
          value={certificate}
          onChange={(e) => setAwards(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3 mb-3">
        <Form.Control 
          type="text"
          placeholder="상세내역"
          value={awards}
          onChange={(e) => setAwards(e.target.value)}
        />
      </Form.Group>
      <div style={{ textAlign: "left" }}>
        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
      </div>
      <Button variant="primary" size="20" className="me-3">
        확인
      </Button>{' '}
      <Button variant="secondary" size="20">
        취소
      </Button>
    </Form>
  )
}

export default CertificateEditForm