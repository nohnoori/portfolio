import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import AwardCard from './AwardCard'
import AwardAddForm from './AwardAddForm2'
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

/*포트폴리오 컴포넌트는 Awards 컴포넌트를 사용함.
Awards는 수상이력 목록으로, 여러 개의 Award 컴포넌트+ (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.
각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.

isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
Awards는 isAdding이 true면 AwardAddForm, false면 그냥 Award들의 모음이 됩니다.
*/





function Award({portfolioOwnerId, isEditable}) {
  // 편집
  const [isEditing, setIsEditing] = useState(false);

  // 추가
  const [isAdding, setIsAdding] = useState(false);

  // award 정보를 담을 변수
  const [award, setAward] = useState([]);
  
  console.log(award)
  

  return(
    <>
    <Card>
      <Card.Title>수상 이력</Card.Title>
      <Card.Body>
        <AwardCard
          award = {award}
          isEditable = {isEditable}
          setIsAdding = {setIsAdding}
          setIsEditing = {setIsEditing}
        />
        {isEditing && (
          <AwardEditForm 
            setIsEditing = {setIsEditing}
            isEditable = {isEditable}/>
          )}
        
        {isAdding && (
          <AwardAddForm 
            setIsAdding = {setIsAdding}
            isEditable = {isEditable}
            setAward = {setAward}
            award = {award}/>
        )}
      </Card.Body>
    </Card>
    </>
  )
}
export default Award;
