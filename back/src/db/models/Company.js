import { CompanyModel } from "../schemas/company";

class Company {
  static async create({ newCompany }) {
    const createdNewCompany = await CompanyModel.create(newCompany);
    return createdNewCompany;
  }

  static async findByEmail({ email }) {
    const company = await CompanyModel.findOne({ email });
    return company;
  }

  static async findById({ companyId }) {
    const company = await CompanyModel.findOne({ id: companyId });
    return company;
  }

  static async update({ companyId, fieldToUpdate, newValue }) {
    const filter = { id: companyId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCompany;
  }

  static async updatePassword({ email, fieldToUpdate, newValue }) {
    const filter = { email: email };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCompany = await CompanyModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCompany;
  }
}

export { Company };
