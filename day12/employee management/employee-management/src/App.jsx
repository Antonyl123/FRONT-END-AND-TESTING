import { useState, useEffect } from 'react';
import './App.css';

// Import Mock Data
import {
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_SCHEDULES,
  INITIAL_SALARIES
} from './mockData';

// Import Subcomponents
import LoginView from './components/LoginView';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import DashboardView from './components/DashboardView';
import EmployeesView from './components/EmployeesView';
import AttendanceView from './components/AttendanceView';
import ScheduleView from './components/ScheduleView';
import SalaryView from './components/SalaryView';

function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'admin' or 'employee'

  // Application Layout States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkTheme, setDarkTheme] = useState(false);

  // Global Mock Database States
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [leaveRequests, setLeaveRequests] = useState(INITIAL_LEAVE_REQUESTS);
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [salaries, setSalaries] = useState(INITIAL_SALARIES);

  // Synchronize Dark Theme class on container
  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkTheme]);

  // Auth Handlers
  const handleLogin = (user, role) => {
    setCurrentUser(user);
    setUserRole(role);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  // Employees Roster Handlers
  const handleAddEmployee = (newEmp) => {
    setEmployees((prev) => [...prev, newEmp]);
    
    // Auto-create initial records in Attendance, Schedule, and Salary database
    setAttendance((prev) => [
      ...prev,
      { id: Date.now() + 10, employeeId: newEmp.id, name: newEmp.name, date: '2026-07-09', checkIn: '--', checkOut: '--', status: 'Absent' }
    ]);
    
    setSalaries((prev) => [
      ...prev,
      { id: Date.now() + 20, employeeId: newEmp.id, name: newEmp.name, base: 5000, bonus: 0, deduction: 0, paidStatus: 'Unpaid', period: 'June 2026' }
    ]);
  };

  const handleUpdateEmployee = (updatedEmp) => {
    setEmployees((prev) => prev.map((e) => (e.id === updatedEmp.id ? updatedEmp : e)));
    // Sync names in other lists
    setAttendance((prev) => prev.map((a) => (a.employeeId === updatedEmp.id ? { ...a, name: updatedEmp.name } : a)));
    setSchedules((prev) => prev.map((s) => (s.employeeId === updatedEmp.id ? { ...s, name: updatedEmp.name } : s)));
    setSalaries((prev) => prev.map((s) => (s.employeeId === updatedEmp.id ? { ...s, name: updatedEmp.name } : s)));
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    // Remove employee references
    setAttendance((prev) => prev.filter((a) => a.employeeId !== id));
    setSchedules((prev) => prev.filter((s) => s.employeeId !== id));
    setSalaries((prev) => prev.filter((s) => s.employeeId !== id));
    setLeaveRequests((prev) => prev.filter((l) => l.employeeId !== id));
  };

  // Attendance Handlers
  const handleClockIn = (empId, time) => {
    setAttendance((prev) =>
      prev.map((log) =>
        log.employeeId === empId && log.date === '2026-07-09'
          ? { ...log, checkIn: time, status: 'Present' }
          : log
      )
    );
  };

  const handleClockOut = (empId, time) => {
    setAttendance((prev) =>
      prev.map((log) =>
        log.employeeId === empId && log.date === '2026-07-09'
          ? { ...log, checkOut: time }
          : log
      )
    );
  };

  const handleSubmitLeave = (newRequest) => {
    setLeaveRequests((prev) => [newRequest, ...prev]);
  };

  const handleApproveLeave = (reqId, empId) => {
    // Approve Request
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );

    // Sync status to Active Attendance log for today (July 9th)
    setAttendance((prev) =>
      prev.map((log) =>
        log.employeeId === empId && log.date === '2026-07-09'
          ? { ...log, checkIn: '--', checkOut: '--', status: 'On Leave' }
          : log
      )
    );

    // Set employee active status in directory
    setEmployees((prev) =>
      prev.map((e) => (e.id === empId ? { ...e, status: 'On Leave' } : e))
    );
  };

  const handleRejectLeave = (reqId) => {
    setLeaveRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
    );
  };

  // Schedule Handlers
  const handleAddShift = (newShift) => {
    setSchedules((prev) => [...prev, newShift]);
  };

  const handleDeleteShift = (shiftId) => {
    setSchedules((prev) => prev.filter((s) => s.id !== shiftId));
  };

  // Salary Handlers
  const handleUpdateSalary = (salaryId, salaryUpdates) => {
    setSalaries((prev) =>
      prev.map((s) => (s.id === salaryId ? { ...s, ...salaryUpdates } : s))
    );
  };

  // Renders correct view based on navigation selection
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView
            user={currentUser}
            userRole={userRole}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            schedules={schedules}
            salaries={salaries}
            setActiveTab={setActiveTab}
          />
        );
      case 'employees':
        return (
          <EmployeesView
            userRole={userRole}
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        );
      case 'attendance':
        return (
          <AttendanceView
            user={currentUser}
            userRole={userRole}
            attendance={attendance}
            leaveRequests={leaveRequests}
            onClockIn={handleClockIn}
            onClockOut={handleClockOut}
            onSubmitLeave={handleSubmitLeave}
            onApproveLeave={handleApproveLeave}
            onRejectLeave={handleRejectLeave}
          />
        );
      case 'schedule':
        return (
          <ScheduleView
            user={currentUser}
            userRole={userRole}
            employees={employees}
            schedules={schedules}
            onAddShift={handleAddShift}
            onDeleteShift={handleDeleteShift}
          />
        );
      case 'salary':
        return (
          <SalaryView
            user={currentUser}
            userRole={userRole}
            salaries={salaries}
            onUpdateSalary={handleUpdateSalary}
          />
        );
      default:
        return <div>View not found.</div>;
    }
  };

  return (
    <div className={`app-shell ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      {!currentUser ? (
        <LoginView onLogin={handleLogin} />
      ) : (
        <div className="portal-layout">
          {/* Main vertical sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            onLogout={handleLogout}
          />

          {/* Core content container */}
          <div className="portal-main-area">
            {/* Top header navigation */}
            <Navbar
              activeTab={activeTab}
              user={currentUser}
              userRole={userRole}
              darkTheme={darkTheme}
              setDarkTheme={setDarkTheme}
            />

            {/* Injected Tab Content */}
            <main className="portal-content-pane">
              {renderActiveView()}
            </main>
          </div>

          {/* Shared Chatbot Assistant */}
          <Chatbot userRole={userRole} />
        </div>
      )}
    </div>
  );
}

export default App;
