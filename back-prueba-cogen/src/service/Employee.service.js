const { Employee, Employer, HierarchyHistory } = require("../../db");

class EmployeeService {
  static async createEmployee({ name, employerId }) {
    try {
      const newEmployee = await Employee.create({
        name,
        employerId,
        version: 1,
      });

      await HierarchyHistory.create({
        version: newEmployee.version,
        employeeId: newEmployee.id,
        employeeName: newEmployee.name,
        employerId: newEmployee.employerId,
        employerName: newEmployee.Employer ? newEmployee.Employer.name : null,
      });

      return newEmployee;
    } catch (error) {
      throw new Error("Error al crear empleado");
    }
  }

  static async getAllEmployees() {
    try {
      const employees = await Employee.findAll({
        include: [{ model: Employer, as: "Employer" }],
      });
      return employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        employerId: employee.employerId,
        Employer: employee.Employer,
        version: employee.version,
      }));
    } catch (error) {
      throw new Error("Error al obtener empleados");
    }
  }

  static async updateEmployer(employeeId, newEmployerId) {
    try {
      const employee = await Employee.findByPk(employeeId);

      if (!employee) {
        throw new Error("Empleado no encontrado");
      }

      const currentEmployer = await Employer.findByPk(employee.employerId);

      const updatedEmployee = await employee.update({
        employerId: newEmployerId,
        version: employee.version + 1,
      });

      await HierarchyHistory.create({
        version: updatedEmployee.version,
        employeeId: updatedEmployee.id,
        employeeName: updatedEmployee.name,
        employerId: newEmployerId,
        employerName: currentEmployer ? currentEmployer.name : null,
      });

      return updatedEmployee;
    } catch (error) {
      throw new Error("Error al actualizar empleador del empleado");
    }
  }

  static async handleNullEmployer() {
    try {
      const employeesWithoutEmployer = await Employee.findAll({
        where: { employerId: null },
      });

      return employeesWithoutEmployer;
    } catch (error) {
      throw new Error("Error al manejar empleados sin empleador");
    }
  }
}

module.exports = EmployeeService;
