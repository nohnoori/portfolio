import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

function Company({ portfolioOwnerId, user, setUser }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  console.log(user);
  return (
    <Card>
      <Card.Body>
        <Card.Title>공고 정보</Card.Title>
        <Card.Text>{user}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Company;
