import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/profile/UserProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeDetails from './pages/EmployeeDetails';
import Unauthorized from './pages/Unauthorized';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Home />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/employees/create" element={<CreateEmployee />} />
                <Route path="/employees/edit/:id" element={<EditEmployee />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
              </Route>

              {/* Admin Only Routes */}
              <Route element={<ProtectedRoute roles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;