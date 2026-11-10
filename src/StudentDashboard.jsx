import PreparationRoadmap from "./PreparationRoadmap";
import ExamFinder from "./ExamFinder";
import ExploreExams from "./ExploreExams";
import React, { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Search,
  ClipboardList,
  BookOpen,
  Bot,
  ChartNoAxesCombined,
  Bookmark,
  Settings,
  Bell,
  ChevronDown,
  ArrowRight,
  Clock,
  Target,
  Trophy,
  CalendarDays,
  Menu,
  X,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

import "./StudentDashboard.css";

// Dashboard navigation
const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Explore Exams", icon: Search },
  { name: "Exam Finder", icon: GraduationCap },
  { name: "My Tests", icon: ClipboardList },
  { name: "Study Materials", icon: BookOpen },
  { name: "AI Assistant", icon: Bot },
  { name: "Performance", icon: ChartNoAxesCombined },
  { name: "Bookmarks", icon: Bookmark },
  { name: "Syllabus & Roadmap", icon: BookOpen },
];

// Dashboard statistics (demo data)
const stats = [
  {
    title: "Enrolled Exams",
    value: "24",
    change: "+3 this month",
    icon: GraduationCap,
  },
  {
    title: "Tests Completed",
    value: "18",
    change: "+5 this week",
    icon: ClipboardList,
  },
  {
    title: "Learning Progress",
    value: "78%",
    change: "+12% this month",
    icon: Target,
  },
  {
    title: "Study Hours",
    value: "36h",
    change: "+8h this week",
    icon: Clock,
  },
];

// Upcoming exams (demo data)
const exams = [
  {
    name: "UPSC Civil Services",
    category: "Civil Services",
    date: "June 2027",
    days: "218 days left",
    progress: 68,
    color: "blue",
  },
  {
    name: "BPSC Combined Competitive Exam",
    category: "State PSC",
    date: "January 2027",
    days: "62 days left",
    progress: 45,
    color: "purple",
  },
  {
    name: "RRB NTPC",
    category: "Railway",
    date: "February 2027",
    days: "91 days left",
    progress: 32,
    color: "orange",
  },
];

// Weekly activity (demo data)
const weeklyActivity = [
  { day: "Mon", height: 40 },
  { day: "Tue", height: 65 },
  { day: "Wed", height: 48 },
  { day: "Thu", height: 85 },
  { day: "Fri", height: 58 },
  { day: "Sat", height: 95 },
  { day: "Sun", height: 70 },
];

// Sidebar component
function Sidebar({
  activeMenu,
  setActiveMenu,
  mobileOpen,
  setMobileOpen,
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`dashboard-sidebar ${
          mobileOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-brand">
          <div className="brand-icon">
            <GraduationCap size={23} />
          </div>

          <div>
            <h2>ExamSphere</h2>
            <span>Student Portal</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-label">MAIN MENU</div>

        <nav className="sidebar-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`sidebar-link ${
                  activeMenu === item.name ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu(item.name);
                  setMobileOpen(false);
                }}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="premium-card">
            <div className="premium-icon">
              <Trophy size={20} />
            </div>

            <h3>Unlock Your Potential</h3>

            <p>
              Get access to premium learning resources,
              mock tests and AI assistance.
            </p>

            <button onClick={() => setActiveMenu("Premium")}>
              Explore Premium <ArrowRight size={15} />
            </button>
          </div>

          <button
            className={`sidebar-link settings-link ${
              activeMenu === "Settings" ? "active" : ""
            }`}
            onClick={() => {
              setActiveMenu("Settings");
              setMobileOpen(false);
            }}
          >
            <Settings size={19} />
            <span>Settings</span>
          </button>

          <div className="sidebar-profile">
            <div className="profile-avatar">A</div>

            <div className="profile-info">
              <strong>Aman Kumar</strong>
              <span>Student Account</span>
            </div>

            <ChevronDown size={17} />
          </div>
        </div>
      </aside>
    </>
  );
}

// Dashboard header
function DashboardHeader({
  setMobileOpen,
  searchQuery,
  setSearchQuery,
  showMessage,
  showSearch,
}) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {showSearch && (
          <div className="header-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search exams, courses, materials..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="header-right">
        <button
          className="notification-button"
          onClick={() => showMessage("You are all caught up!")}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="notification-dot" />
        </button>

        <div className="header-user">
          <div className="header-avatar">A</div>
          <span>Aman</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

// Welcome banner
function WelcomeBanner({ setActiveMenu }) {
  return (
    <section className="welcome-banner">
      <div className="welcome-content">
        <span className="welcome-label">
          YOUR LEARNING JOURNEY
        </span>

        <h1>Good morning, Aman! 👋</h1>

        <p>
          Every small step brings you closer to your goal.
          Keep learning and stay consistent.
        </p>

        <button onClick={() => setActiveMenu("Explore Exams")}>
          Explore Exams <ArrowRight size={17} />
        </button>
      </div>

      <div className="welcome-decoration">
        <GraduationCap size={100} />
      </div>
    </section>
  );
}

// Statistics section
function StatsSection() {
  return (
    <section className="stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="stat-card" key={stat.title}>
            <div className="stat-top">
              <div className="stat-icon">
                <Icon size={21} />
              </div>
            </div>

            <h3>{stat.value}</h3>
            <p>{stat.title}</p>

            <span className="stat-change">
              {stat.change}
            </span>
          </div>
        );
      })}
    </section>
  );
}

// Learning progress
function LearningProgress() {
  return (
    <section className="dashboard-card learning-card">
      <div className="section-heading">
        <div>
          <h2>Learning Progress</h2>
          <p>Track your weekly learning activity</p>
        </div>

        <button className="text-link">
          This week <ChevronDown size={15} />
        </button>
      </div>

      <div className="progress-content">
        <div className="progress-circle">
          <div className="progress-inner">
            <strong>78%</strong>
            <span>Completed</span>
          </div>
        </div>

        <div className="progress-details">
          <h3>Great progress!</h3>

          <p>
            You are making consistent progress towards
            your preparation goals.
          </p>

          <div className="progress-legend">
            <span className="legend-completed" />
            Completed
          </div>

          <div className="progress-legend">
            <span className="legend-remaining" />
            Remaining
          </div>
        </div>
      </div>

      <div className="weekly-activity">
        <div className="section-heading">
          <h3>Weekly Activity</h3>
          <span>Study hours</span>
        </div>

        <div className="activity-chart">
          {weeklyActivity.map((item) => (
            <div className="activity-column" key={item.day}>
              <div className="activity-bar-wrapper">
                <div
                  className="activity-bar"
                  style={{ height: `${item.height}%` }}
                  title={`${item.day} activity`}
                />
              </div>

              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Upcoming exams
function UpcomingExams({ searchQuery, setActiveMenu }) {
  const filteredExams = exams.filter((exam) =>
    `${exam.name} ${exam.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="dashboard-card upcoming-card">
      <div className="section-heading">
        <div>
          <h2>Upcoming Exams</h2>
          <p>Keep track of your exam preparation</p>
        </div>

        <button
          className="text-link"
          onClick={() => setActiveMenu("Explore Exams")}
        >
          View All <ArrowRight size={15} />
        </button>
      </div>

      <div className="upcoming-exams-list">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <div className="upcoming-exam" key={exam.name}>
              <div className={`exam-icon ${exam.color}`}>
                <CalendarDays size={21} />
              </div>

              <div className="exam-information">
                <h3>{exam.name}</h3>
                <p>
                  {exam.category} · {exam.date}
                </p>

                <div className="exam-progress">
                  <div className="exam-progress-track">
                    <div
                      className="exam-progress-fill"
                      style={{ width: `${exam.progress}%` }}
                    />
                  </div>

                  <span>{exam.progress}%</span>
                </div>
              </div>

              <div className="exam-countdown">
                <strong>{exam.days}</strong>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-search">
            No matching exams found.
          </div>
        )}
      </div>
    </section>
  );
}

// Quick actions
function QuickActions({ setActiveMenu }) {
  const actions = [
    {
      title: "Take a Mock Test",
      description: "Practice your exam skills",
      icon: ClipboardList,
      target: "My Tests",
    },
    {
      title: "Study Materials",
      description: "Explore learning resources",
      icon: BookOpen,
      target: "Study Materials",
    },
    {
      title: "Ask AI Assistant",
      description: "Get help with your doubts",
      icon: Bot,
      target: "AI Assistant",
    },
    {
      title: "View Performance",
      description: "Check your progress",
      icon: ChartNoAxesCombined,
      target: "Performance",
    },
  ];

  return (
    <section className="dashboard-card quick-actions-card">
      <div className="section-heading">
        <div>
          <h2>Quick Actions</h2>
          <p>Continue your preparation</p>
        </div>
      </div>

      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              className="quick-action"
              key={action.title}
              onClick={() => setActiveMenu(action.target)}
            >
              <div className="quick-action-icon">
                <Icon size={22} />
              </div>

              <div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>

              <ArrowRight size={17} />
            </button>
          );
        })}
      </div>
    </section>
  );
}

// AI assistant card
function AIAssistant({ setActiveMenu }) {
  return (
    <section className="ai-assistant-card">
      <div className="ai-card-icon">
        <Bot size={28} />
      </div>

      <div className="ai-card-content">
        <span>EXAMSPHERE AI</span>

        <h2>Your personal AI learning assistant</h2>

        <p>
          Understand difficult topics, solve doubts
          and make your preparation smarter.
        </p>

        <button onClick={() => setActiveMenu("AI Assistant")}>
          Start Learning <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

// Other dashboard sections
function SectionPlaceholder({ activeMenu, setActiveMenu }) {
  if (activeMenu === "Explore Exams") {
    return <ExploreExams />;
  }

  if (activeMenu === "Exam Finder") {
    return <ExamFinder />;
  }
  if (activeMenu === "Syllabus & Roadmap") {
  return <PreparationRoadmap />;
}

  const sectionDetails = {
    "My Tests": {
      icon: ClipboardList,
      description:
        "Your mock tests, practice tests and test history will appear here.",
    },

    "Study Materials": {
      icon: BookOpen,
      description:
        "Access your notes, study resources and learning materials here.",
    },

    "AI Assistant": {
      icon: Bot,
      description:
        "Your AI-powered learning and doubt-solving workspace will appear here.",
    },

    Performance: {
      icon: ChartNoAxesCombined,
      description:
        "Track your scores, accuracy, speed and preparation progress here.",
    },

    Bookmarks: {
      icon: Bookmark,
      description:
        "Your saved exams, questions and learning resources will appear here.",
    },

    Settings: {
      icon: Settings,
      description:
        "Manage your account and student preferences here.",
    },

    Premium: {
      icon: Trophy,
      description:
        "Explore ExamSphere Premium features and subscription options.",
    },
  };

  const details = sectionDetails[activeMenu];

  if (!details) return null;

  const Icon = details.icon;

  return (
    <div className="dashboard-card section-placeholder">
      <div className="placeholder-icon">
        <Icon size={32} />
      </div>

      <h2>{activeMenu}</h2>

      <p>{details.description}</p>

      <span className="coming-soon-badge">
        <Clock size={14} /> Development in progress
      </span>

      <button
        className="placeholder-back"
        onClick={() => setActiveMenu("Dashboard")}
      >
        Back to Dashboard <ArrowRight size={16} />
      </button>
    </div>
  );
}

// Main student dashboard
// Today's Study Planner Summary
function TodayStudySummary({ setActiveMenu }) {
  const STORAGE_KEY = "examsphere-study-planner";

  const getToday = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const updateTasks = (event) => {
      if (event.detail) {
        setTasks(event.detail);
        return;
      }

      try {
        setTasks(
          JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        );
      } catch {
        setTasks([]);
      }
    };

    window.addEventListener(
      "study-planner-updated",
      updateTasks
    );

    window.addEventListener("storage", updateTasks);

    return () => {
      window.removeEventListener(
        "study-planner-updated",
        updateTasks
      );

      window.removeEventListener("storage", updateTasks);
    };
  }, []);

  const today = getToday();

  const todaysTasks = tasks.filter(
    (task) => task.date === today
  );

  const completedTasks = todaysTasks.filter(
    (task) => task.completed
  );

  const pendingTasks = todaysTasks.filter(
    (task) => !task.completed
  );

  const totalMinutes = todaysTasks.reduce(
    (total, task) => total + Number(task.duration || 0),
    0
  );

  const completedMinutes = completedTasks.reduce(
    (total, task) => total + Number(task.duration || 0),
    0
  );

  const progress = todaysTasks.length
    ? Math.round(
        (completedTasks.length / todaysTasks.length) * 100
      )
    : 0;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    if (hours && remaining) {
      return `${hours}h ${remaining}m`;
    }

    if (hours) return `${hours}h`;

    return `${remaining}m`;
  };

  return (
    <section className="dashboard-card today-study-card">
      <div className="section-heading">
        <div>
          <h2>Today's Study Plan</h2>
          <p>Your daily preparation summary</p>
        </div>

       <div className="today-study-actions">
  <button
    className="manage-study-button"
    onClick={() => setActiveMenu("Syllabus & Roadmap")}
  >
    Manage Study Plan <ArrowRight size={15} />
  </button>

  <div className="today-study-date">
    <CalendarDays size={17} />
    {new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })}
  </div>
</div>
      </div>

      <div className="today-study-stats">
        <div>
          <strong>{todaysTasks.length}</strong>
          <span>Total Tasks</span>
        </div>

        <div>
          <strong>{completedTasks.length}</strong>
          <span>Completed</span>
        </div>

        <div>
          <strong>{pendingTasks.length}</strong>
          <span>Pending</span>
        </div>

        <div>
          <strong>{formatTime(totalMinutes)}</strong>
          <span>Planned Time</span>
        </div>
      </div>

      <div className="today-study-progress">
        <div className="today-study-progress-heading">
          <strong>Daily Completion</strong>
          <strong>{progress}%</strong>
        </div>

        <div className="today-study-progress-track">
          <div
            style={{ width: `${progress}%` }}
          />
        </div>

        <p>
          {formatTime(completedMinutes)} study time completed
        </p>
      </div>

      <div className="today-study-task-list">
        {todaysTasks.length > 0 ? (
          todaysTasks.slice(0, 5).map((task) => (
            <div className="today-study-task" key={task.id}>
              {task.completed ? (
                <CheckCircle2 size={19} />
              ) : (
                <Clock size={19} />
              )}

              <div>
                <strong>{task.title}</strong>
                <span>{task.subject}</span>
              </div>

              <small>
                {task.completed ? "Completed" : "Pending"}
              </small>
            </div>
          ))
        ) : (
          <div className="today-study-empty">
            <Target size={25} />
            <p>No study targets planned for today.</p>
            <span>
              Add tasks in your Study Planner to see them here.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
function StudentDashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const showMessage = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // Hide dashboard search on pages that have their own search
  const showDashboardSearch =
    activeMenu !== "Explore Exams" &&
    activeMenu !== "Exam Finder";

  return (
    <div className="student-dashboard">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="dashboard-main">
        <DashboardHeader
          setMobileOpen={setMobileOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showMessage={showMessage}
          showSearch={showDashboardSearch}
        />

        <div className="dashboard-content">
          {activeMenu === "Dashboard" ? (
            <>
              <WelcomeBanner
                setActiveMenu={setActiveMenu}
              />

              <StatsSection />

<TodayStudySummary
  setActiveMenu={setActiveMenu}
/>

<div className="dashboard-grid">
                <LearningProgress />

                <UpcomingExams
                  searchQuery={searchQuery}
                  setActiveMenu={setActiveMenu}
                />
              </div>

              <QuickActions
                setActiveMenu={setActiveMenu}
              />

              <AIAssistant
                setActiveMenu={setActiveMenu}
              />
            </>
          ) : (
            <SectionPlaceholder
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          )}
        </div>
      </main>

      {message && (
        <div className="dashboard-toast">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;