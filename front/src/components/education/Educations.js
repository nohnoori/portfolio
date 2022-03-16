import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import Education from "./Education";
import EducationAddForm from "./EducationAddFrom";

/**
 * 가장 큰 틀의 학력 컴포넌트
 * @param isEditable Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param portfolioOwnerId Portfolio 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id} 
 * @return 학력 정보 작은 틀 컴포넌트(Education)와 추가 폼 컴포넌트(EducationAddForm)
 */

function Educations({ isEditable, portfolioOwnerId }) {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // // 임시 데이터
  // const educationstest = [
  //   {
  //   school: "땡땡 학교",
  //   major: "땡떙 전공",
  //   position: "학사졸업",
  //   },
  //   {
  //     school: "우리 학교",
  //     major: "산업공학 전공",
  //     position: "재학중",
  //   }
  // ];
  
  // TODO : 서버에서 데이터 가져오기
  useEffect(() => {
    Api.get("educationlist", portfolioOwnerId)
      .then((res) => setEducations(res.data));
  }, [portfolioOwnerId]);
  console.log("넘버", portfolioOwnerId);
  console.log("에듀리스트", educations);
  
  return(
    <Card>
      <Card.Body>
        <Card.Title>학력</Card.Title>
          {educations.map((education) => (
            <Education 
              education={education}
              setEducations={setEducations}
              isEditable={isEditable}
            />
          ))}
          
          {/* // ? 1. isEditable이 true일 때 추가 버튼을 보여줌 
              // ? 2. 추가 버튼을 누르면 IsAdding을 true로 바꿈
              // ? 3. isAdding이 true일 때 EducationAddForm을 보여줌
          */}

          {isEditable && (                                               
            <Row className="mt-3 text-center mb-4">                      
              <Col >
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}

          {isAdding && (
            <EducationAddForm 
              setIsAdding={setIsAdding}
              portfolioOwnerId={portfolioOwnerId}
              setEducations={setEducations}
            />
          )}

      </Card.Body>
    </Card>
  )
}

export default Educations;