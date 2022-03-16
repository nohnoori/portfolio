import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

/**
 * 학력 정보 작은 틀 컴포넌트
 * @param project 컴포넌트로부터 전달받은 인자 : {project} : projects의 구성요소
 * @param isEditable Portfolio -> Projects 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param setProjects Projects 컴포넌트로부터 전달받은 인자 : {setProjects} : projects의 상태 관리 함수
 * @return 학력 정보 카드 컴포넌트(Education)와 수정 폼 컴포넌트(EducationEditForm)
 */

// ? isEditing이 true일 때는 ProjectEditForm 컴포넌트가 나타나고, false일 때는 ProjectCard 컴포넌트가 나타남
// ? ProjectEditForm과 ProjectCard에 setIsEditing을 전달 : 버튼을 누르면 isEditing의 값이 반대로 바뀜 (true <-> false)


function Project({ project, isEditable, setProjects }) {
  const [isEditing, setIsEditing] = useState(false);
  return(
    <>
      {isEditing ? (                               // isEditing이 true일 경우 프로젝트 수정 폼을 보여줌
        <ProjectEditForm 
          currentProject={project}
          setIsEditing={setIsEditing}
          setProjects={setProjects}                // ProjectEditForm 컴포넌트에 setProjects를 전달: 변경사항을 저장하고 다시 프로젝트 카드를 보여주기 위해
        />
      ) : (
        <ProjectCard 
          project={project}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Project;