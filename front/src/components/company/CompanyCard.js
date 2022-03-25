import { Card, Row, Col, Button } from "react-bootstrap";

function CompanyCard({ user, setIsEditing, isEditable }) {
  //
  isEditable = true;

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            src={user?.description.img}
            className="mb-3"
            alt="회사 사진을 넣어주세요"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {user?.description.summary}
        </Card.Subtitle>
        <hr />
        <div>사원수</div>
        <div className="mb-2 text-muted mb-1">
          {user?.description.headCount}명
        </div>
        <div>복지</div>
        <div className="mb-2 text-muted mb-1">{user?.description.benefit}</div>
        <div>위치</div>
        <div className="mb-2 text-muted mb-1">{user?.description.location}</div>
        <div>홈페이지</div>
        <div className="mb-2 text-muted mb-1">{user?.description.homepage}</div>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}
export default CompanyCard;
