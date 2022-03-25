import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";

function EmailSend() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  const [classifier, setClassifier] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let reset = "";
      if (classifier === "user") {
        reset = await Api.post(`user/reset_password`, {
          email,
        });
      } else if (classifier === "company") {
        reset = await Api.post(`company/reset_password`, {
          email,
        });
      }

      console.log(reset);
      if (reset.data.status === "Success") {
        alert("메일을 전송했습니다.");
        // 로그인 페이지로 이동함.
        navigate("/");
      } else {
        alert("존재하지 않는 이메일입니다.");
      }
    } catch (err) {
      alert("존재하지 않는 이메일입니다.");
      console.log("비밀번호 전송에 실패했습니다.", err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          <Form onSubmit={handleSubmit}>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                type="radio"
                id="user"
                label="유저"
                value="user"
                checked={classifier === "user"}
                onChange={(e) => setClassifier(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                id="company"
                label="회사"
                value="company"
                checked={classifier === "company"}
                onChange={(e) => setClassifier(e.target.value)}
              />
            </div>
            <Form.Group controlId="registerEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" type="submit" disabled={!isFormValid}>
                  인증번호 전송
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EmailSend;
