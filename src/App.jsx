import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import EnrollmentPage from './pages/student/EnrollmentPage';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import ListClasses from './pages/professor/ListClasses';
import ListAttendance from './pages/professor/ListAttendance';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/enrollment" element={<EnrollmentPage />} />
            <Route path="/assigned_Classes" element={<ListClasses />} />
            <Route path="/attendance" element={<ListAttendance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
