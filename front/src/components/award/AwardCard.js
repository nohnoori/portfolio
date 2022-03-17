import React, { useState,useEffect } from "react";
import { Card, Form, Button ,Row, Col } from 'react-bootstrap';



function AwardCard({ setIsEditing, award ,isEditable , setIsAdding,title}) {
  useEffect(() => {
    return () => setIsAdding(false);
  }, []);
  
  return(
    <Form>
        {/* 수상내역들 쫘라라락 */}
        <Row  className="mb-3">
          <Col>
            <Row>
                {award?.title}
                {award?.description}
            </Row>
          </Col>
          <Col lg="1">
            {isEditable && (
              <Row>
                <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >편집
                </Button>
              </Row>
            )}
          </Col>
        </Row>
        <Row>
          {isEditable && (
            <Col sm={{ span: 20 }}>
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => setIsAdding(true)}
              >추가</Button>
            </Col>)
          }
        </Row>
      </Form>
  )
}
export default AwardCard;
