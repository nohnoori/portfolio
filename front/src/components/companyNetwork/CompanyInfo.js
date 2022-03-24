import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import Company from "./Company";
import CompanySimpleInfo from "./CompanySimpleInfo";

function CompanyInfo() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Company></Company>
        </Col>
        <Col xs lg="3">
          <CompanySimpleInfo></CompanySimpleInfo>
        </Col>
      </Row>
    </Container>
  );
}

export default CompanyInfo;
