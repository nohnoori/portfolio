import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext, ClassifierContext } from "../../App";

import "../../index.css";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const { setUserType } = useContext(ClassifierContext);

  // 유저/회사 구분하기 위한 classifier 상태 생성
  const [classifier, setClassifier] = useState("");
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");

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
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유저 계정인지 회사 계정인지 구분
    const apiUrl = classifier === "user" ? "user/login" : "company/login";
    const checkType = classifier === "user" ? "user" : "company";
    setUserType(checkType);

    try {
      // "user/login" 엔드포인트로 post요청함.
      window.localStorage.setItem("state", classifier);
      const res = await Api.post(apiUrl, {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      alert(
        `유저 로그인에 실패했습니다.\n이메일 혹은 비밀번호를 다시 확인해주세요.`
      );
      console.log("유저 로그인에 실패하였습니다.\n", err);
    }
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center mt-5">
        <Col lg={5}>
          <div id="loginTitle">
            <h1
              style={{
                fontSize: "50px",
                fontWeight: "bolder",
                color: "#191c1f",
              }}
            >
              <div>Portfolio</div>
              <div>Share-Service</div>
            </h1>
            <div>Welcome Team 11's service</div>
          </div>
        </Col>

        <Col lg={6}>
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
            <Form.Group controlId="loginEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" disabled={!isFormValid}>
                  로그인
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" onClick={() => navigate("/reset")}>
                  비밀번호 찾기
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="light" onClick={() => navigate("/register")}>
                  회원가입하기
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
