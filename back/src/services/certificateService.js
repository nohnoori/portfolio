import { Certificate } from "../db"; 
import { v4 as uuidv4 } from "uuid";

class CertificateAuthService {
  static async addCertificate({ user_id, title, description, when_date, }) {
    const id = uuidv4();

    const newCertificate = { id, user_id, title, description, when_date };
    const createdNewCertificate = await Certificate.create({newCertificate});

    return createdNewCertificate;
  }

  static async getCertificateInfo({ id }) {
    const certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "해당 자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificateList({ user_id }) {
    const certificateList = await Certificate.findByUserId({ user_id });
    return certificateList;
  }
}

export { CertificateAuthService };
