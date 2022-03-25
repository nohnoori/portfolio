import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, Link } from "react-bootstrap";
import * as Api from "../../api";

function CompanySimpleInfo({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const mockData = {
    summary: "개발하는곳",
    location: "화성",
    headCount: "1",
    benefit: "좋음",
    homepage: "아직 없음",
  };
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("company", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);
  console.log(portfolioOwnerId);
  return (
    <Card>
      <Card.Body>
        <Card.Title>간단 정보</Card.Title>
        {/* <Card.Text>{user?.description.summary}</Card.Text> */}
        <Card.Text>{user?.description.location}</Card.Text>
        <Card.Text>{user?.description.headCount}</Card.Text>
        <Card.Text>{user?.description.benefit}</Card.Text>
        <Card.Text>{user?.description.homepage}</Card.Text>
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
