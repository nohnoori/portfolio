import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CertificateAddForm({
  setIsAdding,
  portfolioOwnerId,
  setCertificates,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = portfolioOwnerId;

    await Api.post("certificate", {
      user_id: userId,
      title,
      description,
      when_date: whenDate,
    });

    const res = await Api.get("certificates", userId); // certificatelist
    setCertificates(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="자격증 내용"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-2">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-3">
        <DatePicker
          selected={whenDate}
          onChange={(date) => setWhenDate(date)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
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
  );
}

export default CertificateAddForm;
