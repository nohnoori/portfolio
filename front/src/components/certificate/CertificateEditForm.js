import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  const [certificateName, setCertificateName] = useState(currentCertificate.certificateName);
  const [detail, setDetail] = useState(currentCertificate.detail);
  const [startDate, setStartDate] = useState(new Date);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const user_id = currentCertificate.user_id;
    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      certificateName,
      detail,
      startDate,
    });

    const res = await Api.get("certificatelist", user_id);
    setCertificates(res.data);
    setIsEditing(false);
  };

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="자격증 내용"
          value={certificateName}
          onChange={(e) => setCertificateName(e.target.value)}
        >
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        >
        </Form.Control>
      </Form.Group>

      {/* <div key={`inline-radio`} className="mb-3 mt-3">
        <Form.Check 
          inline
          label="재학중"
          id="radio1"
          type="radio"
          name="position"
          value="재학중"
          checked={position === "재학중"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check 
          inline
          label="학사졸업"
          id="radio2"
          type="radio"
          name="position"
          value="학사졸업"
          checked={position === "학사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check 
          inline
          label="석사졸업"
          id="radio3"
          type="radio"
          name="position"
          value="석사졸업"
          checked={position === "석사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />

        <Form.Check 
          inline
          label="박사졸업"
          id="radio4"
          type="radio"
          name="position"
          value="박사졸업"
          checked={position === "박사졸업"}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div> */}

      <Form.Group as={Row} className="mt-3 text-center">
        <div style={{ textAlign: "left" }}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
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
  )
}

export default CertificateEditForm;