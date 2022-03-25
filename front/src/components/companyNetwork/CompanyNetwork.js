import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import CompanyCard from "./CompanyCard";
import { UserStateContext } from "../../App";

function CompanyNetwork({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [companys, setCompanys] = useState([]);

  useEffect(async () => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    await Api.get("jobVacancies").then((res) => setCompanys(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center2">
        {companys.map((company) => (
          <CompanyCard key={company.id} company={company} isCompanyNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default CompanyNetwork;
