import { Company } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class companyAuthService {
  static async addCompany({ name, email, password }) {
    // 이메일 중복 확인
    const company = await Company.findByEmail({ email });
    if (company) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newCompany = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewCompany = await Company.create({ newCompany });
    createdNewCompany.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCompany;
  }

  static async getCompany({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const company = await Company.findByEmail({ email });
    if (!company) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    // 비밀번호 일치 여부 확인
    const correctPasswordHash = company.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ companyId: company.id }, secretKey);

    // 반환할 loginCompany 객체를 위한 변수 설정
    const id = company.id;
    const name = company.name;
    const description = company.description;

    const loginCompany = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginCompany;
  }

  static async getCompanyInfo({ companyId }) {
    const company = await Company.findById({ companyId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!company) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return company;
  }
}

export { companyAuthService };
