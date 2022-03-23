import React, { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

import { ProjectsContext } from "./Projects";

/**
 * 추가 폼 컴포넌트
 * @param setIsAdding true이면 추가 폼이 보여지고, false이면 추가 폼이 사라짐
 * @param portfolioOwnerId Portfolio -> Projects로부터 전달받은 인자 : {portfolioOwner.id}
 * @return 프로젝트 제목, 상세내용, 시작날짜,종료날짜, 확인/취소 버튼
 */

function ProjectAddForm({ portfolioOwnerId, setIsAdding }) {
  const { setProjects } = useContext(ProjectsContext);
  const [title, setTitle] = useState(""); // 프로젝트 제목
  const [description, setDescription] = useState(""); // 프로젝트 상세내용
  const [startDate, setStartDate] = useState(new Date()); // 프로젝트 시작일
  const [endDate, setEndDate] = useState(new Date()); // 프로젝트 종료일

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = portfolioOwnerId;

    await Api.post("project", {
      user_id: userId,
      title,
      description,
      from_date: startDate,
      to_date: endDate,
    });

    const res = await Api.get("projects", userId);
    setProjects(res.data);
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col md="auto">
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col>
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

export default ProjectAddForm;
