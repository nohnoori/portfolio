// awardCard 컴포넌트
// 각 portofolioID에 등록된 award 목록들을 보여줌.
// - isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
// - 편집버튼을 누르면 isEditing의 상태는 true 변합니다.

import { Card,Row,Col,Button } from "react-bootstrap";

function AwardCard({setIsEditing, isEditable,award,portfoliOwerId}) {

  return(
    <>
      <Row className = "mb-3">
        <Col>
          <div>{award.title}</div>
          <div>{award.description}</div>
        </Col>
        <Col lg = "1">
          {isEditable && (
            <Button variant="outline-info" size = "sm" 
              onClick = {() => setIsEditing(true)}>편집</Button> ) }
        </Col>
      </Row>
    </>
  )
}

export default AwardCard;