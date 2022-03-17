import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm ({award,setIsAdding,setAward, portfolioOwnerId}) {
  // 상 이름
  const [title, setTitle] = useState("");
  // 상 내용
  const [description, setDescription] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    const user_id = portfolioOwnerId;
  
    
    // "award/create" 엔드포인트로 post요청함.
    await Api.post("award/create", {
      user_id,
      title,
      description,
    });

    //await Api.get("awardlist",user_id).then((res) => setAward(res.data));

  // award 편집 끝!
  setIsAdding(false);
  }
  return(
    <Form onSubmit = {handleSubmit}>
      <Form.Group controlId = "awardEditTitle" className="mb-2">
        <Form.Control 
          className="m-1"
          type = "title" 
          placeholder = "수상 내역" 
          value = {title||''}
          onChange = {(e) => setTitle(e.target.value)}
           />
        <Form.Control 
          className="m-1"
          type = "description" 
          placeholder = "상세 내역" 
          value = {description||''}
          onChange = {(e) => setDescription(e.target.value)}
          />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-2" >확인</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

export default AwardAddForm;