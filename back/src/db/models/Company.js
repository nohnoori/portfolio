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
}

export { Company };
