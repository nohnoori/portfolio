import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import * as Api from "../../api";
// 하위 컴포넌트
import EducationEditForm from "./EducationEditForm";

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false)
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function EducationCard({ education, isEditable }) {
  const [isEditing, setIsEditing] = useState(false); // 편집 폼이 보이는지 여부
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async () => {
    await Api.delete(`educations/${education.id}`);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        {isEditing ? (
          <EducationEditForm
            currentEducation={education}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{education.school}</div>
            <div>
              {education.major}
              {"  "}
            </div>
            <div>{education.position}</div>
          </Col>
        )}

        {isEditable && (
          <Col xs lg="2">
            {!isEditing && ( // 편집 버튼을 누르면 isEditing이 true가 되면서 편집 버튼이 사라지고 폼만 보임
              <>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="mr-3"
                >
                  편집
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleShow()}
                  className="mr-3"
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
                  <Modal.Body>
                    삭제를 하시는 경우 복구가 불가능합니다.
                  </Modal.Body>
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
              </>
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard;
