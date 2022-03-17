/*포트폴리오 컴포넌트는 Awards 컴포넌트를 사용함.
Awards는 수상이력 목록으로, 여러 개의 Award 컴포넌트+ (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.
각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.

isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
Awards는 isAdding이 true면 AwardAddForm, false면 그냥 Award들의 모음이 됩니다.
*/



import react, {useState, useEffect} from "react";
import {Form, Button, Card} from 'react-bootstrap';
import * as Api from "../../api";

function Awards({isEditable, portfolioOwnerId}) {
  // award 정보
  const [ award, setAward ] = useState([]);
  //award 추가
  const [ isAdding, setIsAdding ] = useState(false);
  
  // award 정보 불러서 setAward에 넣기
  useEffect(() => {
    Api.get("awardlist",portfolioOwnerId)
      .then((res) => setAward(res.data))
  },[portfolioOwnerId]);
  console.log("넘버",portfolioOwnerId)
  console.log("에듀리스트")

  return(
    <Card>
      <Card.Title>수상 이력</Card.Title>
      <Card.Body>
        {award.map((award) => (
          <AwardCard
            // award 정보 출력
            
          />
        ))}

        { isEditable && (
          <Button 
            onClick = { () => setIsAdding(true)}>+
          </Button>
        )}

        { isAdding && (
          <AwardAddForm 
            setIsAdding = {setIsAdding}
            setAward = {setAward}
            portfolioOwnerId = {portfolioOwnerId}
          />
        )}
      </Card.Body>
    </Card>

  )
  
}

export default Awards