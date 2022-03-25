import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

function Company({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("company", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  // useEffect(() => {
  //   // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
  //   const userId = user.id;
  //   Api.get("company", userId).then((res) => setUser(res.data));
  // }, [userState, navigate]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>공고 정보</Card.Title>
        <Card.Text>{user?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Company;
