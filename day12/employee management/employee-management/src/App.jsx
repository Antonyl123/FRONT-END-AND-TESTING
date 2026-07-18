import { useState, useEffect } from 'react';
import './App.css';

// API Service Layer
import {
  employeesAPI,
  attendanceAPI,
  leaveAPI,
  schedulesAPI,
  salariesAPI,
  authAPI,
} from './api';

// Fallback mock data (used when json-server is offline)
import {
  INITIAL_EMPLOYEES,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_SCHEDULES,
  INITIAL_SALARIES,
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
  const [loading, setLoading] = useState(true);

  // Global Database States (fetched from json-server)
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [salaries, setSalaries] = useState([]);

  // ─── Load all data from API on mount (falls back to mock data if offline) ──
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [emps, att, leaves, scheds, sals] = await Promise.all([
          employeesAPI.getAll(),
          attendanceAPI.getAll(),
          leaveAPI.getAll(),
          schedulesAPI.getAll(),
          salariesAPI.getAll(),
        ]);
        setEmployees(emps);
        setAttendance(att);
        setLeaveRequests(leaves);
        setSchedules(scheds);
        setSalaries(sals);
      } catch (err) {
        // json-server not running — use mock data so the UI still works
        console.warn('API offline — loading fallback mock data:', err.message);
        setEmployees(INITIAL_EMPLOYEES);
        setAttendance(INITIAL_ATTENDANCE);
        setLeaveRequests(INITIAL_LEAVE_REQUESTS);
        setSchedules(INITIAL_SCHEDULES);
        setSalaries(INITIAL_SALARIES);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // ─── Dark theme sync ────────────────────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (darkTheme) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkTheme]);

  // ─── Auth credentials (always works, no server dependency) ─────────────────
  const PORTAL_CREDENTIALS = {
    admin: {
      id: 1, email: 'admin@aurahr.com', password: 'admin123',
      role: 'admin', employeeId: 1, name: 'John Anderson',
      jobRole: 'HR Administrator',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    employee: {
      id: 2, email: 'employee@aurahr.com', password: 'employee123',
      role: 'employee', employeeId: 101, name: 'Sophia Miller',
      jobRole: 'UI/UX Designer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  };

  // ─── Auth Handlers ──────────────────────────────────────────────────────────
  // portal = 'admin' | 'employee'  (passed from LoginView)
  const handleLogin = (email, password, portal) => {
    const cred = PORTAL_CREDENTIALS[portal];
    if (!cred || cred.email !== email || cred.password !== password) return false;
    setCurrentUser(cred);
    setUserRole(cred.role);
    setActiveTab('dashboard');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  // ─── Employee Handlers ──────────────────────────────────────────────────────
  const handleAddEmployee = async (newEmp) => {
    // 1. Update UI state immediately (optimistic update)
    setEmployees((prev) => [...prev, newEmp]);
    
    // Auto-create initial records locally
    const fallbackAtt = { id: Date.now() + 10, employeeId: newEmp.id, employeeName: newEmp.name, date: '2026-07-10', checkIn: '--', checkOut: '--', status: 'Absent' };
    const fallbackSal = { id: Date.now() + 20, employeeId: newEmp.id, name: newEmp.name, basic: 5000, bonus: 0, deductions: 0, netSalary: 5000, month: 'July 2026' };
    
    setAttendance((prev) => [...prev, fallbackAtt]);
    setSalaries((prev) => [...prev, fallbackSal]);

    // 2. Perform API requests in background
    try {
      const created = await employeesAPI.create(newEmp);
      
      // Auto-create attendance record
      const attRecord = await attendanceAPI.create({
        employeeId: created.id,
        employeeName: created.name,
        date: '2026-07-10',
        checkIn: '--',
        checkOut: '--',
        status: 'Absent',
      });

      // Auto-create salary record
      const salRecord = await salariesAPI.create({
        employeeId: created.id,
        name: created.name,
        basic: 5000,
        bonus: 0,
        deductions: 0,
        netSalary: 5000,
        month: 'July 2026',
      });
      
      // Sync local IDs with server IDs if needed
      setEmployees((prev) => prev.map((e) => (e.id === newEmp.id ? created : e)));
      setAttendance((prev) => prev.map((a) => (a.employeeId === newEmp.id ? attRecord : a)));
      setSalaries((prev) => prev.map((s) => (s.employeeId === newEmp.id ? salRecord : s)));
    } catch (err) {
      console.warn('API error during add employee (working in offline mode):', err.message);
    }
  };

  const handleUpdateEmployee = async (updatedEmp) => {
    // 1. Update UI state immediately (optimistic update)
    setEmployees((prev) => prev.map((e) => (e.id === updatedEmp.id ? updatedEmp : e)));
    setAttendance((prev) =>
      prev.map((a) => (a.employeeId === updatedEmp.id ? { ...a, employeeName: updatedEmp.name } : a))
    );
    setSchedules((prev) =>
      prev.map((s) => (s.employeeId === updatedEmp.id ? { ...s, employeeName: updatedEmp.name } : s))
    );
    setSalaries((prev) =>
      prev.map((s) => (s.employeeId === updatedEmp.id ? { ...s, name: updatedEmp.name } : s))
    );

    // 2. Perform API updates in background
    try {
      await employeesAPI.update(updatedEmp.id, updatedEmp);

      // Sync names in other collections
      const attUpdates = attendance
        .filter((a) => a.employeeId === updatedEmp.id)
        .map((a) => attendanceAPI.patch(a.id, { employeeName: updatedEmp.name }));

      const schedUpdates = schedules
        .filter((s) => s.employeeId === updatedEmp.id)
        .map((s) => schedulesAPI.patch(s.id, { employeeName: updatedEmp.name }));

      const salUpdates = salaries
        .filter((s) => s.employeeId === updatedEmp.id)
        .map((s) => salariesAPI.patch(s.id, { name: updatedEmp.name }));

      await Promise.all([...attUpdates, ...schedUpdates, ...salUpdates]);
    } catch (err) {
      console.warn('API error during update employee (working in offline mode):', err.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    // 1. Update UI state immediately (optimistic update)
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setAttendance((prev) => prev.filter((a) => a.employeeId !== id));
    setSchedules((prev) => prev.filter((s) => s.employeeId !== id));
    setSalaries((prev) => prev.filter((s) => s.employeeId !== id));
    setLeaveRequests((prev) => prev.filter((l) => l.employeeId !== id));

    // 2. Perform API delete in background
    try {
      await employeesAPI.delete(id);

      // Cascade-delete related records
      const toDelete = [
        ...attendance.filter((a) => a.employeeId === id).map((a) => attendanceAPI.delete(a.id)),
        ...schedules.filter((s) => s.employeeId === id).map((s) => schedulesAPI.delete(s.id)),
        ...salaries.filter((s) => s.employeeId === id).map((s) => salariesAPI.delete(s.id)),
        ...leaveRequests.filter((l) => l.employeeId === id).map((l) => leaveAPI.delete(l.id)),
      ];
      await Promise.all(toDelete);
    } catch (err) {
      console.warn('API error during delete employee (working in offline mode):', err.message);
    }
  };

  // ─── Attendance Handlers ─────────────────────────────────────────────────────
  const handleClockIn = async (empId, time) => {
    try {
      const log = attendance.find(
        (a) => a.employeeId === empId && a.date === '2026-07-10'
      );
      if (!log) return;
      await attendanceAPI.patch(log.id, { checkIn: time, status: 'Present' });
      setAttendance((prev) =>
        prev.map((a) =>
          a.id === log.id ? { ...a, checkIn: time, status: 'Present' } : a
        )
      );
    } catch (err) {
      console.error('Clock-in error:', err);
    }
  };

  const handleClockOut = async (empId, time) => {
    try {
      const log = attendance.find(
        (a) => a.employeeId === empId && a.date === '2026-07-10'
      );
      if (!log) return;
      await attendanceAPI.patch(log.id, { checkOut: time });
      setAttendance((prev) =>
        prev.map((a) => (a.id === log.id ? { ...a, checkOut: time } : a))
      );
    } catch (err) {
      console.error('Clock-out error:', err);
    }
  };

  const handleSubmitLeave = async (newRequest) => {
    try {
      const created = await leaveAPI.create(newRequest);
      setLeaveRequests((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Submit leave error:', err);
    }
  };

  const handleApproveLeave = async (reqId, empId) => {
    try {
      await leaveAPI.patch(reqId, { status: 'Approved' });
      setLeaveRequests((prev) =>
        prev.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
      );

      // Sync attendance to 'On Leave'
      const log = attendance.find(
        (a) => a.employeeId === empId && a.date === '2026-07-10'
      );
      if (log) {
        await attendanceAPI.patch(log.id, {
          checkIn: '--',
          checkOut: '--',
          status: 'On Leave',
        });
        setAttendance((prev) =>
          prev.map((a) =>
            a.id === log.id
              ? { ...a, checkIn: '--', checkOut: '--', status: 'On Leave' }
              : a
          )
        );
      }

      // Sync employee status
      await employeesAPI.patch(empId, { status: 'On Leave' });
      setEmployees((prev) =>
        prev.map((e) => (e.id === empId ? { ...e, status: 'On Leave' } : e))
      );
    } catch (err) {
      console.error('Approve leave error:', err);
    }
  };

  const handleRejectLeave = async (reqId) => {
    try {
      await leaveAPI.patch(reqId, { status: 'Rejected' });
      setLeaveRequests((prev) =>
        prev.map((r) => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
      );
    } catch (err) {
      console.error('Reject leave error:', err);
    }
  };

  // ─── Schedule Handlers ──────────────────────────────────────────────────────
  const handleAddShift = async (newShift) => {
    try {
      const created = await schedulesAPI.create(newShift);
      setSchedules((prev) => [...prev, created]);
    } catch (err) {
      console.error('Add shift error:', err);
    }
  };

  const handleDeleteShift = async (shiftId) => {
    try {
      await schedulesAPI.delete(shiftId);
      setSchedules((prev) => prev.filter((s) => s.id !== shiftId));
    } catch (err) {
      console.error('Delete shift error:', err);
    }
  };

  // ─── Salary Handlers ─────────────────────────────────────────────────────────
  const handleUpdateSalary = async (salaryId, salaryUpdates) => {
    try {
      await salariesAPI.patch(salaryId, salaryUpdates);
      setSalaries((prev) =>
        prev.map((s) => (s.id === salaryId ? { ...s, ...salaryUpdates } : s))
      );
    } catch (err) {
      console.error('Update salary error:', err);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
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

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontSize: '1.2rem',
          color: '#6366f1',
          fontFamily: 'Inter, sans-serif',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '4px solid #e0e7ff',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <span>Loading AuraHR…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
            <main className="portal-content-pane">{renderActiveView()}</main>
          </div>

          {/* Shared Chatbot Assistant */}
          <Chatbot userRole={userRole} />
        </div>
      )}
    </div>
  );
}

export default App;
