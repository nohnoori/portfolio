import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import Education from "./Education";
import EducationAddForm from "./EducationAddFrom";

function Educations({ isEditable }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // 임시 데이터
  const education = {
    school: "땡땡 학교",
    major: "땡떙 전공",
    position: "학사졸업",
  }
  
  return(
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>

          <Education 
            education={education}
            setEducation={setEducations}
            isEditable={isEditable}
          />

          {isEditable && (
            <Row className="mt-3 text-center mb-4">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}

          {isAdding && (
            <EducationAddForm 
              setIsAdding={setIsAdding}
            />
          )}

      </Card.Body>
    </Card>
  )
}

export default Educations;