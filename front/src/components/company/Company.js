import React, { useState } from "react";
import CompanyEditForm from "./CompanyEditForm";
import CompanyCard from "./CompanyCard";
import { Card, Row, Col, Button } from "react-bootstrap";

function Company({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.

  const [user, setUser] = useState({
    email: "nexon@nexon.com",
    name: "넥슨",
    password: "1234",
    description: {
      img: "https://grepp-programmers.s3.amazonaws.com/production/company/logo/2710/logo.jpg",
      location: "경기도 성남시 분당구 판교로256번길 7 (삼평동)",
      headCount: "3051",
      homepage: "http://company.nexon.com/",
      summary: "온라인/모바일 게임 개발 및 서비스",
      benefit: "복지",
      detail: "매우긴 글",
    },
  });

  return (
    <>
      {isEditing ? (
        <CompanyEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      ) : (
        <CompanyCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}
export default Company;
