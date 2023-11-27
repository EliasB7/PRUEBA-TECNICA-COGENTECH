import React, { useState } from "react";
import axios from "axios";

const UpdateEmployer = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [newEmployerId, setNewEmployerId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleNewEmployerIdChange = (event) => {
    setNewEmployerId(event.target.value);
  };

  const handleUpdateEmployer = async () => {
    try {
      if (!employeeId || (!newEmployerId && newEmployerId !== "")) {
        setErrorMessage("Por favor, complete todos los campos");
        setSuccessMessage("");
        return;
      }

      const updatedNewEmployerId = newEmployerId || null;

      const response = await axios.put("http://localhost:3000/updateEmployer", {
        employeeId,
        newEmployerId: updatedNewEmployerId,
      });

      setSuccessMessage("Empleado actualizado exitosamente");
      setErrorMessage("");
      console.log("Empleado actualizado:", response.data);
    } catch (error) {
      setSuccessMessage("");
      if (error.response && error.response.status === 404) {
        setErrorMessage("Empleado no encontrado");
        console.log("Empleado no encontrado");
      } else {
        setErrorMessage("Error interno del servidor: " + error.message);
        console.error("Error interno del servidor:", error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md text-black">
      <label className="block mb-2">
        Employee ID:
        <input
          className="w-full border rounded-md p-2 text-white"
          type="text"
          value={employeeId}
          onChange={handleEmployeeIdChange}
        />
      </label>
      <br />
      <label className="block mb-2">
        New Employer ID:
        <input
          className="w-full border rounded-md p-2 text-white"
          type="text"
          value={newEmployerId}
          onChange={handleNewEmployerIdChange}
        />
      </label>
      <br />
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleUpdateEmployer}
      >
        Actualizar Empleador
      </button>
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-2 mt-2 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-2 mt-2 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateEmployer;
