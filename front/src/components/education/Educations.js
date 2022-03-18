import React, { useEffect, useState, createContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";

// 하위 컴포넌트
import EducationCard from "./EducationCard";
import EducationAddForm from "./EducationAddFrom";
// educations 상태 관리
export const EducationsContext = createContext();


function Educations({ isEditable, portfolioOwnerId }) {
  const [educations, setEducations] = useState([]); // 받아올 데이터
  const [isAdding, setIsAdding] = useState(false); // 추가 폼이 보이는지 여부

  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId)
      .then((res) => setEducations(res.data));
  }, [portfolioOwnerId]);
  
  return(
    <EducationsContext.Provider value={{ setEducations }}>
      <Card>
          <Card.Body>
            <Card.Title>학력</Card.Title>
              {educations.map((education) => (
                <EducationCard 
                  key={education.id}
                  education={education}
                  isEditable={isEditable}
                />
              ))}

              {/* 추가 버튼 */}
              {isEditable && (
                <Row className="mt-3 text-center mb-4">
                  <Col>
                    <Button onClick={() => setIsAdding(true)}>+</Button>
                  </Col>
                </Row>
              )}

              {/* 추가 폼 */}
              {isAdding && (
                <EducationAddForm
                  portfolioOwnerId={portfolioOwnerId}
                  setIsAdding={setIsAdding}
                />
              )}
          </Card.Body>
      </Card>
    </EducationsContext.Provider>
  )
};

export default Educations;