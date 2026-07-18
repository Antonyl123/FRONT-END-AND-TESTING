import React, { useState } from 'react';

export default function ScheduleView({ user, userRole, employees, schedules, onAddShift, onDeleteShift }) {
  const employeeId = user.id || 1;
  
  // Assign Shift Form states
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [shiftHours, setShiftHours] = useState('09:00 AM - 05:00 PM');
  const [shiftRole, setShiftRole] = useState('Engineering Task');
  const [message, setMessage] = useState('');

  const handleAssignShift = (e) => {
    e.preventDefault();
    if (!selectedEmpId || !shiftHours || !shiftRole) {
      setMessage('Please fill in all shift details.');
      return;
    }

    const emp = employees.find((e) => e.id === Number(selectedEmpId));
    if (!emp) return;

    onAddShift({
      id: Date.now(),
      employeeId: emp.id,
      name: emp.name,
      day: selectedDay,
      shift: shiftHours,
      role: shiftRole
    });

    setMessage(`Shift assigned to ${emp.name} successfully!`);
    setShiftRole('');
    setTimeout(() => setMessage(''), 3000);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="view-container animate-fade-in">
      {userRole === 'admin' ? (
        // ADMIN SCHEDULE MANAGER
        <div className="schedule-admin-layout">
          <div className="dashboard-panel glass schedule-form-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Planner Controls</span>
                <h3>Assign Work Shift</h3>
              </div>
            </div>

            <form onSubmit={handleAssignShift} className="shift-form">
              <div className="form-group">
                <label>Select Team Member</label>
                <select value={selectedEmpId} onChange={(e) => setSelectedEmpId(e.target.value)}>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Day of the Week</label>
                <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div className="form-group">
                <label>Shift Timing / Hours</label>
                <select value={shiftHours} onChange={(e) => setShiftHours(e.target.value)}>
                  <option value="09:00 AM - 05:00 PM">Day Shift (09:00 AM - 05:00 PM)</option>
                  <option value="12:00 PM - 08:00 PM">Mid Shift (12:00 PM - 08:00 PM)</option>
                  <option value="04:00 PM - 12:00 AM">Evening Shift (04:00 PM - 12:00 AM)</option>
                  <option value="08:00 PM - 04:00 AM">Night Shift (08:00 PM - 04:00 AM)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Focus Role / Assigned Task</label>
                <input
                  type="text"
                  placeholder="e.g. Lead QA testing, Server migration"
                  value={shiftRole}
                  onChange={(e) => setShiftRole(e.target.value)}
                  required
                />
              </div>

              {message && <p className="form-feedback-message success">{message}</p>}

              <button type="submit" className="primary-btn">
                Assign Shift Details
              </button>
            </form>
          </div>

          <div className="dashboard-panel glass schedule-roster-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">Active Roster Schedules</span>
                <h3>Assigned Weekly Shifts</h3>
              </div>
            </div>

            <div className="schedule-table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Day</th>
                    <th>Shift Timing</th>
                    <th>Assigned Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.length > 0 ? (
                    schedules.map((s) => (
                      <tr key={s.id}>
                        <td><strong>{s.name}</strong></td>
                        <td>
                          <span className="day-badge">{s.day}</span>
                        </td>
                        <td>{s.shift}</td>
                        <td>{s.role}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-text-danger"
                            title="Remove Shift"
                            onClick={() => onDeleteShift(s.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-table-cell">No shifts scheduled in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // EMPLOYEE CALENDAR/SHIFTS VIEW
        <div className="schedule-employee-layout">
          <div className="dashboard-panel glass employee-weekly-view">
            <div className="panel-header">
              <div>
                <span className="eyebrow">My Calendar Roster</span>
                <h3>My Weekly Schedule</h3>
              </div>
              <span className="pill badge-info">July Week 1</span>
            </div>

            <div className="calendar-week-grid">
              {daysOfWeek.map((day) => {
                const dayShifts = schedules.filter((s) => s.employeeId === employeeId && s.day === day);
                return (
                  <div className="calendar-day-card glass" key={day}>
                    <div className="day-header">
                      <h4>{day}</h4>
                    </div>
                    <div className="day-body">
                      {dayShifts.length > 0 ? (
                        dayShifts.map((shift) => (
                          <div className="shift-card-element" key={shift.id}>
                            <div className="role-tag">{shift.role}</div>
                            <div className="time-tag">
                              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{shift.shift}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-day-shift">
                          <span>Off Duty</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
