import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ id }) {
    const certificate = await CertificateModel.findOne({ id });
    return certificate;
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async findByUserId({ user_id }) {
    const certificates = await CertificateModel.find({ user_id });
    return certificates;
  }

  static async delete({ id }) {
    const deletedCertificate = await CertificateModel.deleteOne({ id });
    return deletedCertificate;
  }
}

export { Certificate };
