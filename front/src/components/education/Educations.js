import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import Education from "./Education";
import EducationAddForm from "./EducationAddFrom"
// import EducationAddForm from "./EducationAddForm";

function Educations({ isEditable }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  
  return(
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>

          <Education />

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