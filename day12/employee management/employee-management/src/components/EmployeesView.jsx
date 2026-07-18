import { useState } from 'react';

export default function EmployeesView({ userRole, employees, onAddEmployee, onUpdateEmployee, onDeleteEmployee }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    joinedDate: '',
    avatar: ''
  });

  const [formError, setFormError] = useState('');

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      department: 'Design',
      phone: '',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      phone: emp.phone,
      joinedDate: emp.joinedDate,
      avatar: emp.avatar
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role || !formData.phone) {
      setFormError('Please fill out all required fields.');
      return;
    }

    if (editingEmployee) {
      onUpdateEmployee({
        ...editingEmployee,
        ...formData
      });
    } else {
      onAddEmployee({
        id: Date.now(),
        ...formData,
        status: 'Active'
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      onDeleteEmployee(id);
    }
  };

  return (
    <div className="view-container animate-fade-in">
      <div className="view-header-row">
        <div className="search-bar-wrapper glass">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, role, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {userRole === 'admin' && (
          <button type="button" className="primary-btn hover-lift" onClick={handleOpenAddModal}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add New Employee</span>
          </button>
        )}
      </div>

      <div className="employees-grid">
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <div className="employee-card glass hover-lift" key={emp.id}>
              <div className="emp-card-header">
                <img src={emp.avatar} alt={emp.name} className="emp-card-avatar" />
                <span className={`emp-status-dot ${emp.status === 'Active' ? 'active' : 'on-leave'}`}></span>
              </div>
              <div className="emp-card-body">
                <h3>{emp.name}</h3>
                <span className="emp-role-label">{emp.role}</span>
                <span className="emp-dept-badge">{emp.department}</span>

                <div className="emp-contact-details">
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{emp.email}</span>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>{emp.phone}</span>
                  </div>
                  <div className="contact-item">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>Joined: {emp.joinedDate}</span>
                  </div>
                </div>
              </div>

              {userRole === 'admin' && (
                <div className="emp-card-footer glass">
                  <button type="button" className="icon-btn edit-btn" title="Edit Employee" onClick={() => handleOpenEditModal(emp)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span>Edit</span>
                  </button>
                  <button type="button" className="icon-btn delete-btn" title="Delete Employee" onClick={() => handleDelete(emp.id)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="empty-text">No employees found matching the search criteria.</p>
        )}
      </div>

      {/* Slide-in Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay glass animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="modal-card glass animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingEmployee ? 'Edit Employee Details' : 'Add New Team Member'}</h2>
              <button type="button" className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ava Patel"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Corporate Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="employee@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Role / Position *</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Senior UX Designer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Department *</label>
                  <select name="department" value={formData.department} onChange={handleInputChange}>
                    <option value="Design">Design</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="People Operations">People Operations</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Contact Phone *</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 234-5678"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Joined Date *</label>
                  <input
                    type="date"
                    name="joinedDate"
                    value={formData.joinedDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Avatar Photo URL</label>
                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              {formError && <p className="error-text modal-error">{formError}</p>}

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  {editingEmployee ? 'Save Changes' : 'Register Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
