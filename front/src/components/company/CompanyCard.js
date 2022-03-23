import { Card, Row } from "react-bootstrap";

function CompanyCard({ user }) {
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={user?.img}
            alt="회사 사진을 넣어주세요"
          />
        </Row>
        <Card.Title>{user?.company}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Card.Text>{user?.location}</Card.Text>
        <Card.Text>{user?.employees}</Card.Text>
        <Card.Link>{user?.hompage}</Card.Link>
      </Card.Body>
    </Card>
  );
}
export default CompanyCard;
