import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm ({setIsAdding,setAward, portfolioOwnerId}) {
  // 수상 내역
  const [title, setTitle] = useState("");
  // 상세 내역
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault()
    // user_id는 현재 사용자의 portfolioOwnerId.
    const user_id = portfolioOwnerId;
    
    // "award/create" 엔드포인트로 post요청함.
    await Api.post("award/create", {
      user_id,
      title,
      description,
    });

    // 유저 id를 가지고 "awardlist/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    // 가져온 사용자 정보를 award에 넣음.
    await Api.get("awardlist",user_id)
             .then((res) => setAward(res.data));

  // award 편집 끝!
  setIsAdding(false);
  }
  return(
    <Form onSubmit = {handleSubmit}>
      <Form.Group controlId = "awardEditTitle" className="mb-2">
        <Form.Control 
          className="mb-2"
          type = "title" 
          placeholder = "수상 내역" 
          value = {title||''}
          onChange = {(e) => setTitle(e.target.value)}
           />
        <Form.Control 
          className="mb-2"
          type = "description" 
          placeholder = "상세 내역" 
          value = {description||''}
          onChange = {(e) => setDescription(e.target.value)}
          />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-2" >확인</Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>취소</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default AwardAddForm;