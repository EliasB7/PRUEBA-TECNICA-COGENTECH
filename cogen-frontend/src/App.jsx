import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployerList from "./components/EmployerList";
import HierarchyComponent from "./components/HierarchyWithVersioning";
import UpdateEmployer from "./components/UpdateEmployer";
import EmployerForm from "./components/EmployerForm";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  return (
    <Router>
      <div className="">
        <header className="mb-1">
          <nav className="flex space-x-4 ml-2 ">
            <Link to="/employees" className="btn hover:text-amber-100">
              All Employees
            </Link>
            <Link to="/employers" className="btn hover:text-amber-100">
              All Employers
            </Link>

            <Link to="/hierarchy" className="btn hover:text-amber-100">
              Hierarchy with Versioning
            </Link>
            <Link to="/updateEmployer" className="btn hover:text-amber-100">
              Update Employer
            </Link>
            <Link to="/createEmployee" className="btn hover:text-amber-100">
              Create Employee
            </Link>
            <Link to="/createEmployer" className="btn hover:text-amber-100">
              Create Employer
            </Link>
          </nav>
          <hr className="my-4" />
        </header>

        <Routes>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employers" element={<EmployerList />} />
          <Route path="/hierarchy" element={<HierarchyComponent />} />
          <Route path="/updateEmployer" element={<UpdateEmployer />} />
          <Route path="/createEmployee" element={<EmployeeForm />} />
          <Route path="/createEmployer" element={<EmployerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
