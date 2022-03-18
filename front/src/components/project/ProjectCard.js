import { Card, Button, Row, Col } from 'react-bootstrap';

/**
 * 프로젝트 정보를 담고 있는 카드 컴포넌트
 * @param project Projects -> Project 컴포넌트로부터 전달받은 인자 : {project} : projects의 구성요소
 * @param isEditable Portfolio -> Projects 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param setIsEditing Project 컴포넌트로부터 전달받은 인자 : {setIsEditing} : isEditing의 상태 관리 함수 (true일 경우 편집 폼 컴포넌트 보여짐)
 * @return 프로젝트 정보 카드 컴포넌트(Proejct)와 수정 폼 컴포넌트(ProjectEditForm)
 */

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false) 
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남


function ProjectCard({ project, setIsEditing, isEditable }) {

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