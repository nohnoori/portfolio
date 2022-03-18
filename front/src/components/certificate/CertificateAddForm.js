import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CertificateAddForm({ setIsAdding, portfolioOwnerId, setCertificates }) {
  const [certificateName, setCertificateName] = useState("");
  const [detail, setDetail] = useState("");
  
  const [startDate, setStartDate] = useState(new Date)

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
    
    await Api.post("certificate/create", {
      user_id: portfolioOwnerId,
      certificateName,
      detail,
      startDate,
    });

    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    setIsAdding(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicCertificateName" className="mt-3">
        <Form.Control 
          type="text"
          placeholder="자격증 내용"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDetail" className="mt-3">
        <Form.Control 
          type="text"
          placeholder="상세내역"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <div style={{ textAlign: "left" }}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default CertificateAddForm;