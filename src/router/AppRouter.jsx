import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { DashBoardPage, ProfilePage, HomePage } from '../ui/pages';
import EnrollmentPage from '../user/pages/student/EnrollmentPage';
import ListClasses from '../user/pages/professor/ListClasses';
import ListAttendance from '../user/pages/professor/ListAttendance';
import PublicRoute from './PublicRoute';
import { LoginPage, RegisterPage } from '../auth/pages';
import PageNotFound from '../ui/pages/PageNotFound';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashBoardPage />} />
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/enrollment" element={<EnrollmentPage />} />
        <Route path="/assigned_Classes" element={<ListClasses />} />
        <Route path="/attendance" element={<ListAttendance />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
