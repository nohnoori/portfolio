import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import CompanyDetailEdit from "./CompanyDetailEdit";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as Api from "../../api";

function CompanyDetail({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("회사 디테일");
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("company", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card style={{ width: "95%", margin: "auto" }}>
      <Card.Body>
        <Card.Title>회사 소개</Card.Title>
        {isEditing ? (
          <CompanyDetailEdit
            user={user}
            setUser={setUser}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Card.Text>
            <ReactMarkdown
              children={user?.description.detail}
              remarkPlugins={[remarkGfm]}
            />
          </Card.Text>
        )}
        {isEditable && isEditing === false && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}
export default CompanyDetail;
