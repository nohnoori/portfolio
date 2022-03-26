import React, { useEffect, useState, createContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

import * as Api from "../../api";

// 하위 컴포넌트
import CareerCard from "./CareerCard";
import CareerAddForm from "./CareerAddForm";
// Careers 상태 관리
export const CareersContext = createContext();

function Careers({ isEditable, portfolioOwnerId }) {
  // portfolioOwner.id === userState.user?.id일 경우 isEditable은 true
  const [careers, setCareers] = useState([]); // 받아올 데이터(전역상태관리)
  const [isAdding, setIsAdding] = useState(false); // 추가 폼이 보이는지 여부

  useEffect(() => {
    Api.get("careers", portfolioOwnerId).then((res) => setCareers(res.data));
  }, [portfolioOwnerId]);

  return (
    <CareersContext.Provider value={{ setCareers }}>
      <Card style={{ width: "95%", margin: "auto " }}>
        <Card.Body>
          <Card.Title>경력</Card.Title>
          {careers.map((currentCareer) => (
            <CareerCard
              key={currentCareer.id}
              currentCareer={currentCareer}
              isEditable={isEditable}
            />
          ))}

          {/* 추가 버튼 */}
          {isEditable && ( // isEditable이 true일 경우 추가 버튼을 보여줌
            <Row className="text-center mt-4 mb-3">
              <Col sm={{ span: 20 }}>
                <Button onClick={() => setIsAdding(true)}>+</Button>
              </Col>
            </Row>
          )}

          {/* 추가 폼 */}
          {isAdding && (
            <CareerAddForm
              portfolioOwnerId={portfolioOwnerId}
              setCareers={setCareers}
              setIsAdding={setIsAdding} // 추가 폼을 닫을 때 setIsAdding을 false로 변경하기 위해 전달
            />
          )}
        </Card.Body>
      </Card>
    </CareersContext.Provider>
  );
}

export default Careers;
