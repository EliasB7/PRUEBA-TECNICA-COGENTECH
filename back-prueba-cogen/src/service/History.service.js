const { Employee, Employer, HierarchyHistory } = require("../../db");

class HistoryandHerarchyService {
  static async getHierarchyWithVersioning(employeeId) {
    try {
      const mainEmployee = await Employee.findByPk(employeeId, {
        include: [{ model: Employer, as: "Employer" }],
      });

      if (!mainEmployee) {
        throw new Error("Empleado no encontrado");
      }

      const hierarchyHistory = await HierarchyHistory.findAll({
        where: { employeeId },
        order: [["createdAt", "DESC"]],
      });

      const hierarchyWithVersioning = hierarchyHistory.map((historyEntry) => ({
        version: historyEntry.version,
        employeeId: historyEntry.employeeId,
        employeeName: historyEntry.employeeName,
        employerId: historyEntry.employerId,
        employerName: historyEntry.employerName,
      }));

      hierarchyWithVersioning.unshift({
        version: mainEmployee.version,
        employeeId: mainEmployee.id,
        employeeName: mainEmployee.name,
        employerId: mainEmployee.employerId,
        employerName: mainEmployee.Employer.name,
      });

      return hierarchyWithVersioning;
    } catch (error) {
      throw new Error("Error al obtener jerarquía con versiones");
    }
  }

  static async getHistoryForEmployee(employeeId) {
    try {
      const history = await HierarchyHistory.findAll({
        where: { employeeId },
        include: [{ model: Employer, as: "Employer" }],
        order: [["createdAt", "DESC"]],
      });

      return history;
    } catch (error) {
      throw new Error("Error al obtener historial para empleado");
    }
  }

  static async getFullHierarchy() {
    try {
      const employers = await Employer.findAll();
      const employees = await Employee.findAll({
        include: [{ model: Employer, as: "Employer" }],
      });
      const hierarchyHistory = await HierarchyHistory.findAll({
        order: [["createdAt", "DESC"]],
      });

      const hierarchy = {};
      employers.forEach((employer) => {
        hierarchy[employer.id] = {
          employerId: employer.id,
          employerName: employer.name,
          employees: [],
        };
      });

      employees.forEach((employee) => {
        const { id, name, employerId, Employer } = employee;
        if (hierarchy[employerId]) {
          hierarchy[employerId].employees.push({
            employeeId: id,
            employeeName: name,
            version: employee.version,
          });
        }
      });

      hierarchyHistory.forEach((historyEntry) => {
        const { employeeId, employerId, version } = historyEntry;
        const employer = hierarchy[employerId];
        if (employer && employer.employees) {
          const employeeInfo = employer.employees.find(
            (emp) => emp.employeeId === employeeId
          );

          if (employeeInfo) {
            employeeInfo.version = version;
          }
        }
      });

      return Object.values(hierarchy);
    } catch (error) {
      throw new Error("Error al obtener jerarquía completa");
    }
  }
}

module.exports = HistoryandHerarchyService;
