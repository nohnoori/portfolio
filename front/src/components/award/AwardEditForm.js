import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({award, setIsEditing, setAward}) {
  // 상 이름
  const [title, setTitle] = useState('');
  // 상 내용
  const [description, setDescription] = useState('');

  //event
  const handleSubmit = async(e) => {
    e.preventDefault()
    setAward([
      {
      title:title,
      description:description
    }
    ])
  // award 편집 끝!
  setIsEditing(false);
  }

return(
  <Form onSubmit = {handleSubmit}>
    <Form.Group controlId = "awardEditTitle" className="mb-3">
      <Form.Control 
        type = "text" 
        placeholder = "수상 내역 수정" 
        value = {title}
        onChange = {(e) => setTitle(e.target.value)} />
      <Form.Control 
        type = "text" 
        placeholder = "상세 내역 수정" 
        value = {description}
        onChange = {(e) => setTitle(e.target.value)} />
      </Form.Group>
      <Form.Group>
        
      </Form.Group>
    </Form>
)
}

export default AwardEditForm;
