import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row } from "react-bootstrap";
import "../jobvacancy/Tag.css";
import Tag from "../jobvacancy/Tag";
import * as Api from "../../api";

function JobCard({ job }) {
  console.log(job.id);
  console.log(job);
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={job.img}
            alt="회사 로고"
          />
        </Row>
        <Card.Title>{job?.jobname}</Card.Title>
        <div>
          <span id="open">{job?.open ? "채용중" : "채용마감"}</span>
        </div>
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
