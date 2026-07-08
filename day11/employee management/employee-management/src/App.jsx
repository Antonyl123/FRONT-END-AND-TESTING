import { useState } from 'react'
import './App.css'

const stats = [
  { label: 'Total Employees', value: '128', detail: '+12 this month' },
  { label: 'Present Today', value: '94', detail: '74% attendance' },
  { label: 'Pending Reviews', value: '8', detail: '2 urgent' },
]

const employees = [
  { name: 'Ava Patel', role: 'Product Designer', status: 'In Office', badge: 'success' },
  { name: 'Marcus Lee', role: 'Software Engineer', status: 'Remote', badge: 'info' },
  { name: 'Noah Kim', role: 'Operations Lead', status: 'On Leave', badge: 'warning' },
]

function App() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password to continue.')
      return
    }

    setError('')
    setIsLoggedIn(true)
  }

  return (
    <div className="app-shell">
      {!isLoggedIn ? (
        <section className="login-card">
          <div className="login-copy">
            <p className="eyebrow">Employee management portal</p>
            <h1>Run your team with clarity.</h1>
            <p className="subtitle">
              Monitor attendance, track payroll tasks, and stay connected to every department from one place.
            </p>
            <ul className="benefits">
              <li>Secure daily access</li>
              <li>Live staffing overview</li>
              <li>Faster team coordination</li>
            </ul>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Welcome back</h2>
            <p className="form-text">Sign in to open your dashboard.</p>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            {error ? <p className="error-text">{error}</p> : null}

            <button type="submit">Login</button>
            <p className="helper-text">Use any email and password to preview the dashboard.</p>
          </form>
        </section>
      ) : (
        <section className="dashboard">
          <aside className="sidebar">
            <div>
              <p className="eyebrow">Workspace</p>
              <h2>People Hub</h2>
            </div>
            <nav>
              <a href="#" className="active">Dashboard</a>
              <a href="#">Employees</a>
              <a href="#">Attendance</a>
              <a href="#">Reports</a>
            </nav>
            <div className="sidebar-card">
              <p>Need a quick summary?</p>
              <strong>4 approvals pending</strong>
            </div>
          </aside>

          <main className="main-panel">
            <header className="topbar">
              <div>
                <p className="eyebrow">Monday, July 8</p>
                <h3>Good morning, Olivia</h3>
              </div>
              <button type="button" className="ghost-button">+ Add employee</button>
            </header>

            <section className="stats-grid">
              {stats.map((item) => (
                <article className="stat-card" key={item.label}>
                  <p>{item.label}</p>
                  <h4>{item.value}</h4>
                  <span>{item.detail}</span>
                </article>
              ))}
            </section>

            <section className="content-grid">
              <article className="panel big-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Team snapshot</p>
                    <h3>Current roster</h3>
                  </div>
                  <span className="status-pill">Live</span>
                </div>

                <ul className="employee-list">
                  {employees.map((employee) => (
                    <li key={employee.name}>
                      <div>
                        <strong>{employee.name}</strong>
                        <p>{employee.role}</p>
                      </div>
                      <span className={`badge ${employee.badge}`}>{employee.status}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Focus</p>
                    <h3>Today’s priorities</h3>
                  </div>
                </div>
                <ul className="task-list">
                  <li>Approve onboarding documents</li>
                  <li>Confirm payroll changes</li>
                  <li>Schedule one-on-ones</li>
                </ul>
              </article>
            </section>
          </main>
        </section>
      )}
    </div>
  )
}

export default App
