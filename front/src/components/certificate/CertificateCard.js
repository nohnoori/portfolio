import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";

function CertificateCard({
  certificate,
  isEditable,
  setIsEditing,
  setCertificates,
  currentCertificate,
}) {
  const date = certificate.when_date.substring(0, 10);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    const userId = currentCertificate.user_id;
    await Api.delete(`certificate/${certificate.id}`);

    const res = await Api.get("certificates", userId);
    setCertificates(res.data);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span>{certificate.description}</span>
          <br />
          <span>{date}</span>
        </Col>
        {isEditable && (
          <Col xs lg="2">
            <Button
              variant="outline-info"
              size="sm"
              className="mr-3"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              편집
            </Button>{" "}
            <Button
              variant="outline-danger"
              size="sm"
              className="mr-3"
              onClick={handleShow}
            >
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
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete();
                    handleClose();
                  }}
                >
                  삭제
                </Button>
                <Button variant="secondary" onClick={handleClose}>
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

export default CertificateCard;
