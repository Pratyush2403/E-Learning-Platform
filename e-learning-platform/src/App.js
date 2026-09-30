import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./Layouts/DashboardLayout";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import BrowseCourses from "./Pages/BrowseCourses";
import CourseDetail from "./Pages/CourseDetail";
import MyCourses from "./Pages/MyCourses";
import Progress from "./Pages/Progress";
import Profile from "./Pages/Profile";
import Feedback from "./Pages/Feedback";
import Developer from "./Pages/Developer";
import Auth from "./Pages/Auth";
import Certificate from "./Pages/Certificate";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<BrowseCourses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/certificate/:id" element={<Certificate />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}