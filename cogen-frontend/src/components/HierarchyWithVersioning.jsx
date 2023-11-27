import React, { useState, useEffect } from "react";
import axios from "axios";

const HierarchyComponent = () => {
  const [hierarchyData, setHierarchyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/hierarchy");
        setHierarchyData(response.data);
      } catch (error) {
        console.error("Error al obtener la jerarquía:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {hierarchyData.map((employer) => (
        <div key={employer.employerId} className="mb-4 border p-4 rounded">
          <h1 className="font-bold text-4xl mb-2">Empleador</h1>
          <h2 className="text-4xl font-bold mb-2">{employer.employerName}</h2>
          <h1 className="font-bold text-2xl">Empleado</h1>

          <ul className="list-disc pl-8">
            {employer.employees.map((employee) => (
              <li key={employee.employeeId} className="text-lg">
                {employee.employeeName} (Version: {employee.version})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default HierarchyComponent;
