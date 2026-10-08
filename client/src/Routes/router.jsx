import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Admission from "../pages/Admission/Admission";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import GuardianProfileSetup from "../pages/Dashboard/Guardian/GuardianProfileSetup";
import StudentLinkForm from "../pages/Dashboard/DashboardSetup/StudentLinkForm";
import AdminVerification from "../pages/Dashboard/Admin/AdminVerification";
import EmployeeProfileSetup from "../pages/Dashboard/Teacher/EmployeeProfileSetup";
import OnboardingRoute from "./OnboardingRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "admission",
        element: (
          <PrivateRoute>
            <Admission />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "complete-guardian-profile",
        element: (
          <OnboardingRoute
            allowedSteps={["guardian-profile"]}
            allowedAccountTypes={[
              "guardian",
              "guardian_teacher",
              "guardian_admin",
            ]}
          >
            <GuardianProfileSetup />
          </OnboardingRoute>
        ),
      },
      {
        path: "complete-employee-profile",
        element: (
          <OnboardingRoute
            allowedSteps={["employee-profile"]}
            allowedAccountTypes={[
              "teacher_admin",
              "guardian_teacher",
              "guardian_admin",
            ]}
          >
            <EmployeeProfileSetup />
          </OnboardingRoute>
        ),
      },
      {
        path: "link-student",
        element: (
          <OnboardingRoute
            allowedSteps={["student-link"]}
            allowedAccountTypes={[
              "guardian",
              "guardian_teacher",
              "guardian_admin",
            ]}
          >
            <StudentLinkForm />
          </OnboardingRoute>
        ),
      },
      {
        path: "admin/verifications",
        Component: AdminVerification,
      },
    ],
  },
]);
