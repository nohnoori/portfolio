import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
// 하위 컴포넌트
import CareerEditForm from "./CareerEditForm";

function CareerCard({ career, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{career.title}</span>
          <br />
          <span>{career.description}</span>
          <br />
          <span>
            {career.from_date.slice(0, 10)} ~ {career.to_date.slice(0, 10)}
          </span>
        </Col>

        {isEditing && (
          <Row className="mt-3">
            <CareerEditForm
              currentCareer={career}
              setIsEditing={setIsEditing}
            />
          </Row>
        )}

        {isEditable && (
          <Col xs lg="1">
            {!isEditing ? (
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            ) : (
              <div>{}</div>
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CareerCard;
