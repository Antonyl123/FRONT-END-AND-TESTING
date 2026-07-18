import React from 'react';

export default function DashboardView({
  user,
  userRole,
  employees,
  attendance,
  leaveRequests,
  schedules,
  salaries,
  setActiveTab
}) {
  // Admin stats calculations
  const totalEmployees = employees.length;
  
  const presentToday = attendance.filter(
    (log) => log.date === '2026-07-10' && log.checkIn !== '--' && log.status === 'Present'
  ).length;

  const pendingLeaves = leaveRequests.filter((req) => req.status === 'Pending').length;
  
  const totalPayroll = salaries.reduce((acc, curr) => acc + (curr.basic || 0) + (curr.bonus || 0) - (curr.deductions || 0), 0);

  // Employee stats — use employeeId from credentials record
  const employeeId = user.employeeId || user.id;
  const myShifts = schedules.filter((s) => s.employeeId === employeeId).length;
  const myLeaves = leaveRequests.filter((l) => l.employeeId === employeeId).length;
  
  const mySalaryRecord = salaries.find((s) => s.employeeId === employeeId) || { basic: 0, bonus: 0, deductions: 0 };
  const myNetSalary = (mySalaryRecord.basic || 0) + (mySalaryRecord.bonus || 0) - (mySalaryRecord.deductions || 0);

  const todayLog = attendance.find((log) => log.employeeId === employeeId && log.date === '2026-07-10');
  const myStatus = todayLog ? todayLog.status : 'Not Clocked In';

  // SVG mini-chart paths for extra aesthetics
  const chartPoints = "10,90 40,75 70,80 100,50 130,60 160,30 190,40 220,10";

  return (
    <div className="view-container animate-fade-in">
      <div className="welcome-banner glass">
        <div className="banner-text">
          <span className="eyebrow">Workspace Hub</span>
          <h1>Welcome, {user.name}!</h1>
          <p>
            {userRole === 'admin'
              ? 'You have administrative control. Review attendance logs, update payroll information, and manage the team schedule.'
              : 'Here is your personalized portal. Track your work shifts, clock-in daily, review your payslips, and contact HR.'}
          </p>
        </div>
        <div className="banner-accent-circle"></div>
      </div>

      {userRole === 'admin' ? (
        // Admin Dashboard View
        <>
          <div className="stats-grid">
            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-primary-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Total Roster</p>
                <h3 className="stat-value">{totalEmployees}</h3>
                <span className="stat-trend success">Active Team Members</span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-success-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Present Today</p>
                <h3 className="stat-value">{presentToday}</h3>
                <span className="stat-trend info">
                  {totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0}% Attendance Rate
                </span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-warning-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                  <line x1="9" y1="19" x2="15" y2="19" />
                  <line x1="9" y1="11" x2="10" y2="11" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Pending Leaves</p>
                <h3 className="stat-value">{pendingLeaves}</h3>
                <span className="stat-trend warning">{pendingLeaves} requires attention</span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-danger-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Monthly Payroll</p>
                <h3 className="stat-value">${totalPayroll.toLocaleString()}</h3>
                <span className="stat-trend success">Approved and processing</span>
              </div>
            </div>
          </div>

          <div className="dashboard-content-layout">
            <div className="dashboard-panel glass panel-primary-accent">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Overview Chart</span>
                  <h3>Staff Growth Trend</h3>
                </div>
                <span className="pill badge-success">Live Tracking</span>
              </div>
              <div className="panel-chart-placeholder">
                {/* SVG Vector Line Chart */}
                <svg viewBox="0 0 240 100" className="vector-chart">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary-glow-color)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--primary-glow-color)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d={`M10,100 L${chartPoints} L220,100 Z`}
                    fill="url(#chartGrad)"
                  />
                  <polyline
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="3"
                    points={chartPoints}
                  />
                  {/* Grid lines */}
                  <line x1="10" y1="90" x2="230" y2="90" stroke="rgba(128,128,128,0.15)" strokeDasharray="4 4" />
                  <line x1="10" y1="50" x2="230" y2="50" stroke="rgba(128,128,128,0.15)" strokeDasharray="4 4" />
                  <line x1="10" y1="10" x2="230" y2="10" stroke="rgba(128,128,128,0.15)" strokeDasharray="4 4" />
                </svg>
                <div className="chart-legend">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                  <span>July (Current)</span>
                </div>
              </div>
            </div>

            <div className="dashboard-panel glass">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Quick Commands</span>
                  <h3>Administrative Control</h3>
                </div>
              </div>
              <div className="quick-actions-list">
                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('employees')}>
                  <div className="action-tile-icon bg-primary-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="16" y1="11" x2="22" y2="11" />
                    </svg>
                  </div>
                  <span>Add Employee</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('attendance')}>
                  <div className="action-tile-icon bg-warning-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                      <path d="M9.17 14.83a4 4 0 0 1 5.66 0" />
                    </svg>
                  </div>
                  <span>Review Leaves</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('schedule')}>
                  <div className="action-tile-icon bg-success-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <span>Assign Shifts</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('salary')}>
                  <div className="action-tile-icon bg-danger-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </div>
                  <span>Update Salaries</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Employee Dashboard View
        <>
          <div className="stats-grid">
            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-success-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Clock-In Status</p>
                <h3 className="stat-value">{myStatus}</h3>
                <span className="stat-trend success">July 9th status</span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-primary-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Assigned Shifts</p>
                <h3 className="stat-value">{myShifts}</h3>
                <span className="stat-trend info">Shifts scheduled this week</span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-danger-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">Current Payroll Net</p>
                <h3 className="stat-value">${myNetSalary.toLocaleString()}</h3>
                <span className="stat-trend success">Last payout period</span>
              </div>
            </div>

            <div className="stat-card glass hover-lift">
              <div className="stat-icon-box bg-warning-glow">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="stat-details">
                <p className="stat-label">My Leave Requests</p>
                <h3 className="stat-value">{myLeaves}</h3>
                <span className="stat-trend warning">Submitted applications</span>
              </div>
            </div>
          </div>

          <div className="dashboard-content-layout">
            <div className="dashboard-panel glass panel-primary-accent">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">My Calendar Summary</span>
                  <h3>Upcoming Shifts</h3>
                </div>
              </div>

              <div className="shifts-quick-list">
                {schedules.filter((s) => s.employeeId === employeeId).length > 0 ? (
                  schedules
                    .filter((s) => s.employeeId === employeeId)
                    .map((shift) => (
                      <div className="quick-shift-row" key={shift.id}>
                        <div className="shift-day-circle">{shift.shift.substring(0, 3)}</div>
                        <div className="shift-text-details">
                          <strong>{shift.shift} Shift</strong>
                          <p>{shift.timing}</p>
                        </div>
                        <span className="pill badge-info">Active</span>
                      </div>
                    ))
                ) : (
                  <p className="empty-text">No shifts assigned to you this week.</p>
                )}
              </div>
            </div>

            <div className="dashboard-panel glass">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Shortcuts</span>
                  <h3>Quick Tools</h3>
                </div>
              </div>
              <div className="quick-actions-list">
                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('attendance')}>
                  <div className="action-tile-icon bg-success-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <span>Daily Clock-in</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('attendance')}>
                  <div className="action-tile-icon bg-warning-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                      <path d="M9.17 14.83a4 4 0 0 1 5.66 0" />
                    </svg>
                  </div>
                  <span>Request Leave</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('salary')}>
                  <div className="action-tile-icon bg-danger-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <span>My Payslip</span>
                </button>

                <button type="button" className="action-tile hover-scale" onClick={() => setActiveTab('schedule')}>
                  <div className="action-tile-icon bg-primary-glow">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <span>My Shift Calendar</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
