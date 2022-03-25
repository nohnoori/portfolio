import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import JobVancancy from "./jobvancacy/JobVancancy";
import Company from "./company/Company";
import CompanyDetail from "./company/CompanyDetail";
import * as Api from "../api";

import { UserStateContext } from "../App";

function CompanyPortfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

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
    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }
  return (
    <Container fluid>
      <Row>
        <Col md="3" lg="3">
          <Company
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
        </Col>
        <Col>
          <Row>
            <JobVancancy
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </Row>
          <Row>
            <CompanyDetail
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyPortfolio;
