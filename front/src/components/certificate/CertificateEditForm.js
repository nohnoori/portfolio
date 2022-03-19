import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  const [title, setTitle] = useState(currentCertificate.title);
  const [description, setDescription] = useState(currentCertificate.description);
  const [when_date, setWhen_date] = useState(new Date());

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = currentCertificate.user_id;
    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      title,
      description,
      when_date,
   setWhen_date });

    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="자격증 내용"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-2">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group className="mt-3">
        <DatePicker
          selected={when_date}
          onChange={(date) => setWhen_date(date)} />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
      
    </Form>
  )
}

export default CertificateEditForm;