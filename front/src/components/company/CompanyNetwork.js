import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import "../../index.css";
import * as Api from "../../api";
import JobCard from "./JobCard";
import { UserStateContext } from "../../App";

function CompanyNetwork() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const [jobs, setJobs] = useState([]);

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
      <Row>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Row>
    </Container>
  );
}

export default CompanyNetwork;
