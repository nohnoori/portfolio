import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

/**
 * 추가 폼 컴포넌트
 * @param setIsAdding true이면 추가 폼이 보여지고, false이면 추가 폼이 사라짐
 * @param portfolioOwnerId Portfolio -> Educations로부터 전달받은 인자 : {portfolioOwner.id}
 * @param setEducations Educations 컴포넌트로부터 전달받은 인자 : {setEducations} : educations의 상태 관리 함수 
 * @return 학교 명, 전공 명, 학적 상태 입력 폼, 확인 버튼, 취소 버튼
 */

function EducationAddForm({ setIsAdding, portfolioOwnerId, setEducations }) {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("재학중")
  
  // TODO : 데이터 전송 , 나중에 Form에 onSubmit 집어넣기
  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = portfolioOwnerId;
  
    await Api.post("education/create", {
      user_id: portfolioOwnerId,
      school,
      major,
      position,
    });

    // const res = await Api.get("educationlist", user_id);
    // // res로 받은 data를 educations으로 설정
    // setEducations(res.data);
    // // 추가 완료 후에는 추가 폼을 닫아줌
    setIsAdding(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicSchool" className="mt-3">
        <Form.Control 
          type="text"
          placeholder="학교 명"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicMajor" className="mt-3">
        <Form.Control 
          type="text"
          placeholder="전공 명"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
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
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default EducationAddForm;