import React, { useState } from "react";
import EducationCard from "./EducationCard";

function Education({ isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return(
    <>
      <EducationCard isEditable={isEditable} setIsEditing={setIsEditing}/>
    </>
  )
}

export default Education;