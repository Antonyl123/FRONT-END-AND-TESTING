import { useState } from "react";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Albert",
      department: "Engineering",
      designation: "Software Engineer",
      salary: 50000,
    },
    {
      id: 2,
      name: "John",
      department: "HR",
      designation: "HR Manager",
      salary: 45000,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    department: "",
    designation: "",
    salary: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.department ||
      !formData.designation ||
      !formData.salary
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (isEditing) {
      setEmployees(
        employees.map((emp) =>
          emp.id === formData.id ? formData : emp
        )
      );
      setIsEditing(false);
    } else {
      setEmployees([
        ...employees,
        {
          ...formData,
          id: Date.now(),
        },
      ]);
    }

    setFormData({
      id: null,
      name: "",
      department: "",
      designation: "",
      salary: "",
    });
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <input
        className="search"
        type="text"
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <button type="submit">
          {isEditing ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>₹ {employee.salary}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;