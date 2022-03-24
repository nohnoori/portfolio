import React from "react";
import { Container, Row } from "react-bootstrap";

import CompanyCard from "./CompanyCard";

function CompanyNetwork() {
  const companys = [
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140801_18%2Fballvic123_1406884486014od6Ju_PNG%2F13.png&type=sc960_832",
      id: "최재웅",
      name: "LG",
      email: "직무 : 웹 프론트 개발자",
      description: "LG입니다.",
    },
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F277%2F2020%2F02%2F09%2F0004620695_001_20200209081809896.jpg&type=sc960_832",
      id: "최재웅2",
      name: "SAMSUNG",
      email: "직무 : IOT 개발자",
      description: "Samsung입니다.",
    },
    {
      img: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MTFfMjcg%2FMDAxNjIzMzc5ODkzNjM3.V6MHn6A22SCNStHJU3-DtF0FbksLmDnYUNeU8LTLQBEg.pcqmQawNVysKP0EZRChPJmoBvgt-hpCoSgFOHU779Jkg.PNG.sccreative%2F%25B1%25B8%25B1%25DB_%25B5%25A5%25C0%25CC%25C5%25CD%25BC%25BE%25C5%25CD4.png&type=sc960_832",
      id: "최재웅3",
      name: "GOOGLE",
      email: "직무 : 데이터 분석",
      description: "Google입니다.",
    },
  ];

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
