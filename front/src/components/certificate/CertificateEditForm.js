import React, {useState} from 'react';
import { Button, Form, Card, Col, Row } from "react-bootstrap";

function CertificateEditForm () {
  const [ certificate, setCertificate ] = useState("")
  const [ awards, setAwards ] = useState('')

  return (
        <Form>
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
            <input placeholder='03/16/2022'></input>
          </div>
          <Button variant="primary" size="lg">
            확인
          </Button>{' '}
          <Button variant="secondary" size="lg">
            취소
          </Button>
        </Form>
  )
}

export default CertificateEditForm