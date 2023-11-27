import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [versionHistory, setVersionHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get(
          "http://localhost:3000/employees"
        );
        setEmployeeData(employeesResponse.data);

        const employersResponse = await axios.get(
          "http://localhost:3000/employers"
        );
        setEmployers(employersResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const fetchEmployeeHistory = async (employeeId) => {
    try {
      const historyResponse = await axios.get(
        `http://localhost:3000/history/${employeeId}`
      );
      setVersionHistory(historyResponse.data);
    } catch (error) {
      console.error("Error al obtener historial del empleado:", error);
    }
  };

  const handleShowHistory = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    fetchEmployeeHistory(employeeId);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Lista de Empleados</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre del Empleado</th>
            <th className="border px-4 py-2">ID del Empleado</th>
            <th className="border px-4 py-2">Versión del empleado</th>
            <th className="border px-4 py-2">Empleador Actual</th>
            <th className="border px-4 py-2">ID del Empleador</th>
            <th className="border px-4 py-2">Historial</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{employee.id}</td>
              <td className="border px-4 py-2">{employee.version}</td>
              <td className="border px-4 py-2">
                {employee.Employer ? employee.Employer.name : "Sin Empleador"}
              </td>
              <td className="border px-4 py-2">
                {employee.Employer ? employee.Employer.id : "Sin Empleador"}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleShowHistory(employee.id)}
                >
                  Ver Historial
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedEmployeeId && (
        <div>
          <h2 className="text-xl mt-4">
            Historial de Versiones para el Empleado {selectedEmployeeId}
          </h2>
          <ul>
            {versionHistory.map((version) => (
              <li key={version.version}>
                Versión {version.version}: Empleador -{" "}
                {version.Employer
                  ? version.Employer.name
                  : "NO POSEÍA EMPLEADOR"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
