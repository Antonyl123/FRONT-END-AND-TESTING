// =============================================
// API Service Layer — connects to json-server
// Base URL: http://localhost:3001
// =============================================

const BASE_URL = 'http://localhost:3001';

// ---------- Generic helpers ----------

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`);
  // 204 No Content has no body
  if (res.status === 204) return null;
  return res.json();
}

const get    = (path)         => apiFetch(path);
const post   = (path, body)   => apiFetch(path, { method: 'POST',   body: JSON.stringify(body) });
const put    = (path, body)   => apiFetch(path, { method: 'PUT',    body: JSON.stringify(body) });
const patch  = (path, body)   => apiFetch(path, { method: 'PATCH',  body: JSON.stringify(body) });
const del    = (path)         => apiFetch(path, { method: 'DELETE' });

// =============================================
// EMPLOYEES
// =============================================
export const employeesAPI = {
  getAll:  ()          => get('/employees'),
  getById: (id)        => get(`/employees/${id}`),
  create:  (data)      => post('/employees', data),
  update:  (id, data)  => put(`/employees/${id}`, data),
  patch:   (id, data)  => patch(`/employees/${id}`, data),
  delete:  (id)        => del(`/employees/${id}`),
};

// =============================================
// ATTENDANCE
// =============================================
export const attendanceAPI = {
  getAll:        ()          => get('/attendance'),
  getByEmployee: (empId)     => get(`/attendance?employeeId=${empId}`),
  create:        (data)      => post('/attendance', data),
  update:        (id, data)  => put(`/attendance/${id}`, data),
  patch:         (id, data)  => patch(`/attendance/${id}`, data),
  delete:        (id)        => del(`/attendance/${id}`),
};

// =============================================
// LEAVE REQUESTS
// =============================================
export const leaveAPI = {
  getAll:        ()          => get('/leaveRequests'),
  getByEmployee: (empId)     => get(`/leaveRequests?employeeId=${empId}`),
  create:        (data)      => post('/leaveRequests', data),
  update:        (id, data)  => put(`/leaveRequests/${id}`, data),
  patch:         (id, data)  => patch(`/leaveRequests/${id}`, data),
  delete:        (id)        => del(`/leaveRequests/${id}`),
};

// =============================================
// SCHEDULES
// =============================================
export const schedulesAPI = {
  getAll:        ()          => get('/schedules'),
  getByEmployee: (empId)     => get(`/schedules?employeeId=${empId}`),
  create:        (data)      => post('/schedules', data),
  update:        (id, data)  => put(`/schedules/${id}`, data),
  patch:         (id, data)  => patch(`/schedules/${id}`, data),
  delete:        (id)        => del(`/schedules/${id}`),
};

// =============================================
// SALARIES
// =============================================
export const salariesAPI = {
  getAll:        ()          => get('/salaries'),
  getByEmployee: (empId)     => get(`/salaries?employeeId=${empId}`),
  create:        (data)      => post('/salaries', data),
  update:        (id, data)  => put(`/salaries/${id}`, data),
  patch:         (id, data)  => patch(`/salaries/${id}`, data),
  delete:        (id)        => del(`/salaries/${id}`),
};

// =============================================
// CREDENTIALS (Auth)
// =============================================
export const authAPI = {
  getAll:    ()             => get('/credentials'),
  findByEmail: (email)      => get(`/credentials?email=${encodeURIComponent(email)}`),
};
