import React, { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import CompanyDetailEdit from "./CompanyDetailEdit";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CompanyDetail() {
  const [detailEdit, setDetailEdit] = useState(false);
  const isEditable = true;
  const [user, setUser] = useState({
    description: {
      detail: `A paragraph with *emphasis* and **strong importance**.`,
    },
  });

  return (
    <Card style={{ width: "95%", margin: "auto" }}>
      <Card.Body>
        <Card.Title>회사 소개</Card.Title>
        {detailEdit ? (
          <CompanyDetailEdit
            user={user}
            setUser={setUser}
            setDetailEdit={setDetailEdit}
          />
        ) : (
          <Card.Text>
            <ReactMarkdown children={user.description.detail} />
          </Card.Text>
        )}
        {isEditable && detailEdit === false && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setDetailEdit(true)}
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
