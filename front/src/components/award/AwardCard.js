// awardCard 컴포넌트
// 각 portofolioID에 등록된 award 목록들을 보여줌.
// - isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
// - 편집버튼을 누르면 isEditing의 상태는 true 변합니다.
import React, { useState } from "react";
import AwardEditForm from "./AwardEditForm";
import { Row, Col, Button, Modal } from "react-bootstrap";
import * as Api from "../../api";

function AwardCard({ isEditable, currentAward, setAwards }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e) => {
    const userId = currentAward.user_id;
    e.preventDefault();
    await Api.delete(`award/${currentAward.id}`);

    const res = await Api.get("awards", userId);
    setAwards(res.data);
  };

  return (
    <Row className="mb-3">
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          setAwards={setAwards}
          currentAward={currentAward}
        />
      ) : (
        <Col>
          <div>{currentAward.title}</div>
          <div>{currentAward.description}</div>
        </Col>
      )}

      {isEditable && isEditing === false && (
        <Col lg="2">
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

export default AwardCard;
