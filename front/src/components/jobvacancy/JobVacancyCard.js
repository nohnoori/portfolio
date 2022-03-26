import React, { useState } from "react";
import JobVacancyEditForm from "./JobVacancyEditForm";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import "./Tag.css";
import Tag from "./Tag";

function JobVacancyCard({ currentJob, isEditable, setJobs }) {
  // 삭제 모듈할때 필요한 변수들
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    const companyId = currentJob.company_id;
    e.preventDefault();
    await Api.delete(`jobVacancy/${currentJob.id}`);

    const res = await Api.get("jobVacancies", companyId);
    setJobs(res.data);
  };

  return (
    <Row className="mb-3">
      {isEditing ? (
        <JobVacancyEditForm
          setIsEditing={setIsEditing}
          setJobs={setJobs}
          currentJob={currentJob}
          isEditing={isEditing}
        />
      ) : (
        <Col>
          <div className="m-2">{currentJob?.jobname}</div>
          <div className="m-2">
            <span id="open">{currentJob?.open ? "채용중" : "채용마감"}</span>
          </div>
          {currentJob?.tags.map((currentTag) => (
            <Tag
              className="m-2"
              key={currentTag}
              currentTag={currentTag}
              tags={currentJob?.tags}
              isJobVacancyCard
            />
          ))}
        </Col>
      )}
      {isEditable && isEditing === false && (
        <Col lg="2">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => navigate(`/JobInfo/${currentJob?.id}/applicants`)}
          >
            지원자
          </Button>
          <Button
            className="m-1"
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleShow}>
            삭제
          </Button>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <strong>정말 삭제하시겠습니까?</strong>
            </Modal.Header>
            <Modal.Body>삭제를 하시는 경우 복구가 불가능합니다.</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                삭제
              </Button>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                취소
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      )}
    </Row>
  );
}
export default JobVacancyCard;
