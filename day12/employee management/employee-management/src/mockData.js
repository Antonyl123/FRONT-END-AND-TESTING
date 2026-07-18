 // ===============================
// LOGIN CREDENTIALS
// ===============================

export const PRESET_CREDENTIALS = {
  admin: {
    id: 1,
    name: "John Anderson",
    role: "HR Administrator",
    email: "admin@aurahr.com",
    password: "admin123",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },

  employee: {
    id: 101,
    name: "Sophia Miller",
    role: "UI/UX Designer",
    email: "employee@aurahr.com",
    password: "employee123",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
};

// ===============================
// EMPLOYEE LIST
// ===============================

export const INITIAL_EMPLOYEES = [
  {
    id: 101,
    name: "Sophia Miller",
    email: "employee@aurahr.com",
    role: "UI/UX Designer",
    department: "Design",
    phone: "+1 555-123-4567",
    joinedDate: "2024-01-12",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 102,
    name: "Michael Brown",
    email: "michael@aurahr.com",
    role: "Frontend Developer",
    department: "Engineering",
    phone: "+1 555-222-1234",
    joinedDate: "2023-11-15",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 103,
    name: "Emma Wilson",
    email: "emma@aurahr.com",
    role: "Backend Developer",
    department: "Engineering",
    phone: "+1 555-333-5678",
    joinedDate: "2022-08-20",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 104,
    name: "Daniel Lee",
    email: "daniel@aurahr.com",
    role: "Product Manager",
    department: "Product",
    phone: "+1 555-444-8899",
    joinedDate: "2021-04-18",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    id: 105,
    name: "Olivia Davis",
    email: "olivia@aurahr.com",
    role: "HR Executive",
    department: "People Operations",
    phone: "+1 555-555-7788",
    joinedDate: "2024-02-01",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    id: 106,
    name: "James Taylor",
    email: "james@aurahr.com",
    role: "Finance Analyst",
    department: "Finance",
    phone: "+1 555-666-1122",
    joinedDate: "2020-06-10",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
  },
];
// ===============================
// ATTENDANCE
// ===============================

export const INITIAL_ATTENDANCE = [
  {
    id: 1,
    employeeId: 101,
    employeeName: "Sophia Miller",
    date: "2026-07-10",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "Present"
  },
  {
    id: 2,
    employeeId: 102,
    employeeName: "Michael Brown",
    date: "2026-07-10",
    checkIn: "09:15 AM",
    checkOut: "06:10 PM",
    status: "Present"
  },
  {
    id: 3,
    employeeId: 103,
    employeeName: "Emma Wilson",
    date: "2026-07-10",
    checkIn: "--",
    checkOut: "--",
    status: "Absent"
  },
  {
    id: 4,
    employeeId: 104,
    employeeName: "Daniel Lee",
    date: "2026-07-10",
    checkIn: "09:05 AM",
    checkOut: "06:00 PM",
    status: "Present"
  },
  {
    id: 5,
    employeeId: 105,
    employeeName: "Olivia Davis",
    date: "2026-07-10",
    checkIn: "09:20 AM",
    checkOut: "06:15 PM",
    status: "Late"
  }
];

// ===============================
// LEAVE REQUESTS
// ===============================

export const INITIAL_LEAVE_REQUESTS = [
  {
    id: 1,
    employeeName: "Sophia Miller",
    type: "Casual Leave",
    from: "2026-07-15",
    to: "2026-07-16",
    reason: "Personal work",
    status: "Approved"
  },
  {
    id: 2,
    employeeName: "Michael Brown",
    type: "Sick Leave",
    from: "2026-07-18",
    to: "2026-07-19",
    reason: "Fever",
    status: "Pending"
  },
  {
    id: 3,
    employeeName: "Emma Wilson",
    type: "Vacation",
    from: "2026-08-01",
    to: "2026-08-05",
    reason: "Family trip",
    status: "Rejected"
  }
];

// ===============================
// WORK SCHEDULE
// ===============================

export const INITIAL_SCHEDULES = [
  {
    id: 1,
    employeeName: "Sophia Miller",
    shift: "Morning",
    timing: "09:00 AM - 06:00 PM"
  },
  {
    id: 2,
    employeeName: "Michael Brown",
    shift: "Morning",
    timing: "09:00 AM - 06:00 PM"
  },
  {
    id: 3,
    employeeName: "Emma Wilson",
    shift: "Evening",
    timing: "01:00 PM - 10:00 PM"
  },
  {
    id: 4,
    employeeName: "Daniel Lee",
    shift: "General",
    timing: "10:00 AM - 07:00 PM"
  },
  {
    id: 5,
    employeeName: "Olivia Davis",
    shift: "Morning",
    timing: "09:00 AM - 06:00 PM"
  }
];
// ===============================
// SALARY DATA
// ===============================

export const INITIAL_SALARIES = [
  {
    id: 1,
    employeeId: 101,
    name: "Sophia Miller",
    basic: 65000,
    bonus: 5000,
    deductions: 2000,
    netSalary: 68000,
    month: "July 2025",
  },
  {
    id: 2,
    employeeId: 102,
    name: "Michael Brown",
    basic: 70000,
    bonus: 6000,
    deductions: 2500,
    netSalary: 73500,
    month: "July 2025",
  },
  {
    id: 3,
    employeeId: 103,
    name: "Emma Wilson",
    basic: 72000,
    bonus: 4000,
    deductions: 3000,
    netSalary: 73000,
    month: "July 2025",
  },
  {
    id: 4,
    employeeId: 104,
    name: "Daniel Lee",
    basic: 85000,
    bonus: 8000,
    deductions: 3500,
    netSalary: 89500,
    month: "July 2025",
  },
  {
    id: 5,
    employeeId: 105,
    name: "Olivia Davis",
    basic: 60000,
    bonus: 3000,
    deductions: 1500,
    netSalary: 61500,
    month: "July 2025",
  },
  {
    id: 6,
    employeeId: 106,
    name: "James Taylor",
    basic: 75000,
    bonus: 7000,
    deductions: 2500,
    netSalary: 79500,
    month: "July 2025",
  },
];

// ===============================
// DASHBOARD STATS
// ===============================

export const DASHBOARD_STATS = {
  totalEmployees: INITIAL_EMPLOYEES.length,
  activeEmployees: INITIAL_EMPLOYEES.filter(emp => emp.status === "Active").length,
  onLeave: INITIAL_EMPLOYEES.filter(emp => emp.status === "On Leave").length,
  departments: 5,
};