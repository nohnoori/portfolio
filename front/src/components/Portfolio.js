import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import Certificate from "./certificate/Certificates";

import Company from "./company/Company";

import Careers from "./career/Careers";
import Projects from "./project/Projects";
import Awards from "./award/Awards";
import Education from "./education/Educations";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  // 임시로 둔 회사 구별 코드
  const [isCompany, setIsCompany] = useState(true);

  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  //companyPortfolio와 같은 상황!
  //처음 렌더링 됐을 때 한번만 localStorage에 user 값 넣어주기
  //어차피 user 판단은 userState에서 하기 때문에
  //새로고침 시 App파일에서 userType을 다시 초기화하는데 이미 localStorage는 user로 바뀌어있기때문에
  //user 페이지 유지가 가능함
  useEffect(() => {
    window.localStorage.setItem("state", "user");
  }, []);

  useEffect(() => {
    console.log(userState);
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
    <>
      {isCompany ? (
        <Container fluid>
          <Row>
            <Col md="3" lg="3">
              <Company
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Col md="3" lg="3">
              <User
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
            </Col>
            <Col>
              <Row className="mb-3">
                <Education
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-3">
                <Awards
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-3">
                <Projects
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-3">
                <Certificate
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
              <Row className="mb-3">
                <Careers
                  portfolioOwnerId={portfolioOwner.id}
                  isEditable={portfolioOwner.id === userState.user?.id}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Portfolio;
