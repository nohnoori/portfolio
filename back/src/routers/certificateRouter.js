import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.use(login_required);

// Certificate MVP 생성 API
certificateAuthRouter.post("/certificate/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // req에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;
    const when_date = req.body.when_date;

    // 위 데이터를 Certificate db에 추가하기
    const newCertificate = await CertificateAuthService.addCertificate({
      user_id,
      title,
      description,
      when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (e) {
    next(e);
  }
});


// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
certificateAuthRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { certificateAuthRouter };
