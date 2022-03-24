import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { UserStateContext } from "../App";

function CompanyPortfolio() {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userState]);
  return <Container>회사 계정 포트폴리오 페이지</Container>;
}

export default CompanyPortfolio;
