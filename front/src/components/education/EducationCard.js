import { Card, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
// 하위 컴포넌트
import EducationEditForm from "./EducationEditForm";

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false) 
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function EducationCard({ education, isAuthorized }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 폼이 보이는지 여부

  return(
    <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{education.school}</span>
            <br/>
            <span>{education.major}{"  "}</span>
            <span>{education.position}</span>
          </Col>

          {isEditing && (
            <Row className="mt-5">
              <EducationEditForm
                currentEducation={education}
                setIsEditing={setIsEditing}
              />
            </Row>
          )}

          {isAuthorized && (
            <Col xs lg="1">
              {!isEditing ? (         // 편집 버튼을 누르면 isEditing이 true가 되면서 편집 버튼이 사라지고 폼만 보임
                <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>)
                : (<div>{}</div>)
              }
            </Col>
          )}
        </Row>
    </Card.Text>
  )
}

export default EducationCard;