import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  ClipboardList,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  Clock3,
  UserCheck,
  FileText,
  BrainCircuit,
  ClipboardCheck,
  FileBarChart,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import "./TeacherDashboard.css";

// TEACHER DASHBOARD MODULES
const menuItems = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "My Groups", icon: Users },
  { name: "Smart Test Organizer", icon: ClipboardCheck },
  { name: "Student Test Results", icon: FileBarChart },
  { name: "AI Assistant", icon: BrainCircuit },
  { name: "Attendance", icon: CalendarCheck },
  { name: "Study Materials", icon: BookOpen },
  { name: "Assignments", icon: FileText },
  { name: "Students", icon: GraduationCap },
  { name: "Performance Analytics", icon: BarChart3 },
];

const overviewStats = [
  {
    title: "Total Students",
    value: "0",
    subtitle: "Across your groups",
    icon: Users,
  },
  {
    title: "Active Groups",
    value: "0",
    subtitle: "Your created classes",
    icon: GraduationCap,
  },
  {
    title: "Today's Attendance",
    value: "—",
    subtitle: "Not marked yet",
    icon: UserCheck,
  },
  {
    title: "Active Tests",
    value: "0",
    subtitle: "Currently available",
    icon: ClipboardList,
  },
];

// MODULE INFORMATION
const moduleInformation = {
  "My Groups": {
    title: "Manage Your Groups",
    description:
      "Create classes, generate joining codes and manage students who join your groups.",
    icon: Users,
    features: [
      "Create new groups and classes",
      "Generate unique joining codes",
      "Share invitation links with students",
      "Manage group members",
    ],
  },

  "Smart Test Organizer": {
    title: "Smart Test Organizer",
    description:
      "Create organized online tests by selecting subjects, topics, difficulty and question count.",
    icon: ClipboardCheck,
    features: [
      "Select group or class for the test",
      "Choose subjects and syllabus topics",
      "Select Easy, Normal or Hard difficulty",
      "Choose number of questions",
      "Set duration, marks and negative marking",
      "Preview and review questions before publishing",
    ],
  },

  "Student Test Results": {
    title: "Student Test Results",
    description:
      "Review individual and group-wise test performance with detailed answer analysis.",
    icon: FileBarChart,
    features: [
      "Filter results by group or class",
      "View individual student marks",
      "Check correct, incorrect and unattempted answers",
      "View question-wise answer reports",
      "Compare previous test performance",
      "Identify weak subjects and topics",
    ],
  },

  "AI Assistant": {
    title: "AI Teaching Assistant",
    description:
      "Use AI to prepare questions, explain topics, create notes and analyze student performance.",
    icon: BrainCircuit,
    features: [
      "Generate exam-level MCQ questions",
      "Create answers with explanations",
      "Prepare topic-wise notes",
      "Generate assignments and practice questions",
      "Analyze student weak areas",
      "Get teaching and improvement suggestions",
    ],
  },

  Attendance: {
    title: "Student Attendance",
    description:
      "Manage daily attendance and review group-wise attendance records.",
    icon: CalendarCheck,
    features: [
      "Select group and attendance date",
      "Mark Present, Absent, Late or Leave",
      "Save daily attendance",
      "View monthly attendance percentage",
      "Download attendance reports",
    ],
  },

  "Study Materials": {
    title: "Study Materials",
    description:
      "Upload and share learning resources with your selected groups.",
    icon: BookOpen,
    features: [
      "Upload PDF notes and documents",
      "Organize materials by subject",
      "Share resources with selected groups",
      "Manage uploaded materials",
    ],
  },

  Assignments: {
    title: "Assignments",
    description:
      "Create assignments, set deadlines and track student submissions.",
    icon: FileText,
    features: [
      "Create group-wise assignments",
      "Set submission deadlines",
      "Review student submissions",
      "Track pending and completed work",
    ],
  },

  Students: {
    title: "Student Management",
    description:
      "View and manage students who have joined your groups.",
    icon: GraduationCap,
    features: [
      "View joined students",
      "Search student profiles",
      "Check group membership",
      "View individual learning records",
    ],
  },

  "Performance Analytics": {
    title: "Performance Analytics",
    description:
      "Understand student progress through test results and performance trends.",
    icon: BarChart3,
    features: [
      "Group-wise average marks",
      "Top-performing students",
      "Subject-wise performance",
      "Weak-topic identification",
      "Test-to-test improvement trends",
    ],
  },

  Settings: {
    title: "Account Settings",
    description: "Manage your teacher account and preferences.",
    icon: Settings,
    features: [
      "Profile information",
      "Account preferences",
      "Notification preferences",
    ],
  },
};

export default function TeacherDashboard() {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentTime = new Date().getHours();

  const greeting =
    currentTime < 12
      ? "Good Morning"
      : currentTime < 17
        ? "Good Afternoon"
        : currentTime < 21
          ? "Good Evening"
          : "Good Night";

  const openModule = (moduleName) => {
    setActiveMenu(moduleName);
    setMobileOpen(false);
  };

  const activeInformation = moduleInformation[activeMenu];

  return (
    <div className="teacher-dashboard">

      {mobileOpen && (
        <div
          className="teacher-sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`teacher-sidebar ${
          mobileOpen ? "teacher-sidebar-open" : ""
        }`}
      >
        <div className="teacher-brand">
          <div className="teacher-brand-icon">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2>
              Exam<span>Sphere</span>
            </h2>
            <p>Teacher Portal</p>
          </div>

          <button
            className="teacher-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="teacher-menu-label">
          TEACHING WORKSPACE
        </div>

        <nav className="teacher-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`teacher-nav-link ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => openModule(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="teacher-sidebar-bottom">

          <button
            className={`teacher-nav-link ${
              activeMenu === "Settings" ? "active" : ""
            }`}
            onClick={() => openModule("Settings")}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="teacher-profile">
            <div className="teacher-avatar">T</div>

            <div>
              <strong>Teacher Account</strong>
              <span>Teacher Portal</span>
            </div>

            <LogOut size={17} />
          </div>

        </div>
      </aside>

      {/* MAIN CONTENT */}

      <main className="teacher-main">

        <header className="teacher-header">

          <div className="teacher-header-left">

            <button
              className="teacher-mobile-menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div>
              <span>TEACHER WORKSPACE</span>
              <h2>{activeMenu}</h2>
            </div>

          </div>

          <div className="teacher-header-right">

            <div className="teacher-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <button
              className="teacher-notification"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

          </div>

        </header>

        {/* OVERVIEW */}

        {activeMenu === "Overview" ? (

          <div className="teacher-content">

            <section className="teacher-welcome">

              <div>
                <span className="teacher-eyebrow">
                  YOUR TEACHING WORKSPACE
                </span>

                <h1>{greeting}, Teacher!</h1>

                <p>
                  Manage your classes, create online tests,
                  guide your students and track their progress
                  from one place.
                </p>
              </div>

              <button
                className="teacher-primary-button"
                onClick={() => openModule("My Groups")}
              >
                <Plus size={18} />
                Create New Group
              </button>

            </section>

            {/* STATS */}

            <section className="teacher-stats-grid">

              {overviewStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <article
                    className="teacher-stat-card"
                    key={stat.title}
                  >
                    <div className="teacher-stat-top">
                      <div className="teacher-stat-icon">
                        <Icon size={21} />
                      </div>

                      <ArrowUpRight size={17} />
                    </div>

                    <h3>{stat.value}</h3>
                    <strong>{stat.title}</strong>
                    <p>{stat.subtitle}</p>
                  </article>
                );
              })}

            </section>

            {/* MAIN GRID */}

            <section className="teacher-overview-grid">

              <div className="teacher-panel">

                <div className="teacher-panel-heading">
                  <div>
                    <h3>My Classes & Groups</h3>
                    <p>Manage your students and batches.</p>
                  </div>

                  <button
                    onClick={() => openModule("My Groups")}
                  >
                    View All
                  </button>
                </div>

                <div className="teacher-empty-state">

                  <div>
                    <Users size={27} />
                  </div>

                  <h4>No groups created yet</h4>

                  <p>
                    Create your first group to start adding
                    students and managing classes.
                  </p>

                  <button
                    className="teacher-primary-button"
                    onClick={() => openModule("My Groups")}
                  >
                    <Plus size={17} />
                    Create Group
                  </button>

                </div>

              </div>

              <div className="teacher-panel">

                <div className="teacher-panel-heading">
                  <div>
                    <h3>Quick Actions</h3>
                    <p>Frequently used teaching tools.</p>
                  </div>
                </div>

                <div className="teacher-quick-actions">

                  <button
                    onClick={() => openModule("Smart Test Organizer")}
                  >
                    <ClipboardCheck size={20} />
                    <span>
                      <strong>Smart Test Organizer</strong>
                      <small>Create topic-wise tests</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>

                  <button
                    onClick={() => openModule("Student Test Results")}
                  >
                    <FileBarChart size={20} />
                    <span>
                      <strong>Student Test Results</strong>
                      <small>Review marks and answers</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>

                  <button
                    onClick={() => openModule("AI Assistant")}
                  >
                    <BrainCircuit size={20} />
                    <span>
                      <strong>AI Teaching Assistant</strong>
                      <small>Generate questions and notes</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>

                  <button
                    onClick={() => openModule("Attendance")}
                  >
                    <CalendarCheck size={20} />
                    <span>
                      <strong>Mark Attendance</strong>
                      <small>Record group attendance</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>

                </div>

              </div>

            </section>

            {/* REMINDER */}

            <div className="teacher-footer-note">
              <Clock3 size={16} />
              <span>
                Create a student group to begin managing
                attendance, tests and learning activities.
              </span>
            </div>

          </div>

        ) : (

          /* OTHER MODULES */

          <div className="teacher-content">

            <section className="teacher-module-intro">

              <div className="teacher-module-icon">
                {activeInformation
                  ? React.createElement(activeInformation.icon, {
                      size: 27,
                    })
                  : <Sparkles size={27} />}
              </div>

              <div>
                <span className="teacher-eyebrow">
                  TEACHER WORKSPACE
                </span>

                <h1>
                  {activeInformation?.title || activeMenu}
                </h1>

                <p>
                  {activeInformation?.description ||
                    "Manage your teaching workspace."}
                </p>
              </div>

            </section>

            <section className="teacher-panel teacher-module-panel">

              <div className="teacher-panel-heading">
                <div>
                  <h3>Module Features</h3>
                  <p>
                    Tools available in this section.
                  </p>
                </div>
              </div>

              <div className="teacher-module-feature-list">

                {activeInformation?.features?.map(
                  (feature, index) => (
                    <div
                      className="teacher-module-feature"
                      key={index}
                    >
                      <div className="teacher-feature-check">
                        <UserCheck size={17} />
                      </div>

                      <span>{feature}</span>
                    </div>
                  )
                )}

              </div>

              <div className="teacher-module-notice">
                <Sparkles size={18} />
                <span>
                  This module is planned for development.
                  Its actual functionality will be connected
                  step by step.
                </span>
              </div>

              <button
                className="teacher-primary-button"
                onClick={() => openModule("Overview")}
              >
                Back to Overview
              </button>

            </section>

          </div>

        )}

      </main>

    </div>
  );
}