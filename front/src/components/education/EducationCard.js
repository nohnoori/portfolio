import { Card, Button, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { EducationsContext } from "./Educations"; 

/**
 * 학력 정보를 담고 있는 카드 컴포넌트
 * @param education Educations 컴포넌트로부터 전달받은 인자 : {education} : educations의 구성요소
 * @param isEditable Portfolio -> Educations 컴포넌트로부터 전달받은 인자 : {portfolioOwner.id === userState.user?.id}
 * @param setIsEditing Education 컴포넌트로부터 전달받은 인자 : {setIsEditing} : isEditing의 상태 관리 함수 (true일 경우 편집 폼 컴포넌트 보여짐)
 * @return 학력 정보 카드 컴포넌트(Education)와 수정 폼 컴포넌트(EducationEditForm)
 */

// ? 편집 버튼 클릭 시 isEditing의 값이 반대로 바뀜 (true <-> false) 
// ? : default가 false라 true로 바뀌면서 Card 컴포넌트가 사라지고 편집 폼이 나타남

function EducationCard({ education, setIsEditing }) {
  const { isAuthorized } = useContext(EducationsContext);

  return(
    <Card.Text>
        <Row className="align-items-center">
          <Col>
            <span>{education.school}</span>
            <br/>
            <span>{education.major}{"  "}</span>
            <span>{education.position}</span>
          </Col>
          {isAuthorized && (
            <Col xs lg="1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing((prev) => !prev)}
                className="mr-3"
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
    </Card.Text>
  )
}

export default EducationCard;