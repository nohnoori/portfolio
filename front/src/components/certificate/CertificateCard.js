import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {
  return(
    <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{certificate.certificateName}</span>
            <br/>
            <span>{certificate.detail}{"  "}</span>
            <span>{certificate.startDate}</span>
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

export default CertificateCard;