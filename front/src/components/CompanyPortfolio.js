import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import { UserStateContext } from "../App";

function CompanyPortfolio() {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  //처음 렌더링 됐을 때 한번만 localStorage에 company 값 넣어주기
  //어차피 user 판단은 userState에서 하기 때문에
  //새로고침 시 App파일에서 userType을 다시 초기화하는데 이미 localStorage는 company로 바뀌어있기때문에
  //company 페이지 유지가 가능함
  useEffect(() => {
    window.localStorage.setItem("state", "company");
  }, []);

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
