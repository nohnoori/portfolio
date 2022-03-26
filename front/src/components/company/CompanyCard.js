import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import AWS from "aws-sdk";
import "../../index.css";

function CompanyCard({ user, setIsEditing, isEditable }) {
  const navigate = useNavigate();

  const imgRef = useRef(null);
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:ab728621-f9a4-43d8-8b6a-26672cce00ea", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = (e) => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "pss-image", // 버킷 이름
        Key: user.id + ".png", // 유저 아이디
        Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.");
        window.location.reload();
      },
      function (err) {
        return console.log("오류가 발생했습니다: ", err);
      }
    );
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          {isEditable && (
            <input
              type="file"
              id="upload"
              className="image-upload"
              onChange={handleFileInput}
              disabled={!isEditable}
            />
          )}

          <label htmlFor="upload" className="image-upload-wrapper">
            <img
              style={{
                width: "14rem",
                display: "block",
                margin: "0px auto",
              }}
              alt="profile"
              className="profile-img"
              ref={imgRef}
              src={`https://pss-image.s3.ap-northeast-2.amazonaws.com/${user?.id}.png`}
              onError={() => {
                return (imgRef.current.src =
                  "https://pss-image.s3.ap-northeast-2.amazonaws.com/default-profile.png");
              }}
            />
          </label>
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          {user?.description.summary}
        </Card.Subtitle>
        <hr />
        <div>사원수</div>
        <div className="mb-2 text-muted mb-1">
          {user?.description.headCount}명
        </div>
        <div>복지</div>
        <div className="mb-2 text-muted mb-1">{user?.description.benefit}</div>
        <div>위치</div>
        <div className="mb-2 text-muted mb-1">{user?.description.location}</div>
        <div>홈페이지</div>
        <div className="mb-2 text-muted mb-1">{user?.description.homepage}</div>

        {isEditable && (
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
export default CompanyCard;
