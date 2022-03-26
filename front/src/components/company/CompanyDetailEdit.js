import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

function CompanyDetailEdit({ user, setUser, setIsEditing }) {
  const userId = user.id;
  const [detail, setDetail] = useState(user?.description.detail);

  // 값 post, get 추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.put(`company/${user.id}/detail`, {
      detail,
    });
    // 유저 정보는 response의 data임.
    await Api.get("company", userId).then((res) => setUser(res.data));

    setIsEditing(false);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-2 text-muted mb-1">마크다운으로 적어주세요!</div>
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
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}
export default CompanyDetailEdit;
