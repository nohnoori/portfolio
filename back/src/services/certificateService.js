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

  static async setCertificate({ id, toUpdate }) {
    // 우선 해당 id 의 certificate이 db에 존재하는지 여부 확인
    let certificate = await Certificate.findById({ id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!certificate) {
      const errorMessage =
        "해당 자격증이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 description가 있다면, 즉 description 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }
    // 업데이트 대상에 when_date이 있다면, 즉 when_date 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({ id, fieldToUpdate, newValue });
    }

    return certificate;
  }

  static async getCertificateList({ user_id }) {
    const certificateList = await Certificate.findByUserId({ user_id });
    return certificateList;
  }
}

export { CertificateAuthService };
