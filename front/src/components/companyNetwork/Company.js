import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";

import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

function Company({ portfolioOwnerId }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>공고 정보</Card.Title>
        {/* <Card.Text>{company}</Card.Text> */}
        {/* <Card.Text>{company?.description}</Card.Text>
        <Card.Text>{company?.open ? "채용중" : "채용 마감"}</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export default Company;
