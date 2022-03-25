import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import Company from "./Company";
import CompanySimpleInfo from "./CompanySimpleInfo";
import { UserStateContext } from "../../App";

function CompanyInfo() {
  const [user, setUser] = useState([]);
  const portfolioOwnerId = useParams();
  // console.log(portfolioOwnerId.companyId);
  // const userId = portfolioOwnerId;

  // useEffect(async () => {
  //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.

  //   const test = await Api.get("company", portfolioOwnerId.companyId).then((res) => {
  //     console.log(portfolioOwnerId)
  //     console.log(test);
  //     setUser(res.data);
  //   });
  // }, [portfolioOwnerId]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Company></Company>
        </Col>
        <Col xs lg="3">
          <CompanySimpleInfo
            portfolioOwnerId={portfolioOwnerId.companyId}
          ></CompanySimpleInfo>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyInfo;
