import React, { useState } from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ isEditable }) {  // portfolioOwner.id === userState.user?.id일 경우 isEditable은 true
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // 임시 데이터
  const project = {
    "user_id":"af4ff0af-2a5f-4eea-99f2-d18b42aba419",
    "title":"react 프로젝트",
    "description":"프론트엔드 역량을 키웠습니다!",
    "from_date":"2021-03-20",
    "to_date":"2021-04-20"
  }

  return(
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Project 
          project={project}
          isEditable={isEditable} 
        />
        {isEditable && (                              // isEditable이 true일 경우 추가 버튼을 보여줌
          <Row className="text-center mt-4 mb-3">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>  
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            setIsAdding={setIsAdding} />  // 추가 폼을 닫을 때 setIsAdding을 false로 변경하기 위해 전달 
        )}
      </Card.Body>
    </Card>
  )
}

export default Projects;