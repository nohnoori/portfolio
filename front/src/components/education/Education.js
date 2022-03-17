import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

/**
 * 학력 정보 작은 틀 컴포넌트
 * @param education Educations 컴포넌트로부터 전달받은 인자 : {education} : educations의 구성요소
 * @param setEducations Educations 컴포넌트로부터 전달받은 인자 : {setEducations} : educations의 상태 관리 함수
 * @param isEditable Portfolio -> Educations 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @return 학력 정보 카드 컴포넌트(Education)와 수정 폼 컴포넌트(EducationEditForm)
 */

// ? isEditing이 true일 때는 EducationEditForm 컴포넌트가 나타나고, false일 때는 EducationCard 컴포넌트가 나타남
// ? EducationEditForm과 EducationCard에 setIsEditing을 전달 : 버튼을 누르면 isEditing의 값이 반대로 바뀜 (true <-> false)

function Education({ education, setEducations, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  return(
    <>
      {isEditing ? (
        <EducationEditForm 
          currentEducation={education}
          setEducations={setEducations}
          setIsEditing={setIsEditing}
        />
      ) : (
        <EducationCard 
          education={education}
          isEditable={isEditable} 
          setIsEditing={setIsEditing}/>
      )}
    </>
  )
}

export default Education;