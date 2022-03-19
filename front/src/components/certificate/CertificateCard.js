import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  const date = certificate.when_date.substring(0,10);
  return(
    <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{certificate.title}</span>
            <br/>
            <span>{certificate.description}</span>
            <br/>
            <span>{date}</span>
          </Col>
          {isEditable && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                className="mr-3"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
    </Card.Text>
  )
}

export default CertificateCard;