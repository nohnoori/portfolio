import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setIsEditing, setAwards }) {
  // 상 이름
  const [title, setTitle] = useState(currentAward.title);
  // 상 내용
  const [description, setDescription] = useState(currentAward.description);

  // "awards/유저id" 엔드포인트로 PUT 요청함.
  const handleSubmit = async (e) => {
    const userId = currentAward.user_id;
    e.preventDefault();
    await Api.put(`award/${currentAward.id}`, {
      user_id: userId,
      title,
      description,
    });

    const res = await Api.get("awards", userId);
    setAwards(res.data);
    // award 편집 끝!
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="수상 내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          className="mb-2"
          type="text"
          placeholder="상세 내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="m-2">
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

export default AwardEditForm;
