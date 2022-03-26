import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "../user/UserCard";
import { UserStateContext } from "../../App";

function JobApplicants() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("jobVacancy", id + "/applicants").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center">
        {users.length === 0
          ? "아직 지원자가 없습니다"
          : users.map((user) => (
              <UserCard key={user.id} user={user} isNetwork />
            ))}
      </Row>
    </Container>
  );
}

export default JobApplicants;
