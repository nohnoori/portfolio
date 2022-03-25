import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Card, Link } from "react-bootstrap";
import * as Api from "../../api";
import AWS from "aws-sdk";

function CompanySimpleInfo({ company }) {
  const navigate = useNavigate();
  const imgRef = useRef(null);
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:ab728621-f9a4-43d8-8b6a-26672cce00ea", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  return (
    <Card>
      <Card.Body>
        <Row>
          <label htmlFor="upload" className="image-upload-wrapper">
            <img
              style={{
                width: "14rem",
                display: "block",
                margin: "0px auto",
              }}
              alt="profile"
              className="profile-img, mb-3"
              ref={imgRef}
              src={`https://pss-image.s3.ap-northeast-2.amazonaws.com/${company?.id}.png`}
              onError={() => {
                return (imgRef.current.src =
                  "https://pss-image.s3.ap-northeast-2.amazonaws.com/default-profile.png");
              }}
            />
          </label>
        </Row>
        <Card.Title>{company?.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {company?.description.summary}
        </Card.Subtitle>
        <hr />
        <div>사원수</div>
        <div className="mb-2 text-muted mb-1">
          {company?.description.headCount}명
        </div>
        <div>복지</div>
        <div className="mb-2 text-muted mb-1">
          {company?.description.benefit}
        </div>
        <div>위치</div>
        <div className="mb-2 text-muted mb-1">
          {company?.description.location}
        </div>
        <div>홈페이지</div>
        <div className="mb-2 text-muted mb-1">
          {company?.description.homepage}
        </div>
        <Card.Link
          className="mt-3"
          href="javascript:;"
          onClick={() => {
            navigate(`/companys/${company.id}`);
          }}
        >
          회사 상세페이지로 이동
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CompanySimpleInfo;
