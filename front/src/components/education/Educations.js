import React, { useEffect, useState, createContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddFrom";
// Context를 위한 객체 정의
export const EducationsContext = createContext();

/**
 * 가장 큰 틀의 학력 컴포넌트
 * @param isEditable Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param portfolioOwnerId Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id} 
 * @return 학력 정보 작은 틀 컴포넌트(Education)와 추가 폼 컴포넌트(EducationAddForm)
 */

function Educations({ isEditable , OwnerId }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Context를 위해 정의
  const isAuthorized = isEditable;
  const portfolioOwnerId = OwnerId;

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId)
      .then((res) => setEducations(res.data));
  }, [portfolioOwnerId]);
  
  return(
    <EducationsContext.Provider value={{ isAuthorized, portfolioOwnerId }}>
      <Card>
        <Card.Body>
          <Card.Title>학력</Card.Title>
            {educations.map((education) => (
              <Education
                key={education.id}
                education={education}
                setEducations={setEducations}
              />
            ))}
      
            {/* // ? 1. isEditable이 true일 때 추가 버튼을 보여줌
                // ? 2. 추가 버튼을 누르면 IsAdding을 true로 바꿈
                // ? 3. isAdding이 true일 때 EducationAddForm을 보여줌
            */}
            {isAuthorized && (
              <Row className="mt-3 text-center mb-4">
                <Col >
                  <Button onClick={() => setIsAdding(true)}>+</Button>
                </Col>
              </Row>
            )}
            {isAdding && (
              <EducationAddForm
                setIsAdding={setIsAdding}
                setEducations={setEducations}
              />
            )}
        </Card.Body>
      </Card>
    </EducationsContext.Provider>
  )
}

export default Educations;