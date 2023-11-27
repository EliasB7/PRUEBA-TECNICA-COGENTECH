import React, { useState } from "react";
import axios from "axios";

const EmployerForm = () => {
  const [employerName, setEmployerName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateEmployee = async () => {
    try {
      if (!employerName) {
        setErrorMessage("Por favor, ingrese el nombre del empleador");
        setSuccessMessage("");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/createEmployer",
        {
          name: employerName,
        }
      );

      setErrorMessage("");
      setSuccessMessage("Empleador creado exitosamente");
      console.log("Empleador creado:", response.data);
    } catch (error) {
      setErrorMessage("Error al crear empleador: " + error.message);
      setSuccessMessage("");
      console.error("Error al crear empleador:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md text-black">
      <h2 className="text-2xl mb-4">Crear Empleador</h2>
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
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
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

export default EmployerForm;
