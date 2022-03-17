import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({award, setIsEditing, setAward}) {
  // 상 이름
  const [title, setTitle] = useState(award.title);
  // 상 내용
  const [description, setDescription] = useState(award.description);

  // "awards/유저id" 엔드포인트로 PUT 요청함.
  const handleSubmit = async(e) => {
    const user_id = award.user_id;
    e.preventDefault();
    await Api.put(`awards/${award.id}`,{
      user_id,
      title,
      description
    })
     console.log(award)
    const res = await Api.get("awardlist", user_id);
    setAward(res.data);
  // award 편집 끝!
  setIsEditing(false);
  }
 


return(
  <Form onSubmit = {handleSubmit}>
    <Form.Group controlId = "awardEditTitle" className="mb-3">
      <Form.Control 
        type = "text" 
        placeholder = "수상 내역"
        value = {title}
        onChange = {(e) => setTitle(e.target.value)} />
      <Form.Control 
        type = "text" 
        placeholder = "상세 내역"
        value = {description}
        onChange = {(e) => setDescription(e.target.value)} />
      </Form.Group>

      <Form.Group>
          <Button variant="primary" type="submit" className="me-2" >확인</Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>취소</Button>
      </Form.Group>
  </Form>
)
}

export default AwardEditForm;
