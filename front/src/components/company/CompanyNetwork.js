import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";

import * as Api from "../../api";
import JobCard from "./JobCard";
import { UserStateContext } from "../../App";

function CompanyNetwork({ portfolioOwnerId }) {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState();

  useEffect(async () => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    await Api.get("jobVacancies").then((res) => setJobs(res.data));
  }, [userState, navigate]);

  return (
    <Container>
      <Row xs="auto" className="jusify-content-center2">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} company={company} />
        ))}
      </Row>
    </Container>
  );
}

export default CompanyNetwork;
