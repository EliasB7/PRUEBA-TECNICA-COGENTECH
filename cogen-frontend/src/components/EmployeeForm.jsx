import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employerId, setEmployerId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateEmployee = async () => {
    try {
      if (!employeeName) {
        setErrorMessage("Por favor, intorudce el nombre del empleado");
        setSuccessMessage("");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/createEmployees",
        {
          name: employeeName,
          employerId: employerId || null,
        }
      );

      setErrorMessage("");
      setSuccessMessage("Empleado creado exitosamente");
      console.log("Empleado creado:", response.data);
    } catch (error) {
      setErrorMessage("Error al crear empleado: " + error.message);
      setSuccessMessage("");
      console.error("Error al crear empleado:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md text-black">
      <h2 className="text-2xl mb-4">Crear Empleado</h2>
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 mb-2 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mb-2 rounded-md">
          {errorMessage}
        </div>
      )}
      <label className="block mb-2">
        Nombre:
        <input
          className="w-full border rounded-md p-2 text-white"
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
      </label>
      <br />
      <label className="block mb-2">
        ID del Empleador:
        <input
          className="w-full border rounded-md p-2 text-white"
          type="text"
          value={employerId}
          onChange={(e) => setEmployerId(e.target.value)}
        />
      </label>
      <br />
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleCreateEmployee}
      >
        Crear Empleado
      </button>
    </div>
  );
};

export default EmployeeForm;
