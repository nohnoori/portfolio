import React, { useState, useContext, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import { EducationsContext } from "./Educations";

function EducationEditForm({ currentEducation, setIsEditing }) {
  const { setEducations } = useContext(EducationsContext);
  const [schoolLevel, setSchoolLevel] = useState(currentEducation.schoolLevel);
  const [school, setSchool] = useState(currentEducation.school);
  const [major, setMajor] = useState(currentEducation.major);
  const [position, setPosition] = useState(currentEducation.position);

  // 대학교/대학원 선택 시 전공을 작성하였는지 여부 확인
  const [isMajorValid, setIsMajorValid] = useState(true);

  useEffect(() => {
    if (schoolLevel === "UNIV") {
      setIsMajorValid(major.length > 0);
    } else {
      setMajor(null);
      setIsMajorValid(true);
    }
  }, [schoolLevel, major]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentEducation.user_id;
    // put 요청
    await Api.put(`education/${currentEducation.id}`, {
      user_id: userId,
      school,
      major,
      position,
      schoolLevel,
    });

    const res = await Api.get("educations", userId);
    setEducations(res.data);
    setIsEditing(false);
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
          value="HIGH"
          checked={schoolLevel === "HIGH"}
          onChange={(e) => setSchoolLevel(e.target.value)}
        />

        <Form.Check
          inline
          label="대학교/대학원"
          id="level2"
          type="checkbox"
          name="level"
          value="UNIV"
          checked={schoolLevel === "UNIV"}
          onChange={(e) => setSchoolLevel(e.target.value)}
        />
      </div>

      {schoolLevel === "HIGH" && (
        <>
          <Form.Group className="mb-2">
            <Form.Control
              type="text"
              placeholder="학교명"
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

      {schoolLevel === "UNIV" && (
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
            {!isMajorValid && (
              <Form.Text className="text-success">
                전공을 입력해주세요
              </Form.Text>
            )}
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
          <Button
            variant="primary"
            type="submit"
            className="me-3"
            disabled={!isMajorValid}
          >
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
