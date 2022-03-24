import react, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

function CompanyEditForm({ user, setIsEditing, setUser }) {
  const [summary, setSummary] = useState(user.description.summary);
  const [location, setLocation] = useState(user.description.location);
  const [headCount, setHeadCount] = useState(user.description.headCount);
  const [benefit, setBenefit] = useState(user.description.benefit);
  const [homepage, setHomepage] = useState(user.description.homepage);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      email: "nexon@nexon.com",
      name: "넥슨",
      password: "1234",
      description: {
        img: "https://grepp-programmers.s3.amazonaws.com/production/company/logo/2710/logo.jpg",
        location: location,
        headCount: headCount,
        homepage: homepage,
        summary: summary,
        benefit: benefit,
      },
    });
    setIsEditing(false);
  };
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Editdetail" className="mb-3">
            <Form.Label>짧은 회사 소개를 적어주세요.</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Detail"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditLocation" className="mb-3">
            <Form.Label>회사 위치</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="위치"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditHeadCount" className="mb-3">
            <Form.Label>사원수</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="사원수"
              value={headCount}
              onChange={(e) => setHeadCount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditBenefit" className="mb-3">
            <Form.Label>복지</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="복지"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditHomepage" className="mb-3">
            <Form.Label>홈페이지</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="홈페이지"
              value={homepage}
              onChange={(e) => setHomepage(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CompanyEditForm;
