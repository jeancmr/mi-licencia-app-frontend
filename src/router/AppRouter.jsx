import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './';
import { DashBoardPage, ProfilePage, PageNotFound } from '../ui/pages';
import { LoginPage, RegisterPage } from '../auth/pages';
import { EnrollmentPage } from '../user/pages/student';
import { ListAttendancePage, ListClassesPage } from '../user/pages/professor';
import ClassPage from '../user/pages/admin/ClassPage';
import ManageUsersPage from '../user/pages/admin/ManageUsersPage';

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
        <Route path="/assigned_classes" element={<ListClassesPage />} />
        <Route path="/attendance" element={<ListAttendancePage />} />
        <Route path="/manage_classes" element={<ClassPage />} />
        <Route path="/manage_users" element={<ManageUsersPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
