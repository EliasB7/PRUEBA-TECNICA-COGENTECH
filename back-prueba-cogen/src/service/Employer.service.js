const { Employer } = require("../../db");

class EmployerService {
  static async createEmployer({ name }) {
    try {
      const newEmployer = await Employer.create({ name });
      return newEmployer;
    } catch (error) {
      throw new Error("Error al crear empleador");
    }
  }

  static async getAllEmployers() {
    try {
      const employers = await Employer.findAll();
      return employers.map((employer) => ({
        name: employer.name,
        id: employer.id,
      }));
    } catch (error) {
      throw new Error("Error al obtener empleadores");
    }
  }
}

module.exports = EmployerService;
