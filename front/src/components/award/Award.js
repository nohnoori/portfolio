import React, { useState, useEffect } from "react";
import { Card, Button, Form } from 'react-bootstrap';
import AwardCard from './AwardCard'
import AwardAddForm from './AwardAddForm'
import AwardEditForm from "./AwardEditForm";

import * as Api from "../../api";

function Award({portfolioOwnerId, isEditable}) {
  // 편집
  const [isEditing, setIsEditing] = useState(false);
  // 추가
  const [isAdding, setIsAdding] = useState(false);
  // award
  const [award, setAward] = useState('');
  
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