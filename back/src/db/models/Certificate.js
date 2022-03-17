import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByUserId({ user_id }) {
    const certificateList = await CertificateModel.find({ user_id });
    return certificateList;
  }
}


export { Certificate };