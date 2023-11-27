const router = require("express").Router();

const {
  getAllEmployees,
  updateEmployeeEmployer,
  createEmployee,
  handleNullEmployer,
} = require("../controllers/employee.controller");

const {
  getAllEmployers,
  createEmployer,
} = require("../controllers/employer.controller");

const {
  getHierarchyWithVersioning,
  getHistoryForEmployee,
  getFullHierarchy,
} = require("../controllers/history.controller");

router.get("/employees", async (req, res) => {
  try {
    await getAllEmployees(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

router.get("/employers", async (req, res) => {
  try {
    await getAllEmployers(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

router.post("/createEmployees", createEmployee);
router.post("/createEmployer", createEmployer);

router.get("/hierarchy/:employeeId", async (req, res) => {
  try {
    await getHierarchyWithVersioning(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

router.get("/hierarchy", async (req, res) => {
  try {
    await getFullHierarchy(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

router.put("/updateEmployer", async (req, res) => {
  try {
    await updateEmployeeEmployer(req, res);
  } catch (error) {
    console.error("Error al actualizar empleador:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/employeesWithoutEmployer", async (req, res) => {
  try {
    await handleNullEmployer(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

router.get("/history/:employeeId", async (req, res) => {
  try {
    await getHistoryForEmployee(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
});

module.exports = router;
