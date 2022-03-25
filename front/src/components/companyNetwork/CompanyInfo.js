import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import Company from "./Company";
import CompanySimpleInfo from "./CompanySimpleInfo";

function CompanyInfo({ portfolioOwnerId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("company", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Company user={user} setUser={setUser}></Company>
        </Col>
        <Col xs lg="3">
          <CompanySimpleInfo></CompanySimpleInfo>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyInfo;
