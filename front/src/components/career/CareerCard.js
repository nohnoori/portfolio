import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import * as Api from "../../api";
import { CareersContext } from "./Careers";
// 하위 컴포넌트

import CareerEditForm from "./CareerEditForm";

function CareerCard({ currentCareer, isEditable }) {
  const { setCareers } = useContext(CareersContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (e) => {
    const userId = currentCareer.user_id;
    e.preventDefault();
    await Api.delete(`career/${currentCareer.id}`);

    const res = await Api.get("careers", userId);
    setCareers(res.data);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        {isEditing ? (
          <Row className="mt-3">
            <CareerEditForm
              currentCareer={currentCareer}
              setIsEditing={setIsEditing}
            />
          </Row>
        ) : (
          <Col>
            <div>{currentCareer.title}</div>
            <div>{currentCareer.description}</div>
            <div>
              {currentCareer.from_date.slice(0, 10)} ~{" "}
              {currentCareer.to_date.slice(0, 10)}
            </div>
          </Col>
        )}

        {isEditable && !isEditing && (
          <Col lg="2">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="m-1"
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
    </Card.Text>
  );
}

export default CareerCard;
