import { Card, Button, Row, Col } from "react-bootstrap";

function EducationCard({ isEditable, setIsEditing }) {
  return(
    <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>땡땡 학교</span>
            <br/>
            <span>땡떙 전공</span>
          </Col>
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
    </Card.Text>
  )
}

export default EducationCard;