import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();

certificateAuthRouter.use(login_required);

// Certificate MVP 생성 API
certificateAuthRouter.post("/certificate/create", async (req, res, next) => {
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

    res.status(200).json(newCertificate);
  } catch (e) {
    next(e);
  }
});

// Certificate MVP 조회 API
certificateAuthRouter.get("/certificates/:id", async (req, res, next) => {
  try {
    // URL로부터 추출한 certificate id를 가지고 db에서 certificate 정보를 찾음
    const id = req.params.id;
    const certificateInfo = await CertificateAuthService.getCertificateInfo({
      id,
    });

    if (certificateInfo.errorMessage) {
      throw new Error(certificateInfo.errorMessage);
    }

    res.status(200).json(certificateInfo);
  } catch (e) {
    next(e);
  }
});

// Certificate MVP 수정 API
certificateAuthRouter.put("/certificates/:id", async (req, res, next) => {
  try {
    // URL로부터 certificate id를 추출
    const id = req.params.id;

    // body data 로부터 업데이트할 certificate 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    const toUpdate = { title, description, when_date };

    const updatedCertificate = await CertificateAuthService.setCertificate({
      id,
      toUpdate,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (e) {
    next(e);
  }
});

// Certificate MVP 목록 조회 API
certificateAuthRouter.get(
  "/certificatelist/:user_id",
  async (req, res, next) => {
    try {
      // URL로부터 추출한 user_id를 가지고 db에서 certificate list를 찾음
      const user_id = req.params.user_id;
      const certificateInfo = await CertificateAuthService.getCertificateList({
        user_id,
      });

      res.status(200).json(certificateInfo);
    } catch (e) {
      next(e);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
certificateAuthRouter.get("/afterlogin", (req, res) => {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

export { certificateAuthRouter };
