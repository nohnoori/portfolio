/*포트폴리오 컴포넌트는 Awards 컴포넌트를 사용함.
- Awards는 수상이력 목록으로, 여러 개의 Award 컴포넌트+ (추가하기 버튼 클릭 시) AwardAddForm 컴포넌트로 구성됩니다.

isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
Awards는 isAdding이 true면 AwardAddForm, false면 그냥 Award들의 모음이 됩니다.
*/



import react, {useState, useEffect} from "react";
import {Form, Button, Card} from 'react-bootstrap';
import Award from "./Award"
import AwardAddForm from "./AwardAddForm";
import * as Api from "../../api";

function Awards({isEditable, portfolioOwnerId,setIsEditing}) {
  // award 정보
  const [ award, setAward ] = useState([]);
  //award 추가 
  const [ isAdding, setIsAdding ] = useState(false);
  
  useEffect(() => {
    // "awardlist/유저id" 엔드포인트로 GET 요청을 하고, award를 response의 data로 세팅함.
    Api.get("awardlist", portfolioOwnerId).then((res) => setAward(res.data));
  }, [portfolioOwnerId]);
  console.log(award)

  return(
    <Card>
      <Card.Title>수상 이력</Card.Title>
      <Card.Body>
        {/* map을 사용하여 award 컴포넌트 반복 */}
        {award.map((award) => (
          <Award
            // award 컴포넌트로 정보전달
            award = {award}
            isEditable = {isEditable}
            setIsEditing = {setIsEditing}
            setAward = {setAward}
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