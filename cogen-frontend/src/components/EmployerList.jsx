import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employers");
        setEmployers(response.data);
      } catch (error) {
        console.error("Error al obtener empleadores:", error);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Todos los Empleadores</h1>
      <ul>
        {employers.map((employer) => (
          <li key={employer.id} className="mb-10">
            <h1 className="text-4xl">Nombre del empleador:</h1>
            <p className="text-bold text-2xl ">{employer.name} </p>
            <h1>Id del empleador:</h1>
            <p>{employer.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployerList;
