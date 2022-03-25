import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

import Company from "./Company";
import CompanySimpleInfo from "./CompanySimpleInfo";
import { UserStateContext } from "../../App";

function CompanyInfo() {
  const [job, setJob] = useState([]);
  const params = useParams();
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  // console.log(portfolioOwnerId.companyId);
  // const userId = portfolioOwnerId;

  // useEffect(async () => {
  //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.

  //   await Api.get("job", portfolioOwnerId.jobId).then((res) =>
  //     setJob(res.data)
  //   );
  // }, [portfolioOwnerId.jobId]);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("jobVacancy", ownerId);
    const ownerData = res.data;
    setJob(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (params.jobId) {
      const ownerId = params.jobId;
      fetchPorfolioOwner(ownerId);
    }
  }, [params]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Company></Company>
        </Col>
        <Col xs lg="3">
          <CompanySimpleInfo companyId={job.company_id}></CompanySimpleInfo>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyInfo;
