import { useState } from 'react';

export default function SalaryView({ user, userRole, salaries, onUpdateSalary }) {
  const employeeId = user.id || 1;
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // Admin states
  const [editingSalaryId, setEditingSalaryId] = useState(null);
  const [baseInput, setBaseInput] = useState('');
  const [bonusInput, setBonusInput] = useState('');
  const [deductionInput, setDeductionInput] = useState('');
  const [paidStatusInput, setPaidStatusInput] = useState('Paid');

  const mySalary = salaries.find((s) => s.employeeId === employeeId) || {
    base: 0,
    bonus: 0,
    deduction: 0,
    paidStatus: 'Unpaid',
    period: 'Current Period'
  };

  const myNetPay = mySalary.base + mySalary.bonus - mySalary.deduction;

  const handleDownloadSimulation = () => {
    setDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            alert(`Payslip for ${mySalary.period} downloaded successfully!`);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleStartEdit = (s) => {
    setEditingSalaryId(s.id);
    setBaseInput(s.base);
    setBonusInput(s.bonus);
    setDeductionInput(s.deduction);
    setPaidStatusInput(s.paidStatus);
  };

  const handleSaveSalary = (id) => {
    onUpdateSalary(id, {
      base: Number(baseInput),
      bonus: Number(bonusInput),
      deduction: Number(deductionInput),
      paidStatus: paidStatusInput
    });
    setEditingSalaryId(null);
  };

  return (
    <div className="view-container animate-fade-in">
      {userRole === 'admin' ? (
        // ADMIN PAYROLL MANAGEMENT
        <div className="dashboard-panel glass">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Financial Board</span>
              <h3>Payroll Records & Processing</h3>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Period</th>
                  <th>Base Pay</th>
                  <th>Bonus</th>
                  <th>Deductions</th>
                  <th>Net Earnings</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((s) => {
                  const isEditing = editingSalaryId === s.id;
                  const net = s.base + (s.bonus || 0) - (s.deduction || 0);

                  return (
                    <tr key={s.id}>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.period}</td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="table-input"
                            value={baseInput}
                            onChange={(e) => setBaseInput(e.target.value)}
                          />
                        ) : (
                          `$${s.base.toLocaleString()}`
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="table-input"
                            value={bonusInput}
                            onChange={(e) => setBonusInput(e.target.value)}
                          />
                        ) : (
                          `$${s.bonus.toLocaleString()}`
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            type="number"
                            className="table-input"
                            value={deductionInput}
                            onChange={(e) => setDeductionInput(e.target.value)}
                          />
                        ) : (
                          `$${s.deduction.toLocaleString()}`
                        )}
                      </td>
                      <td>
                        <strong>${net.toLocaleString()}</strong>
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            className="table-select"
                            value={paidStatusInput}
                            onChange={(e) => setPaidStatusInput(e.target.value)}
                          >
                            <option value="Paid">Paid</option>
                            <option value="Processing">Processing</option>
                            <option value="Unpaid">Unpaid</option>
                          </select>
                        ) : (
                          <span className={`pill ${
                            s.paidStatus === 'Paid'
                              ? 'badge-success'
                              : s.paidStatus === 'Processing'
                              ? 'badge-info'
                              : 'badge-danger'
                          }`}>
                            {s.paidStatus}
                          </span>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <div className="table-actions">
                            <button
                              type="button"
                              className="btn-text-success"
                              onClick={() => handleSaveSalary(s.id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn-text-muted"
                              onClick={() => setEditingSalaryId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="btn-text-primary"
                            onClick={() => handleStartEdit(s)}
                          >
                            Edit Payroll
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // EMPLOYEE PAYSLIP VIEW
        <div className="salary-employee-layout">
          <div className="dashboard-panel glass salary-details-panel">
            <div className="panel-header">
              <div>
                <span className="eyebrow">June Summary</span>
                <h3>Compensation Overview</h3>
              </div>
              <span className={`pill ${
                mySalary.paidStatus === 'Paid' ? 'badge-success' : 'badge-warning'
              }`}>
                {mySalary.paidStatus}
              </span>
            </div>

            <div className="payroll-numbers-grid">
              <div className="payroll-num-card">
                <span>Base Salary</span>
                <h2>${mySalary.base.toLocaleString()}</h2>
              </div>
              <div className="payroll-num-card">
                <span>Total Bonuses</span>
                <h2 className="text-success">+ ${mySalary.bonus.toLocaleString()}</h2>
              </div>
              <div className="payroll-num-card">
                <span>Deductions</span>
                <h2 className="text-danger">- ${mySalary.deduction.toLocaleString()}</h2>
              </div>
            </div>

            <div className="net-pay-strip glass">
              <span className="label">Total Net Pay (June 2026)</span>
              <span className="value">${myNetPay.toLocaleString()}</span>
            </div>

            <div className="payslip-actions">
              <button type="button" className="secondary-btn" onClick={() => setShowInvoiceModal(true)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>View Full Invoice</span>
              </button>

              <button
                type="button"
                className="primary-btn"
                onClick={handleDownloadSimulation}
                disabled={downloading}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{downloading ? 'Downloading...' : 'Download Payslip'}</span>
              </button>
            </div>

            {downloading && (
              <div className="progress-bar-container">
                <div className="progress-label-row">
                  <span>Compiling PDF receipt...</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" style={{ width: `${downloadProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Full Invoice Modal view */}
          {showInvoiceModal && (
            <div className="modal-overlay glass animate-fade-in" onClick={() => setShowInvoiceModal(false)}>
              <div className="invoice-card glass animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="invoice-header">
                  <div className="invoice-logo">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <span>AuraHR Systems</span>
                  </div>
                  <button type="button" className="close-invoice-btn" onClick={() => setShowInvoiceModal(false)}>
                    Close
                  </button>
                </div>

                <div className="invoice-body">
                  <div className="invoice-title">
                    <h2>PAYSLIP INVOICE</h2>
                    <p>Period: {mySalary.period}</p>
                  </div>

                  <div className="invoice-parties">
                    <div className="party">
                      <span>ISSUER</span>
                      <strong>AuraHR Finance Division Ltd.</strong>
                      <p>Corporate HQ, Suite 404</p>
                    </div>
                    <div className="party text-right">
                      <span>RECIPIENT</span>
                      <strong>{user.name}</strong>
                      <p>Designation: {user.roleName}</p>
                    </div>
                  </div>

                  <div className="invoice-table">
                    <div className="invoice-row header">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="invoice-row">
                      <span>Monthly Base Salary</span>
                      <span>${mySalary.base.toLocaleString()}</span>
                    </div>
                    <div className="invoice-row text-success">
                      <span>Quarterly Bonus & Incentives</span>
                      <span>+ ${mySalary.bonus.toLocaleString()}</span>
                    </div>
                    <div className="invoice-row text-danger">
                      <span>Tax Deductions & Insurance</span>
                      <span>- ${mySalary.deduction.toLocaleString()}</span>
                    </div>
                    <div className="invoice-row footer">
                      <span>Net Deposited Amount</span>
                      <span>${myNetPay.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
