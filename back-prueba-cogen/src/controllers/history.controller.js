const HistoryandHerarchyService = require("../service/History.service");

const getFullHierarchy = async (req, res) => {
  try {
    const hierarchy = await HistoryandHerarchyService.getFullHierarchy();
    res.json(hierarchy);
  } catch (error) {
    handleError(res, error, "Error al obtener jerarquía completa");
  }
};

const getHistoryForEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const history = await HistoryandHerarchyService.getHistoryForEmployee(
      employeeId
    );
    res.json(history);
  } catch (error) {
    handleError(res, error, "Error al obtener historial para empleado");
  }
};

const getHierarchyWithVersioning = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const hierarchy =
      await HistoryandHerarchyService.getHierarchyWithVersioning(employeeId);
    res.json(hierarchy);
  } catch (error) {
    handleError(res, error, "Error al obtener jerarquía con versiones");
  }
};

module.exports = {
  getHierarchyWithVersioning,
  getHistoryForEmployee,
  getFullHierarchy,
};
