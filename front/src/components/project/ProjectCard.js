import { Card, Button, Row, Col } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable }) {
  return(
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br/>
          <span>{project.description}</span>
          <br/>
          <span>{project.from_date} ~ {project.to_date}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >편집</Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  )
}

export default ProjectCard;