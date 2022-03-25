import react, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

function CompanyEditForm({ user, setIsEditing, setUser }) {
  const [description, setDescription] = useState(user?.description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;
    await Api.put(`company/${user.id}`, {
      description,
    });

    await Api.get("company", userId).then((res) => setUser(res.data));
    setIsEditing(false);
  };
  console.log("회사 간단", user);
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Editdetail" className="mb-3">
            <Form.Label>
              짧은 회사 소개를 적어주세요.
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Detail"
              value={description.summary}
              onChange={(e) =>
                setDescription({ ...description, summary: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="EditLocation" className="mb-3">
            <Form.Label>
              회사 위치
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="위치"
              value={description.location}
              onChange={(e) =>
                setDescription({ ...description, location: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="EditHeadCount" className="mb-3">
            <Form.Label>
              사원수
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="사원수"
              value={Number(description.headCount)}
              onChange={(e) =>
                setDescription({ ...description, headCount: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="EditBenefit" className="mb-3">
            <Form.Label>
              복지
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="복지"
              value={description.benefit}
              onChange={(e) =>
                setDescription({ ...description, benefit: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="EditHomepage" className="mb-3">
            <Form.Label>홈페이지</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="홈페이지"
              value={description.homepage}
              onChange={(e) =>
                setDescription({ ...description, homepage: e.target.value })
              }
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
