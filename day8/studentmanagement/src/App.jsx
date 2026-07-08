import React, { useState } from "react";
import "./App.css";

function App() {
  const [regNo, setRegNo] = useState("");
  const [student, setStudent] = useState(null);

  const departments = {
    "101": "CSE",
    "102": "AI & DS",
    "103": "Mechanical",
    "104": "ECE",
    "105": "IT",
    "106": "Aero",
  };

  const students = {};

  // Generate 500+ students
  for (let dept = 101; dept <= 106; dept++) {
    for (let i = 1; i <= 85; i++) {
      const reg = `720823${dept}${String(i).padStart(3, "0")}`;

      students[reg] = {
        name: `Student ${i}`,
        department: departments[dept],
        cgpa: (6 + Math.random() * 4).toFixed(2),
        attendance: `${80 + Math.floor(Math.random() * 20)}%`,
        fees: Math.random() > 0.2 ? "Paid" : "Pending",
        year: "III Year",
        section: ["A", "B", "C"][i % 3],
        mentor: `Faculty ${i % 10}`,
        status: "Good",
      };
    }
  }

  // Your record
  students["720823104018"] = {
    name: "Antony L",
    department: "ECE",
    cgpa: "7.97",
    attendance: "91%",
    fees: "Paid",
    year: "III Year",
    section: "A",
    mentor: "Dr. R. Kumar",
    status: "Good",
    bloodGroup: "O+",
    placementTraining: "Active",
    email: "antonyl@hit.edu.in",
  };

  const searchStudent = () => {
    const data = students[regNo];
    if (data) {
      setStudent(data);
    } else {
      setStudent("notfound");
    }
  };

  return (
    <div className="container">
      <h1 className="title">
        🎓 Hindusthan Institute of Technology
      </h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Register Number"
          value={regNo}
          maxLength={12}
          onChange={(e) => setRegNo(e.target.value)}
        />

        <button onClick={searchStudent}>
          Search
        </button>
      </div>

      {student === "notfound" && (
        <div className="error">
          Student Record Not Found
        </div>
      )}

      {student && student !== "notfound" && (
        <div className="student-card">
          <h2 className="student-name">
            {student.name}
          </h2>

          <div className="details-grid">
            <div className="detail-box">
              <h4>Register Number</h4>
              <p>{regNo}</p>
            </div>

            <div className="detail-box">
              <h4>Department</h4>
              <p>{student.department}</p>
            </div>

            <div className="detail-box">
              <h4>Year</h4>
              <p>{student.year}</p>
            </div>

            <div className="detail-box">
              <h4>Section</h4>
              <p>{student.section}</p>
            </div>

            <div className="detail-box">
              <h4>Attendance</h4>
              <p>{student.attendance}</p>
            </div>

            <div className="detail-box">
              <h4>CGPA</h4>
              <p>{student.cgpa}</p>
            </div>

            <div className="detail-box">
              <h4>Fees Status</h4>
              <p>{student.fees}</p>
            </div>

            <div className="detail-box">
              <h4>Status</h4>
              <p>{student.status}</p>
            </div>

            <div className="detail-box">
              <h4>Mentor</h4>
              <p>{student.mentor}</p>
            </div>

            <div className="detail-box">
              <h4>Blood Group</h4>
              <p>{student.bloodGroup || "N/A"}</p>
            </div>

            <div className="detail-box">
              <h4>Email</h4>
              <p>{student.email || "N/A"}</p>
            </div>

            <div className="detail-box">
              <h4>Placement Training</h4>
              <p>{student.placementTraining || "Active"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;