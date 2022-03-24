import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

import { CareersContext } from "./Careers";

function CareerEditForm({ currentCareer, setIsEditing }) {
  const { setCareers } = useContext(CareersContext);
  const [title, setTitle] = useState(currentCareer.title);
  const [description, setDescription] = useState(currentCareer.description);
  const [startDate, setStartDate] = useState(new Date(currentCareer.from_date));
  const [endDate, setEndDate] = useState(new Date(currentCareer.to_date));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentCareer.user_id;

    await Api.put(`career/${currentCareer.id}`, {
      user_id: userId,
      title,
      description,
      from_date: startDate,
      to_date: endDate,
    });

    // ? 1. 수정된 정보 GET요청
    // ? 2. 수정된 정보 careers에 저장
    // ? 3. 편집 폼 종료
    const res = await Api.get("careers", userId);
    setCareers(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="회사 이름"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col md="auto">
          <DatePicker
            selected={startDate}
            dateFormat="yyyy.MM.dd"
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col md="auto">
          <DatePicker
            selected={endDate}
            dateFormat="yyyy.MM.dd"
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CareerEditForm;
