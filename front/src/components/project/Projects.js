import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';
import * as Api from "../../api";

import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

/**
 * 가장 큰 틀의 프로젝트 컴포넌트
 * @param isEditable Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param portfolioOwnerId Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id} 
 * @return 프로젝트 정보 작은 틀 컴포넌트(Project)와 추가 폼 컴포넌트(ProjectAddForm)
 */

function Projects({ isEditable, portfolioOwnerId }) {  // portfolioOwner.id === userState.user?.id일 경우 isEditable은 true
  const [projects, setProjects] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId)
      .then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);
  return(
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
          {projects.map((project) => (
            <Project 
              key={project.id}
              project={project}
              setProjects={setProjects}
              isEditable={isEditable}
            />
          ))}

        {/* // ? 1. isEditable이 true일 때 추가 버튼을 보여줌 : {portfolioOwner.id === userState.user?.id}
            // ? 2. 추가(+) 버튼을 누르면 IsAdding을 true로 바꿈
            // ? 3. isAdding이 true일 때 ProjectAddForm을 보여줌
        */}
        
        {isEditable && (                              // isEditable이 true일 경우 추가 버튼을 보여줌
          <Row className="text-center mt-4 mb-3">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>  
            </Col>
          </Row>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}                 // 추가 폼을 닫을 때 setIsAdding을 false로 변경하기 위해 전달 
          />  
        )}
      </Card.Body>
    </Card>
  )
}

export default Projects;