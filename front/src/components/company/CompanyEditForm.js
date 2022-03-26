import react, { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

function CompanyEditForm({ user, setIsEditing, setUser }) {
  const [name, setSName] = useState(user?.name);
  const [summary, setSummary] = useState(user?.description.summary);
  const [location, setLocation] = useState(user?.description.location);
  const [headCount, setHeadCount] = useState(user?.description.headCount);
  const [benefit, setBenefit] = useState(user?.description.benefit);
  const [homepage, setHomepage] = useState(user?.description.homepage);

  //비밀번호 바꾸기 위한 변수
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordValid = password.length >= 4;

  const isPasswordSame = password === confirmPassword;

  const isFormValid = isPasswordSame && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user.id;
    await Api.put(`company/${user.id}`, {
      name,
      password,
      description: {
        summary,
        location,
        headCount,
        benefit,
        homepage,
      },
    });

    await Api.get("company", userId).then((res) => setUser(res.data));
    setIsEditing(false);
    alert("정보를 수정했습니다.");
  };
  console.log("회사 간단", user);
  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Editdetail" className="mb-3">
            <Form.Label>
              회사 이름
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Detail"
              value={name}
              onChange={(e) => setSName(e.target.value)}
            />
            <Form.Label>
              짧은 회사 소개를 적어주세요.
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Detail"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditLocation" className="mb-3">
            <Form.Label>
              회사 위치
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="위치"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditHeadCount" className="mb-3">
            <Form.Label>
              사원수
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="사원수"
              value={Number(headCount)}
              onChange={(e) => setHeadCount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditBenefit" className="mb-3">
            <Form.Label>
              복지
              <span style={{ fontSize: "13px", color: "orange" }}>*</span>
            </Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="복지"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="EditHomepage" className="mb-3">
            <Form.Label>홈페이지</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="홈페이지"
              value={homepage}
              onChange={(e) => setHomepage(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="registerPassword" className="mt-3">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <Form.Text className="text-success">
                비밀번호는 4글자 이상으로 설정해 주세요.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="registerConfirmPassword" className="mt-3">
            <Form.Label>비밀번호 재확인</Form.Label>
            <Form.Control
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordSame && (
              <Form.Text className="text-success">
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CompanyEditForm;
