import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import "../../index.css";
import AWS, { ApiGatewayManagementApi } from "aws-sdk";
import * as Api from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const imgRef = useRef(null);
  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: process.env.REACT_APP_POOL_ID, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = async (e) => {
    // input 태그를 통해 선택한 파일 객체
    const file = e.target.files[0];

    // img 필드에 id값 업로드
    await Api.put(`users/${user.id}`, {
      img: user.id,
    });

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
    <Card className="m-3 ms-4 mt-0" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <input
            type="file"
            id="upload"
            className="image-upload"
            onChange={handleFileInput}
            disabled={!isEditable}
          />
          <label htmlFor="upload" className="image-upload-wrapper">
            <img
              alt=""
              className="profile-img"
              ref={imgRef}
              src={`https://pss-image.s3.ap-northeast-2.amazonaws.com/${user?.img}.png`}
              // onError={() => {
              //   return (imgRef.current.src =
              //     "https://pss-image.s3.ap-northeast-2.amazonaws.com/default-profile.png");
              // }}
            />
          </label>
        </Row>
        <Card.Title className="mt-3">{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

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

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
