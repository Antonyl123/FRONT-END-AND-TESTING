import React from 'react';

export default function Navbar({ activeTab, user, userRole, darkTheme, setDarkTheme }) {
  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'employees': return 'Employee Directory';
      case 'attendance': return 'Attendance Logs';
      case 'schedule': return 'Work Shifts & Schedules';
      case 'salary': return 'Payroll & Compensation';
      default: return 'AuraHR';
    }
  };

  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <span className="date-badge">{formatDate()}</span>
        <h2 className="navbar-title">{getTabTitle()}</h2>
      </div>

      <div className="navbar-right">
        {/* Theme Switcher Button */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setDarkTheme(!darkTheme)}
          title={darkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkTheme ? (
            // Sun Icon
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            // Moon Icon
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="moon-icon">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* User profile */}
        <div className="user-profile-badge">
          <img src={user.avatar} alt={user.name} className="user-avatar" />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role-badge">{userRole === 'admin' ? 'Administrator' : user.roleName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
