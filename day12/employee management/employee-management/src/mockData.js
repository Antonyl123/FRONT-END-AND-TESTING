export const PRESET_CREDENTIALS = {
  admin: {
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Eleanor Vance',
    role: 'Administrator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  employee: {
    email: 'employee@company.com',
    password: 'emp123',
    id: 1, // Maps to Ava Patel
    name: 'Ava Patel',
    role: 'Lead Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  }
};

export const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: 'Ava Patel',
    email: 'employee@company.com',
    role: 'Lead Designer',
    department: 'Design',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    joinedDate: '2023-04-12',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 2,
    name: 'Marcus Lee',
    email: 'marcus.l@company.com',
    role: 'Senior Developer',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    joinedDate: '2022-09-15',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 3,
    name: 'Noah Kim',
    email: 'noah.k@company.com',
    role: 'HR Specialist',
    department: 'People Operations',
    status: 'On Leave',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    joinedDate: '2024-01-10',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 4,
    name: 'Sarah Connor',
    email: 'sarah.c@company.com',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    joinedDate: '2023-11-01',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 5,
    name: 'Elena Rostova',
    email: 'elena.r@company.com',
    role: 'Product Manager',
    department: 'Product',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    joinedDate: '2021-05-18',
    phone: '+1 (555) 678-9012'
  }
];

export const INITIAL_ATTENDANCE = [
  { id: 1, employeeId: 1, name: 'Ava Patel', date: '2026-07-09', checkIn: '08:58 AM', checkOut: '--', status: 'Present' },
  { id: 2, employeeId: 2, name: 'Marcus Lee', date: '2026-07-09', checkIn: '09:05 AM', checkOut: '05:30 PM', status: 'Present' },
  { id: 3, employeeId: 3, name: 'Noah Kim', date: '2026-07-09', checkIn: '--', checkOut: '--', status: 'On Leave' },
  { id: 4, employeeId: 4, name: 'Sarah Connor', date: '2026-07-09', checkIn: '08:45 AM', checkOut: '05:00 PM', status: 'Present' },
  { id: 5, employeeId: 5, name: 'Elena Rostova', date: '2026-07-09', checkIn: '09:15 AM', checkOut: '--', status: 'Present' }
];

export const INITIAL_LEAVE_REQUESTS = [
  { id: 101, employeeId: 2, name: 'Marcus Lee', type: 'Medical Leave', startDate: '2026-07-15', endDate: '2026-07-17', status: 'Pending', reason: 'Dental surgery recovery' },
  { id: 102, employeeId: 1, name: 'Ava Patel', type: 'Casual Leave', startDate: '2026-07-20', endDate: '2026-07-22', status: 'Pending', reason: 'Family gathering' }
];

export const INITIAL_SCHEDULES = [
  { id: 201, employeeId: 1, name: 'Ava Patel', day: 'Monday', shift: '09:00 AM - 05:00 PM', role: 'Design Review' },
  { id: 202, employeeId: 1, name: 'Ava Patel', day: 'Tuesday', shift: '09:00 AM - 05:00 PM', role: 'Lead Design' },
  { id: 203, employeeId: 1, name: 'Ava Patel', day: 'Wednesday', shift: '09:00 AM - 05:00 PM', role: 'Collaborative Sync' },
  { id: 204, employeeId: 1, name: 'Ava Patel', day: 'Thursday', shift: '09:00 AM - 05:00 PM', role: 'Lead Design' },
  { id: 205, employeeId: 1, name: 'Ava Patel', day: 'Friday', shift: '09:00 AM - 04:00 PM', role: 'Weekly Retrospective' },
  
  { id: 206, employeeId: 2, name: 'Marcus Lee', day: 'Monday', shift: '10:00 AM - 06:00 PM', role: 'Coding / Deployment' },
  { id: 207, employeeId: 2, name: 'Marcus Lee', day: 'Tuesday', shift: '10:00 AM - 06:00 PM', role: 'Back-end Dev' },
  { id: 208, employeeId: 2, name: 'Marcus Lee', day: 'Wednesday', shift: '10:00 AM - 06:00 PM', role: 'Back-end Dev' },
  { id: 209, employeeId: 2, name: 'Marcus Lee', day: 'Thursday', shift: '10:00 AM - 06:00 PM', role: 'Code Refactoring' },
  { id: 210, employeeId: 2, name: 'Marcus Lee', day: 'Friday', shift: '10:00 AM - 05:00 PM', role: 'Sprint Review' }
];

export const INITIAL_SALARIES = [
  { id: 301, employeeId: 1, name: 'Ava Patel', base: 8500, bonus: 750, deduction: 400, paidStatus: 'Paid', period: 'June 2026' },
  { id: 302, employeeId: 2, name: 'Marcus Lee', base: 9200, bonus: 900, deduction: 500, paidStatus: 'Paid', period: 'June 2026' },
  { id: 303, employeeId: 3, name: 'Noah Kim', base: 6000, bonus: 300, deduction: 250, paidStatus: 'Paid', period: 'June 2026' },
  { id: 304, employeeId: 4, name: 'Sarah Connor', base: 7000, bonus: 500, deduction: 300, paidStatus: 'Paid', period: 'June 2026' },
  { id: 305, employeeId: 5, name: 'Elena Rostova', base: 10500, bonus: 1200, deduction: 600, paidStatus: 'Paid', period: 'June 2026' }
];
