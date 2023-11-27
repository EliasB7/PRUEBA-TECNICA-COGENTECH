const EmployeeService = require("../service/Employee.service");

const createEmployee = async (req, res) => {
  try {
    const { name, employerId } = req.body;
    const newEmployee = await EmployeeService.createEmployee({
      name,
      employerId,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    handleError(res, error, "Error al crear empleado");
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.json(employees);
  } catch (error) {
    handleError(res, error, "Error al obtener empleados");
  }
};

const updateEmployeeEmployer = async (req, res) => {
  try {
    const { employeeId, newEmployerId } = req.body;
    const updatedEmployee = await EmployeeService.updateEmployer(
      employeeId,
      newEmployerId
    );
    res.json(updatedEmployee);
  } catch (error) {
    handleError(res, error, "Error al actualizar empleador");
  }
};

const handleNullEmployer = async (req, res) => {
  try {
    const employeesWithoutEmployer = await EmployeeService.handleNullEmployer();
    res.json(employeesWithoutEmployer);
  } catch (error) {
    handleError(res, error, "Error al manejar empleados sin empleador");
  }
};

module.exports = {
  handleNullEmployer,
  updateEmployeeEmployer,
  getAllEmployees,
  createEmployee,
};
