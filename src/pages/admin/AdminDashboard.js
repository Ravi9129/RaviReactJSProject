import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import EmployeeList from '../../components/EmployeeList';
import UserList from '../../components/UserList';
import { getEmployees, deleteEmployee } from '../../services/EmployeeService';
import { getUsers } from '../../services/UserService';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('employees');
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'employees') {
          const data = await getEmployees();
          setEmployees(data);
        } else {
          const userData = await getUsers();
          setUsers(userData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Unauthorized access</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <div>
          <span className="me-3">Welcome, {user.username}</span>
          <span className="badge bg-danger">{user.role}</span>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </li>
      </ul>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : activeTab === 'employees' ? (
        <>
          <div className="mb-3">
            <button 
              className="btn btn-success"
              onClick={() => navigate('/employees/create')}
            >
              Add New Employee
            </button>
          </div>
          <EmployeeList 
            employees={employees} 
            onDelete={handleDeleteEmployee} 
            showActions={true}
          />
        </>
      ) : (
        <UserList users={users.filter(u => u.id !== user.id)} />
      )}
    </div>
  );
};

export default AdminDashboard;