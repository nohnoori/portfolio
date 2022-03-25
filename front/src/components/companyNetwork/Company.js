import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

function Company({ portfolioOwnerId }) {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("company").then((res) => setUser(res.data));
  }, [userState, navigate]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>공고 정보</Card.Title>
        <Card.Text>{user?.description.detail}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Company;
