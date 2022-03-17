import { Certificate } from "../db"; 
import { v4 as uuidv4 } from "uuid";

class CertificateAuthService {
  static async addCertificate({ user_id, title, description, when_date, }) {
    const id = uuidv4();

    const newCertificate = { id, user_id, title, description, when_date };
    const createdNewCertificate = await Certificate.create({newCertificate});

    return createdNewCertificate;
  }

  static async getCertificateList({ user_id }) {
    const certificateList = await Certificate.findByUserId({ user_id });
    return certificateList;
  }
}

export { CertificateAuthService };
