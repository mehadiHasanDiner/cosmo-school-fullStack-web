import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiCalendar,
  FiClipboard,
  FiFileText,
  FiDollarSign,
  FiBell,
  FiSettings,
  FiUser,
} from "react-icons/fi";

// =====================================================
// ADMIN MENU
// =====================================================

export const adminMenus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },

  {
    title: "User Management",
    icon: FiUsers,

    children: [
      {
        title: "Pending Approvals",
        path: "/dashboard/pending-users",
      },
      {
        title: "All Users",
        path: "/dashboard/users",
      },
      {
        title: "Rejected Users",
        path: "/dashboard/rejected-users",
      },
    ],
  },

  {
    title: "Employee Management",
    icon: FiUserCheck,

    children: [
      {
        title: "All Employees",
        path: "/dashboard/employees",
      },
      {
        title: "Teachers",
        path: "/dashboard/teachers",
      },
      {
        title: "Administrators",
        path: "/dashboard/administrators",
      },
      {
        title: "Librarians",
        path: "/dashboard/librarians",
      },
    ],
  },

  {
    title: "Student Management",
    icon: FiUsers,

    children: [
      {
        title: "All Students",
        path: "/dashboard/students",
      },
      {
        title: "Add Student",
        path: "/dashboard/add-student",
      },
      {
        title: "Student Enrollment",
        path: "/dashboard/student-enrollment",
      },
    ],
  },

  {
    title: "Academic Management",
    icon: FiBookOpen,

    children: [
      {
        title: "Academic Years",
        path: "/dashboard/academic-years",
      },
      {
        title: "Classes",
        path: "/dashboard/classes",
      },
      {
        title: "Sections",
        path: "/dashboard/sections",
      },
      {
        title: "Subjects",
        path: "/dashboard/subjects",
      },
      {
        title: "Teacher Assignment",
        path: "/dashboard/teacher-assignment",
      },
    ],
  },

  {
    title: "Routine",
    path: "/dashboard/routine",
    icon: FiCalendar,
  },

  {
    title: "Attendance",
    path: "/dashboard/attendance",
    icon: FiClipboard,
  },

  {
    title: "Examination",
    path: "/dashboard/examination",
    icon: FiFileText,
  },

  {
    title: "Fees & Payments",
    path: "/dashboard/fees",
    icon: FiDollarSign,
  },

  {
    title: "Notice",
    path: "/dashboard/notices",
    icon: FiBell,
  },

  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: FiSettings,
  },
];

// =====================================================
// TEACHER MENU
// =====================================================

export const teacherMenus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },

  {
    title: "My Classes",
    icon: FiBookOpen,

    children: [
      {
        title: "Assigned Classes",
        path: "/dashboard/my-classes",
      },
      {
        title: "My Subjects",
        path: "/dashboard/my-subjects",
      },
      {
        title: "My Students",
        path: "/dashboard/my-students",
      },
    ],
  },

  {
    title: "My Routine",
    path: "/dashboard/my-routine",
    icon: FiCalendar,
  },

  {
    title: "Attendance",
    icon: FiClipboard,

    children: [
      {
        title: "Take Attendance",
        path: "/dashboard/take-attendance",
      },
      {
        title: "Attendance History",
        path: "/dashboard/attendance-history",
      },
    ],
  },

  {
    title: "Academic",
    icon: FiBookOpen,

    children: [
      {
        title: "Classwork",
        path: "/dashboard/classwork",
      },
      {
        title: "Homework",
        path: "/dashboard/homework",
      },
      {
        title: "Learning Materials",
        path: "/dashboard/materials",
      },
    ],
  },

  {
    title: "Examination",
    icon: FiFileText,

    children: [
      {
        title: "My Exams",
        path: "/dashboard/my-exams",
      },
      {
        title: "Enter Marks",
        path: "/dashboard/enter-marks",
      },
      {
        title: "View Results",
        path: "/dashboard/results",
      },
    ],
  },

  {
    title: "Notices",
    path: "/dashboard/notices",
    icon: FiBell,
  },

  {
    title: "My Profile",
    path: "/dashboard/profile",
    icon: FiUser,
  },
];

// =====================================================
// GUARDIAN MENU
// =====================================================

export const guardianMenus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },

  {
    title: "My Children",
    icon: FiUsers,

    children: [
      {
        title: "Child Profile",
        path: "/dashboard/child-profile",
      },
      {
        title: "Academic Information",
        path: "/dashboard/child-academic",
      },
    ],
  },

  {
    title: "Attendance",
    path: "/dashboard/child-attendance",
    icon: FiClipboard,
  },

  {
    title: "Academic",
    icon: FiBookOpen,

    children: [
      {
        title: "Class Routine",
        path: "/dashboard/child-routine",
      },
      {
        title: "Homework",
        path: "/dashboard/child-homework",
      },
      {
        title: "Subjects",
        path: "/dashboard/child-subjects",
      },
      {
        title: "Teachers",
        path: "/dashboard/child-teachers",
      },
    ],
  },

  {
    title: "Examination",
    icon: FiFileText,

    children: [
      {
        title: "Exam Schedule",
        path: "/dashboard/exam-schedule",
      },
      {
        title: "Results",
        path: "/dashboard/child-results",
      },
      {
        title: "Report Card",
        path: "/dashboard/report-card",
      },
    ],
  },

  {
    title: "Fees & Payments",
    path: "/dashboard/child-fees",
    icon: FiDollarSign,
  },

  {
    title: "Notices",
    path: "/dashboard/notices",
    icon: FiBell,
  },

  {
    title: "My Profile",
    path: "/dashboard/profile",
    icon: FiUser,
  },
];

export const getDashboardMenus = (activeRole) => {
  if (activeRole === "admin") {
    return adminMenus;
  }

  if (activeRole === "teacher") {
    return teacherMenus;
  }

  if (activeRole === "guardian") {
    return guardianMenus;
  }

  return [];
};
