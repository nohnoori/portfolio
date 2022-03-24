import react, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

function CompanyDetailEdit({ user, setUser, setDetailEdit }) {
  const [detail, setDetail] = useState(user.description.detail);

  // 값 post, get 추가
  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({
      description: {
        detail: detail,
      },
    });
    setDetailEdit(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="Editdetail" className="m-3">
        <textarea
          style={{
            width: "100%",
            height: "200px",
            padding: "10px",
            margin: "auto",
            resize: "none",
            fontSize: "15px",
            borderRadius: "10px",
            border: "solid 1px #d2d2d2",
          }}
          type="text"
          placeholder="회사 상세 소개 페이지"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setDetailEdit(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
export default CompanyDetailEdit;
