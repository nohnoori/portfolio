import React, { useState, useContext } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import { EducationsContext } from "./Educations";

function EducationAddForm({ setIsAdding, portfolioOwnerId }) {
  const { setEducations } = useContext(EducationsContext);
  const [schoolLevel, setSchoolLevel] = useState("고등학교");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = portfolioOwnerId;

    await Api.post("education", {
      user_id: userId,
      school,
      major,
      position,
      schoolLevel,
    });

    const res = await Api.get("educations", userId);
    // res로 받은 data를 educations으로 설정
    setEducations(res.data);
    // 추가 완료 후에는 추가 폼을 닫아줌
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check
          inline
          label="고등학교"
          id="level1"
          type="checkbox"
          name="level"
          value="고등학교"
          checked={schoolLevel === "고등학교"}
          onChange={(e) => setSchoolLevel(e.target.value)}
        />

        <Form.Check
          inline
          label="대학교/대학원"
          id="level2"
          type="checkbox"
          name="level"
          value="대학교/대학원"
          checked={schoolLevel === "대학교/대학원"}
          onChange={(e) => setSchoolLevel(e.target.value)}
        />
      </div>

      {schoolLevel === "고등학교" && (
        <>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="학교 명"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
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
              label="졸업"
              id="radio2"
              type="radio"
              name="position"
              value="졸업"
              checked={position === "졸업"}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </>
      )}
      {schoolLevel === "대학교/대학원" && (
        <>
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
        </>
      )}

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

export default EducationAddForm;
