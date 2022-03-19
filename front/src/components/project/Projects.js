import React, { useEffect, useState, createContext } from "react";
import { Card, Button, Row, Col } from 'react-bootstrap';

import * as Api from "../../api";

// 하위 컴포넌트
import ProjectCard from "./ProjectCard";
import ProjectAddForm from "./ProjectAddForm";
// projects 상태 관리
export const ProjectsContext = createContext();

/**
 * 가장 큰 틀의 프로젝트 컴포넌트
 * @param isEditable Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param portfolioOwnerId Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id} 
 * @return 프로젝트 정보 작은 틀 컴포넌트(Project)와 추가 폼 컴포넌트(ProjectAddForm)
 */

function Projects({ isEditable, portfolioOwnerId }) {  // portfolioOwner.id === userState.user?.id일 경우 isEditable은 true
  const [projects, setProjects] = useState([]);  // 받아올 데이터(전역상태관리)
  const [isAdding, setIsAdding] = useState(false); // 추가 폼이 보이는지 여부

  useEffect(() => {
    Api.get("projectlist", portfolioOwnerId)
      .then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return(
    <ProjectsContext.Provider value={{ setProjects }}>
      <Card>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
            {projects.map((project) => (
              <ProjectCard
                key={project.id} 
                project={project}
                isEditable={isEditable}
              />    
            ))}

          {/* 추가 버튼 */}
          {isEditable && (                              // isEditable이 true일 경우 추가 버튼을 보여줌
            <Row className="text-center mt-4 mb-3">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}
          
          {/* 추가 폼 */}
          {isAdding && (
            <ProjectAddForm
              portfolioOwnerId={portfolioOwnerId}
              setProjects={setProjects}
              setIsAdding={setIsAdding}                 // 추가 폼을 닫을 때 setIsAdding을 false로 변경하기 위해 전달
            />
          )}
        </Card.Body>
      </Card>
    </ProjectsContext.Provider>
  )
}

export default Projects;