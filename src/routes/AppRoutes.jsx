import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import PublicLayout from "../layouts/PublicLayout";
import StudentLayout from "../layouts/StudentLayout";
import OfficerLayout from "../layouts/OfficerLayout";

/* Public pages */
import Home from "../pages/public/Home";
import ScholarshipDetails from "../pages/public/ScholarshipDetails";
import About from "../pages/public/About";
import ApplyProcess from "../pages/public/ApplyProcess";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";

/* Student pages */
import StudentDashboard from "../pages/student/StudentDashboard";
import Scholarships from "../pages/student/Scholarships";
import ApplicationForm from "../pages/student/ApplicationForm";
import Documents from "../pages/student/Documents";
import Verification from "../pages/student/Verification";
import MyApplications from "../pages/student/MyApplications";
import ApplicationDetails from "../pages/student/ApplicationDetails";

/* Officer pages */
import OfficerDashboard from "../pages/officer/OfficerDashboard";
import Applications from "../pages/officer/Applications";
import ApplicationReview from "../pages/officer/ApplicationReview";
import OfficerAnalytics from "../pages/officer/OfficerAnalytics";


function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (role && user.role !== role) {
    if (user.role === "student") {
      return <Navigate to="/student" replace />;
    }

    if (user.role === "officer") {
      return <Navigate to="/officer" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}


function AppRoutes() {
  return (
    <Routes>

      {/* =========================================
          PUBLIC ROUTES
      ========================================= */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/scholarships/:id"
          element={<ScholarshipDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/apply-process"
          element={<ApplyProcess />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =========================================
          STUDENT ROUTES
      ========================================= */}

      <Route
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/scholarships"
          element={<Scholarships />}
        />

        <Route
          path="/student/apply/:id"
          element={<ApplicationForm />}
        />

        <Route
          path="/student/documents/:applicationId"
          element={<Documents />}
        />

        <Route
          path="/student/verification/:applicationId"
          element={<Verification />}
        />

        <Route
          path="/student/applications"
          element={<MyApplications />}
        />

        <Route
          path="/student/applications/:id"
          element={<ApplicationDetails />}
        />

      </Route>


      {/* =========================================
          OFFICER ROUTES
      ========================================= */}



      <Route
        element={
          <ProtectedRoute role="officer">
            <OfficerLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/officer"
          element={<OfficerDashboard />}
        />

        <Route
          path="/officer/applications"
          element={<Applications />}
        />

        <Route
          path="/officer/applications/:id"
          element={<ApplicationReview />}
        />

        <Route
          path="/officer/analytics"
          element={<OfficerAnalytics />}
        />
      </Route>



      {/* =========================================
          FALLBACK
      ========================================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;