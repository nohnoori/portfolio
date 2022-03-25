import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import * as Api from "../../api";
import CompanyCard from "./CompanyCard";
import { UserStateContext } from "../../App";

function CompanyNetwork() {
  const companys = [
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140801_18%2Fballvic123_1406884486014od6Ju_PNG%2F13.png&type=sc960_832",
      id: "최재웅",
      name: "LG",
      email: "LG 채용 공고",
      description: "직무 : 웹 프론트 개발자",
    },
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F277%2F2020%2F02%2F09%2F0004620695_001_20200209081809896.jpg&type=sc960_832",
      id: "최재웅2",
      name: "SAMSUNG",
      email: "Samsung 채용 공고",
      description: "직무 : IOT 개발자",
    },
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MTFfMjcg%2FMDAxNjIzMzc5ODkzNjM3.V6MHn6A22SCNStHJU3-DtF0FbksLmDnYUNeU8LTLQBEg.pcqmQawNVysKP0EZRChPJmoBvgt-hpCoSgFOHU779Jkg.PNG.sccreative%2F%25B1%25B8%25B1%25DB_%25B5%25A5%25C0%25CC%25C5%25CD%25BC%25BE%25C5%25CD4.png&type=sc960_832",
      id: "최재웅3",
      name: "GOOGLE",
      email: "Google 채용 공고",
      description: "직무 : 데이터 분석",
    },
  ];

  // const navigate = useNavigate();
  // const userState = useContext(UserStateContext);

  // const [companys, setCompanys] = useState([]);

  // useEffect(() => {
  //   // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
  //   if (!userState.user) {
  //     navigate("/login");
  //     return;
  //   }
  //   // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
  //   Api.get("userlist").then((res) => setCompanys(res.data));
  // }, [userState, navigate]);

  return (
    <Container fluid>
      <Row xs="auto" className="jusify-content-center2">
        {companys.map((company) => (
          <CompanyCard key={company.id} company={company} isCompanyNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default CompanyNetwork;
