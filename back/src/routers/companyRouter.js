import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { companyAuthService } from "../services/companyService";
import nodemailer from "nodemailer";

const companyAuthRouter = Router();

companyAuthRouter.post("/company/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 Company db에 추가하기
    const newCompany = await companyAuthService.addCompany({
      name,
      email,
      password,
    });

    if (newCompany.errorMessage) {
      throw new Error(newCompany.errorMessage);
    }

    res.status(200).json(newCompany);
  } catch (error) {
    next(error);
  }
});

companyAuthRouter.post("/company/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 Company db에서 company 찾기
    const company = await companyAuthService.getCompany({ email, password });

    if (company.errorMessage) {
      throw new Error(company.errorMessage);
    }

    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
});

companyAuthRouter.get(
  "/company/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 company id를 가지고 db에서 회사 정보를 찾음.
      const companyId = req.currentId;
      const currentCompanyInfo = await companyAuthService.getCompanyInfo({
        companyId,
      });

      if (currentCompanyInfo.errorMessage) {
        throw new Error(currentCompanyInfo.errorMessage);
      }

      res.status(200).json(currentCompanyInfo);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.get(
  "/company/:id",
  login_required,
  async function (req, res, next) {
    try {
      const companyId = req.params.id;
      const company = await companyAuthService.getCompanyInfo({ companyId });

      if (company.errorMessage) {
        throw new Error(company.errorMessage);
      }

      res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.put(
  "/company/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URL로부터 company id를 추출함.
      const companyId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const toUpdate = { ...req.body };

      // 해당 company 아이디로 회사 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCompany = await companyAuthService.setCompany({
        companyId,
        toUpdate,
      });

      if (updatedCompany.errorMessage) {
        throw new Error(updatedCompany.errorMessage);
      }

      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.put(
  "/company/:id/detail",
  login_required,
  async function (req, res, next) {
    try {
      // URL로부터 company id를 추출함.
      const companyId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const toUpdateDetail = req.body.detail;

      // 해당 company 아이디로 회사 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCompany = await companyAuthService.setCompanyDetail({
        companyId,
        toUpdateDetail,
      });

      if (updatedCompany.errorMessage) {
        throw new Error(updatedCompany.errorMessage);
      }

      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  }
);

//비밀번호 찾기 API
companyAuthRouter.post("/company/reset_password", async (req, res, next) => {
  try {
    const email = req.body.email;

    console.log(email);
    const generatedAuthNumber = Math.floor(Math.random() * 10 ** 8)
      .toString()
      .padStart(8, "0");

    const toUpdate = { password: generatedAuthNumber };
    const resetPassword = await companyAuthService.setPassword({
      email,
      toUpdate,
    });

    if (resetPassword.errorMessage) {
      throw new Error(resetPassword.errorMessage);
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"nuri" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "비밀번호 변경입니다",
      text: generatedAuthNumber,
      html: `<b>${generatedAuthNumber}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Sent Auth Email",
    });
  } catch (error) {
    next(error);
  }
});

export { companyAuthRouter };
