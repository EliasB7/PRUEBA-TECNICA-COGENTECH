const EmployerService = require("../service/Employer.service");

const createEmployer = async (req, res) => {
  try {
    const { name } = req.body;
    const newEmployer = await EmployerService.createEmployer({ name });
    res.status(201).json(newEmployer);
  } catch (error) {
    handleError(res, error, "Error al crear empleador");
  }
};

const getAllEmployers = async (req, res) => {
  try {
    const employers = await EmployerService.getAllEmployers();
    res.json(employers);
  } catch (error) {
    handleError(res, error, "Error al obtener empleadores");
  }
};

module.exports = {
  createEmployer,
  getAllEmployers,
};
