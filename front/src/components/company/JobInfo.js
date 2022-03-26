import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import * as Api from "../../api";
import CompanyCard from "./CompanyCard";
import "../jobvacancy/Tag.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Tag from "../jobvacancy/Tag";
import { ClassifierContext, UserStateContext } from "../../App";
import CompanySimpleInfo from "./CompanySimpleInfo";

function JobInfo() {
  const [job, setJob] = useState();
  const [company, setCompany] = useState();
  const { userType } = useContext(ClassifierContext);
  const [isApplicable, setIsApplicable] = useState(true && userType === "user");
  const { id } = useParams();
  const userState = useContext(UserStateContext);
  useEffect(() => {
    Api.get("jobVacancy", id).then((res) => setJob(res.data));
  }, [id]);
  // console.log("회사 아이디", id);
  // console.log(job);
  // console.log(job?.company_id);

  useEffect(() => {
    Api.get("company", job?.company_id).then((res) => setCompany(res.data));
  }, [job?.company_id]);

  const handleApply = async (e) => {
    e.preventDefault();
    // const response = await Api.get("user/current");
    const userId = userState.user.id;
    console.log(userId);
    const response = await Api.put(`jobVacancy/${job?.id}/applicants`, {
      userId,
    });
    const { errorMessage } = response.data;
    if (errorMessage) {
      alert(errorMessage);
    } else {
      alert("지원되었습니다.");
    }
  };
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
              <div id="jobtitle">
                {job?.jobname}{" "}
                <span id="open">{job?.open ? "채용중" : "채용마감"}</span>{" "}
              </div>
              <div className="m-3" style={{ minHeight: "60%" }}>
                <ReactMarkdown
                  children={job?.description}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
              <hr style={{ margin: "1px" }} />
              {!(isApplicable && job?.open) ? (
                ""
              ) : (
                <div>
                  <Button
                    id="send"
                    variant="secondary"
                    size="md"
                    disabled={!job?.open}
                    onClick={handleApply}
                  >
                    지원하기
                  </Button>
                </div>
              )}
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
