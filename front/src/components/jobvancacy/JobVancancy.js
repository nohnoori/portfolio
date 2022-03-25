import { useState, useEffect } from "react";
import { Row, Button, Card, Col } from "react-bootstrap";
import * as Api from "../../api";

import JobVancancyCard from "./JobVancancyCard";
import JobVancancyAddForm from "./JobVancancyAddForm";

function JobVancancy({ isEditable, portfolioOwnerId }) {
  const [Jobs, setJobs] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("jobVacancies", portfolioOwnerId).then((res) => setJobs(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "95%", margin: "auto auto 10px auto " }}>
      <Card.Body>
        <Card.Title className="mb-3">채용 공고</Card.Title>
        {Jobs.map((currentJob) => (
          <JobVancancyCard
            // AwardCard 컴포넌트로 정보전달
            key={currentJob.id}
            currentJob={currentJob}
            isEditable={isEditable}
            setJobs={setJobs}
          />
        ))}

        {isEditable && !isAdding && (
          <Row className="text-center">
            <Col sm={{ span: 20 }} className="mb-3">
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}

        {isAdding && (
          <JobVancancyAddForm
            setIsAdding={setIsAdding}
            setJobs={setJobs}
            portfolioOwnerId={portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>
  );
}
export default JobVancancy;
