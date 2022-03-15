import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker';

function ProjectEditForm({ currentProject, setIsEditing }) {
  const [title, setTitle] = useState(currentProject.title);
  const [description, setDescription] = useState(currentProject.description);
  const [startDate, setStartDate] = useState(new Date(currentProject.from_date));
  const [endDate, setEndDate] = useState(new Date(currentProject.to_date));

  return(
    <Form>
      <Form.Group controlId="formBasicTitle" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 상세내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3">
        <Col md="auto">
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Col>
        <Col md="auto">
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
          <Button variant="primary" type="submit" className="me-3">확인</Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default ProjectEditForm;