import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { useState, useContext } from "react";
import * as Api from "../../api";
// 하위 컴포넌트
import ProjectEditForm from "./ProjectEditForm";
import { ProjectsContext } from "./Projects";

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false)
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function ProjectCard({ project, isEditable, portfolioOwnerId }) {
  const { setProjects } = useContext(ProjectsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = portfolioOwnerId;

  const handleDelete = async () => {
    await Api.delete(`project/${project.id}`);

    const res = await Api.get("projects", userId);
    setProjects(res.data);
  };

  return (
    <Card.Text as="div">
      <Row className="align-items-center">
        {isEditing ? (
          <ProjectEditForm
            currentProject={project}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{project.title}</div>
            <div>{project.description}</div>
            <div>
              {project.from_date.slice(0, 10)} ~ {project.to_date.slice(0, 10)}
            </div>
          </Col>
        )}

        {isEditable && (
          <Col xs lg="2">
            {!isEditing && (
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

export default ProjectCard;
