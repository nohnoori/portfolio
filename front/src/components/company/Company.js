import React, { useState, useEffect } from "react";
import CompanyEditForm from "./CompanyEditForm";
import CompanyCard from "./CompanyCard";
import * as Api from "../../api";

function Company({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState({
    company: "넥슨",
    description: "온라인/모바일 게임 개발 및 서비스",
    img: "https://grepp-programmers.s3.amazonaws.com/production/company/logo/2710/logo.jpg",
    location: "경기도 성남시 분당구 판교로256번길 7 (삼평동)",
    employees: "3051",
    hompage: "http://company.nexon.com/",
  });

  // useEffect(() => {
  //   // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
  //   Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  // }, [portfolioOwnerId]);

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
