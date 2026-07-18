import React, { useState } from 'react';

export default function AttendanceView({
  user,
  userRole,
  attendance,
  leaveRequests,
  onClockIn,
  onClockOut,
  onSubmitLeave,
  onApproveLeave,
  onRejectLeave
}) {
  const employeeId = user.id || 1;
  const todayLog = attendance.find((log) => log.employeeId === employeeId && log.date === '2026-07-09');
  
  // Leave form states
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveMessage, setLeaveMessage] = useState('');

  const handleClockToggle = () => {
    if (!todayLog || todayLog.checkIn === '--') {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      onClockIn(employeeId, timeStr);
    } else if (todayLog.checkOut === '--') {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      onClockOut(employeeId, timeStr);
    }
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      setLeaveMessage('Please fill in all leave request fields.');
      return;
    }

    onSubmitLeave({
      id: Date.now(),
      employeeId,
      name: user.name,
      type: leaveType,
      startDate,
      endDate,
      status: 'Pending',
      reason
    });

    setLeaveMessage('Leave request submitted successfully!');
    setStartDate('');
    setEndDate('');
    setReason('');
    setTimeout(() => setLeaveMessage(''), 3000);
  };

  return (
    <div className="view-container animate-fade-in">
      {userRole === 'admin' ? (
        // ADMIN ATTENDANCE & LEAVES VIEW
        <div className="attendance-admin-layout">
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Daily Log</span>
                <h3>Today’s Attendance (July 9, 2026)</h3>
              </div>
            </div>
            
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((log) => (
                    <tr key={log.id}>
                      <td className="table-emp-cell">
                        <strong>{log.name}</strong>
                      </td>
                      <td>{log.date}</td>
                      <td>{log.checkIn}</td>
                      <td>{log.checkOut}</td>
                      <td>
                        <span className={`pill ${
                          log.status === 'Present' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-panel glass">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Requests Queue</span>
                <h3>Leave Request Approvals</h3>
              </div>
              <span className="pill badge-warning">
                {leaveRequests.filter(r => r.status === 'Pending').length} Pending
              </span>
            </div>

            <div className="leave-requests-list">
              {leaveRequests.length > 0 ? (
                leaveRequests.map((req) => (
                  <div className="leave-request-card glass" key={req.id}>
                    <div className="req-card-header">
                      <div>
                        <h4>{req.name}</h4>
                        <span className="req-type-tag">{req.type}</span>
                      </div>
                      <span className={`pill badge-${
                        req.status === 'Pending' ? 'warning' : req.status === 'Approved' ? 'success' : 'danger'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="req-card-dates">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{req.startDate} to {req.endDate}</span>
                    </div>

                    <p className="req-card-reason">
                      <strong>Reason:</strong> "{req.reason}"
                    </p>

                    {req.status === 'Pending' && (
                      <div className="req-card-actions">
                        <button
                          type="button"
                          className="action-btn-deny"
                          onClick={() => onRejectLeave(req.id)}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          className="action-btn-approve"
                          onClick={() => onApproveLeave(req.id, req.employeeId)}
                        >
                          Approve
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="empty-text">No leave requests logged in system.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        // EMPLOYEE ATTENDANCE & LEAVES VIEW
        <div className="attendance-employee-layout">
          <div className="attendance-actions-column">
            {/* Clock in widget */}
            <div className="dashboard-panel glass clock-widget">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Work Time Tracker</span>
                  <h3>Time Clock</h3>
                </div>
              </div>

              <div className="clock-display">
                <span className="live-clock">08:58 AM</span>
                <span className="clock-date">July 9, 2026</span>
              </div>

              <div className="clock-log-details">
                <div className="clock-log-row">
                  <span>Shift Check-in:</span>
                  <strong>{todayLog ? todayLog.checkIn : '--'}</strong>
                </div>
                <div className="clock-log-row">
                  <span>Shift Check-out:</span>
                  <strong>{todayLog ? todayLog.checkOut : '--'}</strong>
                </div>
                <div className="clock-log-row">
                  <span>Status:</span>
                  <span className={`pill ${
                    todayLog?.status === 'Present' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {todayLog ? todayLog.status : 'Absent / Not Checked In'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={`clock-btn ${
                  !todayLog || todayLog.checkIn === '--'
                    ? 'btn-clock-in'
                    : todayLog.checkOut === '--'
                    ? 'btn-clock-out'
                    : 'btn-clock-done'
                }`}
                onClick={handleClockToggle}
                disabled={todayLog && todayLog.checkIn !== '--' && todayLog.checkOut !== '--'}
              >
                {!todayLog || todayLog.checkIn === '--'
                  ? 'Clock In Session'
                  : todayLog.checkOut === '--'
                  ? 'Clock Out Session'
                  : 'Completed For Today'}
              </button>
            </div>

            {/* Leave application form */}
            <div className="dashboard-panel glass">
              <div className="panel-header">
                <div>
                  <span className="eyebrow">Time Off Request</span>
                  <h3>Apply for Leave</h3>
                </div>
              </div>

              <form onSubmit={handleLeaveSubmit} className="leave-form">
                <div className="form-group">
                  <label>Leave Classification</label>
                  <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Maternity / Paternity">Maternity / Paternity</option>
                    <option value="Unpaid Leave">Unpaid Leave</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Justification / Reason</label>
                  <textarea
                    rows="3"
                    placeholder="Provide details about your request..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                  ></textarea>
                </div>

                {leaveMessage && <p className="form-feedback-message success">{leaveMessage}</p>}

                <button type="submit" className="primary-btn">
                  Submit Request
                </button>
              </form>
            </div>
          </div>

          {/* Leaves History */}
          <div className="dashboard-panel glass">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Leaves Tracker</span>
                <h3>My Leave Request History</h3>
              </div>
            </div>

            <div className="leave-history-list">
              {leaveRequests.filter((l) => l.employeeId === employeeId).length > 0 ? (
                leaveRequests
                  .filter((l) => l.employeeId === employeeId)
                  .map((req) => (
                    <div className="leave-history-item" key={req.id}>
                      <div className="history-main">
                        <strong>{req.type}</strong>
                        <p>{req.startDate} to {req.endDate}</p>
                        <span className="history-reason">"{req.reason}"</span>
                      </div>
                      <span className={`pill badge-${
                        req.status === 'Pending' ? 'warning' : req.status === 'Approved' ? 'success' : 'danger'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  ))
              ) : (
                <p className="empty-text">No time-off requests submitted yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
