import React, { useState, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import { EducationsContext } from "./Educations";

function EducationEditForm({ currentEducation, setIsEditing }) {
  const { setEducations } = useContext(EducationsContext);
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = currentEducation.user_id;
    // put 요청
    await Api.put(`educations/${currentEducation.id}`, {
      user_id,
      school,
      major,
      position,
    });

    // ? 1. 수정된 정보 GET요청
    // ? 2. 수정된 정보 educations에 저장
    // ? 3. 편집 폼 종료
    const res = await Api.get("educationlist", user_id);
    setEducations(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="학교 명"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className="mt-2">
        <Form.Control
          type="text"
          placeholder="전공 명"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="재학중"
          id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

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
  );
}

export default EducationEditForm;
