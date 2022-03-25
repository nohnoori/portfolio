import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";
import CompanyCard from "./CompanyCard";
import "../jobvacancy/Tag.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "../jobvacancy/Tag";

import CompanySimpleInfo from "./CompanySimpleInfo";

function JobInfo() {
  const [job, setJob] = useState();
  const [company, setCompany] = useState();
  let { id } = useParams();

  useEffect(() => {
    const res = Api.get("jobVacancy", id).then((res) => setJob(res.data));
  }, [id]);
  console.log("회사 아이디", id);
  console.log(job);
  console.log(job?.company_id);

  useEffect(() => {
    const res2 = Api.get("company", job?.company_id).then((res2) =>
      setCompany(res2.data)
    );
  }, [job?.company_id]);
  console.log(company);
  return (
    <Container>
      <Row>
        <Col>
          <Card
            style={{
              width: "100%",
              float: "center",
              height: "100%",
              padding: "10px",
            }}
          >
            <Col>
              <div className="m-3">{job?.jobname}</div>
              <div className="m-3">
                <span id="open">{job?.open ? "채용중" : "채용마감"}</span>
              </div>
              <div className="m-3" style={{ minHeight: "70%" }}>
                <ReactMarkdown
                  children={job?.description}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
              <hr style={{ margin: "1px" }} />
              <div style={{ padding: "5px" }}>
                {job?.tags.map((currentTag) => (
                  <Tag
                    key={currentTag}
                    currentTag={currentTag}
                    tags={job?.tags}
                    isJobVacancyCard
                  />
                ))}
              </div>
            </Col>
          </Card>
        </Col>
        <Col xs lg="3">
          <CompanySimpleInfo company={company} isJobInfo />
        </Col>
      </Row>
    </Container>
  );
}

export default JobInfo;
