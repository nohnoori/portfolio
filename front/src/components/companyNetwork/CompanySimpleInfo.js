import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, Link } from "react-bootstrap";
import * as Api from "../../api";

function CompanySimpleInfo({ companyId }) {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  // useEffect(() => {
  //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
  //   Api.get("company", companyId).then((res) => setCompany(res.data));
  // }, [companyId]);
  // console.log(companyId);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("company", ownerId);
    const ownerData = res.data;
    setCompany(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (companyId) {
      const ownerId = companyId;
      fetchPorfolioOwner(ownerId);
    }
  }, [companyId]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>간단 정보</Card.Title>
        <Card.Text>{company?.description.summary}</Card.Text>
        <Card.Text>{company?.description.location}</Card.Text>
        <Card.Text>{company?.description.headCount}</Card.Text>
        <Card.Text>{company?.description.benefit}</Card.Text>
        <Card.Text>{company?.description.homepage}</Card.Text>
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
