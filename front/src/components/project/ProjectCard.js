import { Card, Button, Row, Col } from 'react-bootstrap';
import { useState } from "react";
// 하위 컴포넌트
import ProjectEditForm from './ProjectEditForm';


// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false) 
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남


function ProjectCard({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return(
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br/>
          <span>{project.description}</span>
          <br/>
          <span>{project.from_date.slice(0,10)} ~ {project.to_date.slice(0,10)}</span>
        </Col>

        {isEditing && (
          <Row className="mt-3">
            <ProjectEditForm 
              currentProject={project}
              setIsEditing={setIsEditing}
            />
          </Row>
        )}

        {isEditable && (
          <Col xs lg="1">
            {!isEditing ? (
              <Button
                variant="outline-info"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >편집</Button>
            ) : (
              (<div>{}</div>)
            )}
          </Col>
        )}
      </Row>
    </Card.Text>
  )
}

export default ProjectCard;