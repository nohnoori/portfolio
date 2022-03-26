import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import "../jobvacancy/Tag.css";
import Tag from "../jobvacancy/Tag";
import "../../index.css";
import * as Api from "../../api";
import AWS from "aws-sdk";

function JobCard({ job }) {
  const navigate = useNavigate();
  const [company, setCompany] = useState();
  const imgRef = useRef(null);
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:ab728621-f9a4-43d8-8b6a-26672cce00ea", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });
  console.log(job.id);
  console.log(job);

  useEffect(() => {
    const res = Api.get("company", job?.company_id).then((res) =>
      setCompany(res.data)
    );
  }, [job?.company_id]);

  return (
    <Card className="ms-4 m-3 mt-0" style={{ width: "18rem" }}>
      <Card.Body>
        <Row>
          <label htmlFor="upload">
            <img
              alt="profile"
              className="profile-img2"
              ref={imgRef}
              src={`https://pss-image.s3.ap-northeast-2.amazonaws.com/${company?.id}.png`}
              onError={() => {
                return (imgRef.current.src =
                  "https://pss-image.s3.ap-northeast-2.amazonaws.com/default-profile.png");
              }}
            />
          </label>
        </Row>
        <Card.Title style={{ textAlign: "center" }}>{company?.name}</Card.Title>
        <div id="jobname">{job?.jobname}</div>
        <div id="open">{job?.open ? "채용중" : "채용마감"}</div>
        <Card.Text>
          {job?.tags.map((currentTag) => (
            <Tag
              className="m-2"
              key={currentTag}
              currentTag={currentTag}
              tags={job?.tags}
              isJobVacancyCard
            />
          ))}
        </Card.Text>

        <Card.Link
          className="mt-3"
          href="javascript:;"
          onClick={() => {
            navigate(`/JobInfo/${job.id}`);
          }}
        >
          공고상세보기
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default JobCard;
