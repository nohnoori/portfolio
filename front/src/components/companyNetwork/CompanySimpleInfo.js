import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, Link } from "react-bootstrap";

function CompanySimpleInfo() {
  const navigate = useNavigate();
  return (
    <Card>
      <Card.Body>
        <Card.Title>간단 정보</Card.Title>
        <Card.Link
          onClick={() => {
            navigate(`/`);
          }}
        >
          회사 홈페이지로 이동
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CompanySimpleInfo;
