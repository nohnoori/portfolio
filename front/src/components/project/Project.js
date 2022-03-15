import React, { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import ProjectCard from "./ProjectCard";

function Project({ project, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return(
    <>
      {isEditing ? (                               // isEditing이 true일 경우 프로젝트 수정 폼을 보여줌
        <ProjectEditForm 
          currentProject={project}
          setIsEditing={setIsEditing}
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