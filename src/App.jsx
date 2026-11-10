import TeacherDashboard from "./TeacherDashboard";
import HomepageSections from "./HomepageSections";
import StudentDashboard from "./StudentDashboard";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db, googleProvider } from "./firebase";

import {
  Link,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  Search,
  SearchCheck,
  Menu,
  X,
  GraduationCap,
  BookOpen,
  BookMarked,
  BrainCircuit,
  ChartNoAxesCombined,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Users,
  Target,
  Landmark,
  TrainFront,
  BriefcaseBusiness,
  Scale,
  Globe,
  CalendarDays,
  ClipboardCheck,
  Bot,
  ListChecks,
  LockKeyhole,
  Mail,
  UserRound,
  Eye,
  EyeOff,
  CheckCircle2,
  Smartphone,
} from "lucide-react";

import "./App.css";

/* =========================================
   EXAM DATA
========================================= */

const exams = [
  {
    name: "UPSC Civil Services",
    category: "Civil Services",
    organisation: "Union Public Service Commission",
    level: "National",
    icon: Landmark,
    description:
      "Prepare for India's prestigious civil services examination.",
    color: "blue",
    tags: ["IAS", "IPS", "IFS"],
  },
  {
    name: "BPSC CCE",
    category: "State PSC",
    organisation: "Bihar Public Service Commission",
    level: "State",
    icon: Scale,
    description:
      "Explore Bihar state civil services and administrative roles.",
    color: "violet",
    tags: ["Bihar", "State Services"],
  },
  {
    name: "SSC CGL",
    category: "Staff Selection",
    organisation: "Staff Selection Commission",
    level: "National",
    icon: BriefcaseBusiness,
    description:
      "Explore graduate-level central government opportunities.",
    color: "orange",
    tags: ["Graduate", "Central Govt."],
  },
  {
    name: "IBPS PO",
    category: "Banking",
    organisation: "Institute of Banking Personnel Selection",
    level: "National",
    icon: Landmark,
    description:
      "Start your journey towards a banking officer career.",
    color: "green",
    tags: ["Banking", "Officer"],
  },
  {
    name: "RRB NTPC",
    category: "Railway",
    organisation: "Railway Recruitment Boards",
    level: "National",
    icon: TrainFront,
    description:
      "Explore non-technical railway recruitment opportunities.",
    color: "cyan",
    tags: ["Railway", "Recruitment"],
  },
  {
    name: "NDA",
    category: "Defence",
    organisation: "Union Public Service Commission",
    level: "National",
    icon: ShieldCheck,
    description:
      "Discover the pathway to a career in the armed forces.",
    color: "rose",
    tags: ["Defence", "Officer"],
  },
];

const categories = [
  "All Exams",
  "Civil Services",
  "State PSC",
  "Staff Selection",
  "Banking",
  "Railway",
  "Defence",
];

/* =========================================
   NAVBAR
========================================= */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore Exams", to: "/exams" },
    { label: "For Students", to: "/for-students" },
    { label: "For Teachers", to: "/teachers" },
  ];

  return (
    <header className="navbar">
      <Link
        to="/"
        className="brand"
        onClick={() => setMenuOpen(false)}
      >
        <span className="brand-icon">
          <GraduationCap size={23} />
        </span>

        <span>
          Exam<span className="brand-accent">Sphere</span>
        </span>
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={
              location.pathname === link.to
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        <div className="mobile-actions">
          <Link
            to="/login"
            className="login-link"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>

          <Link
            to="/signup"
            className="button button-primary"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </Link>
        </div>
      </nav>

      <div className="nav-actions">
        <Link to="/login" className="login-link">
          Log in
        </Link>

        <Link
          to="/signup"
          className="button button-primary nav-cta"
        >
          Get Started <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}

/* =========================================
   EXAM CARD
========================================= */

function ExamCard({ exam }) {
  const Icon = exam.icon;

  return (
    <article className="exam-card">
      <div className="exam-card-top">
        <div className={`exam-icon ${exam.color}`}>
          <Icon size={23} />
        </div>

        <span className="level-tag">{exam.level}</span>
      </div>

      <p className="exam-category">{exam.category}</p>

      <h3>{exam.name}</h3>

      <p className="exam-org">{exam.organisation}</p>

      <p className="exam-description">
        {exam.description}
      </p>

      <div className="exam-tags">
        {exam.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <Link
        to={`/exams/${encodeURIComponent(exam.name)}`}
        className="exam-link"
      >
        Explore exam <ArrowRight size={16} />
      </Link>
    </article>
  );
}

/* =========================================
   EXAM EXPLORER
========================================= */

function ExamExplorer({ compact = false }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Exams");

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      const matchesCategory =
        category === "All Exams" ||
        exam.category === category;

      const term = search.trim().toLowerCase();

      const matchesSearch =
        exam.name.toLowerCase().includes(term) ||
        exam.category.toLowerCase().includes(term) ||
        exam.organisation.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  function clearFilters() {
    setSearch("");
    setCategory("All Exams");
  }

  return (
    <section className="section" id="exams">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EXAM DISCOVERY</span>

          <h2>
            Find the exam that moves you forward.
          </h2>

          <p>
            Explore opportunities and understand your next step.
          </p>
        </div>

        {compact && (
          <Link to="/exams" className="text-link">
            View all exams <ArrowRight size={16} />
          </Link>
        )}
      </div>

      <div className="exam-search">
        <Search size={19} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search UPSC, SSC, Banking, Railway..."
          aria-label="Search examinations"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <div className="category-list">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={
              category === item
                ? "category-chip selected"
                : "category-chip"
            }
          >
            {item}
          </button>
        ))}
      </div>

      <div className="exam-grid">
        {filteredExams.length > 0 ? (
          filteredExams
            .slice(0, compact ? 3 : 6)
            .map((exam) => (
              <ExamCard key={exam.name} exam={exam} />
            ))
        ) : (
          <div className="empty-state">
            <Search size={30} />

            <h3>No exams found</h3>

            <p>
              Try another exam name or category.
            </p>

            <button
              className="text-link"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================
   HERO DASHBOARD FEATURES
========================================= */

const dashboardFeatures = [
  {
    icon: Search,
    title: "Explore Exams",
    description: "Discover opportunities",
    link: "/exams",
    color: "blue",
    public: true,
  },
  {
    icon: SearchCheck,
    title: "Exam Finder",
    description: "Check eligibility",
    link: "/students/exam-finder",
    color: "green",
  },
  {
    icon: CalendarDays,
    title: "Study Planner",
    description: "Plan daily targets",
    link: "/students/planner",
    color: "violet",
  },
  {
    icon: Bot,
    title: "AI Learning",
    description: "Learn with AI",
    link: "/students/ai-learning",
    color: "orange",
  },
  {
    icon: BookMarked,
    title: "Study Materials",
    description: "Notes and resources",
    link: "/students/study-materials",
    color: "cyan",
  },
  {
    icon: ClipboardCheck,
    title: "PYQ & Mock Tests",
    description: "Practice questions",
    link: "/students/mock-tests",
    color: "rose",
  },
];

/* =========================================
   HOMEPAGE
========================================= */

function Home() {
  return (
    <>
      <main>
        <section className="hero hero-redesign">
          <div className="hero-content">
            <div className="announcement">
              <Sparkles size={15} />
              India's Unified Education & Exam Platform
              <ChevronRight size={15} />
            </div>

            <h1>
              Your Exams.
              <br />
              Your Preparation.
              <br />
              <span>Your Success.</span>
            </h1>

            <p className="hero-description">
              Discover government exams, check your eligibility,
              access study materials, practice previous-year
              questions, take mock tests and track your preparation
              — all in one platform.
            </p>

            <div className="hero-buttons">
              <Link
                to="/exams"
                className="button button-primary button-large"
              >
                Explore Exams
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login?next=/students/exam-finder"
                className="button button-outline button-large"
              >
                Find Eligible Exams
                <Search size={17} />
              </Link>
            </div>

            <div className="hero-benefits">
              <span>
                <ShieldCheck size={16} />
                Exam Discovery
              </span>

              <span>
                <BrainCircuit size={16} />
                Smart Learning
              </span>

              <span>
                <ChartNoAxesCombined size={16} />
                Progress Tracking
              </span>
            </div>
          </div>

          <div className="hero-visual hero-visual-new">
            <div className="visual-glow"></div>

            <div className="dashboard-preview dashboard-preview-new">
              <div className="preview-top">
                <div>
                  <span className="preview-label">
                    EXAMSPHERE PLATFORM PREVIEW
                  </span>

                  <h3>Your learning workspace</h3>

                  <p className="preview-subtitle">
                    Everything for your exam preparation.
                  </p>
                </div>

                <div className="preview-avatar">
                  <GraduationCap size={21} />
                </div>
              </div>

              <div className="preview-welcome">
                <div>
                  <span>YOUR PREPARATION JOURNEY</span>

                  <strong>
                    One platform. Multiple possibilities.
                  </strong>
                </div>

                <Sparkles size={23} />
              </div>

              <div className="preview-feature-heading">
                <strong>Explore your tools</strong>
                <span>Platform preview</span>
              </div>

              <div className="preview-feature-grid">
                {dashboardFeatures.map((feature) => {
                  const Icon = feature.icon;

                  const destination = feature.public
                    ? feature.link
                    : `/login?next=${encodeURIComponent(feature.link)}`;

                  return (
                    <Link
                      to={destination}
                      className="preview-feature"
                      key={feature.title}
                    >
                      <div
                        className={`preview-feature-icon ${feature.color}`}
                      >
                        <Icon size={19} />
                      </div>

                      <div>
                        <strong>{feature.title}</strong>
                        <span>{feature.description}</span>
                      </div>

                      <ArrowUpRight
                        size={15}
                        className="preview-feature-arrow"
                      />
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/login?next=/students"
                className="preview-bottom"
              >
                <div className="preview-bottom-icon">
                  <ListChecks size={18} />
                </div>

                <div>
                  <strong>
                    Performance & Improvement
                  </strong>

                  <span>
                    Understand your progress and improve your preparation.
                  </span>
                </div>

                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="floating-note floating-note-top">
              <span>
                <Sparkles size={17} />
              </span>
              AI-powered learning
            </div>

            <div className="floating-note floating-note-bottom">
              <span>
                <Target size={17} />
              </span>
              Smarter exam preparation
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div>
            <strong>Explore Exams</strong>
            <span>Discover opportunities</span>
          </div>

          <div>
            <strong>Exam Finder</strong>
            <span>Understand your eligibility</span>
          </div>

          <div>
            <strong>Smart Learning</strong>
            <span>Study with better tools</span>
          </div>

          <div>
            <strong>Student + Teacher</strong>
            <span>One learning ecosystem</span>
          </div>
        </section>

        <ExamExplorer compact />

        <HomepageSections />

<section className="cta-section">
  <div>
    <span className="eyebrow">
      YOUR NEXT CHAPTER STARTS HERE
    </span>

    <h2>Make your preparation count.</h2>

    <p>
      Find your exam. Build your plan. Take the next step.
    </p>
  </div>

  <Link
    to="/signup"
    className="button button-light button-large"
  >
    Get Started <ArrowRight size={18} />
  </Link>
</section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================
   FEATURE CARD
========================================= */

function Feature({ icon, title, description }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ArrowRight className="feature-arrow" size={17} />
    </article>
  );
}

/* =========================================
   EXAMS PAGE
========================================= */

function ExamsPage() {
  return (
    <>
      <div className="page-banner">
        <span className="eyebrow">
          EXPLORE OPPORTUNITIES
        </span>

        <h1>Explore exams across India.</h1>

        <p>
          Search examinations and discover your next opportunity.
        </p>
      </div>

      <ExamExplorer />

      <Footer />
    </>
  );
}

/* =========================================
   INFORMATION PAGE
========================================= */

function InformationPage({
  title,
  description,
  icon: Icon,
}) {
  return (
    <>
      <div className="information-page">
        <div className="information-icon">
          <Icon size={32} />
        </div>

        <span className="eyebrow">EXAMSPHERE</span>

        <h1>{title}</h1>

        <p>{description}</p>

        <Link
          to="/exams"
          className="button button-primary"
        >
          Explore exams <ArrowRight size={17} />
        </Link>
      </div>

      <Footer />
    </>
  );
}

/* =========================================
   PUBLIC STUDENT PAGE
========================================= */

function ForStudentsPage() {
  return (
    <>
      <div className="information-page">
        <div className="information-icon">
          <GraduationCap size={32} />
        </div>

        <span className="eyebrow">FOR STUDENTS</span>

        <h1>Your preparation journey starts here.</h1>

        <p>
          Explore competitive examinations, understand eligibility,
          discover learning resources and find the right preparation
          path. You can explore the platform before creating an account.
        </p>

        <Link
          to="/exams"
          className="button button-primary"
        >
          Explore Exams <ArrowRight size={17} />
        </Link>
      </div>

      <Footer />
    </>
  );
}

/* =========================================
   PUBLIC TEACHER PAGE
========================================= */

function TeachersPage() {
  return (
    <>
      <div className="information-page">
        <div className="information-icon">
          <Users size={32} />
        </div>

        <span className="eyebrow">FOR TEACHERS</span>

        <h1>A better workspace for educators.</h1>

        <p>
          Discover how ExamSphere aims to support teachers with
          learning resources, tests, assignments, mentorship and
          student performance tools.
        </p>

        <Link
          to="/signup?role=teacher"
          className="button button-primary"
        >
          Join as a Teacher <ArrowRight size={17} />
        </Link>
      </div>

      <Footer />
    </>
  );
}

/* =========================================
   EXAM DETAIL PAGE
========================================= */

function ExamDetail() {
  const location = useLocation();

  const examName = decodeURIComponent(
    location.pathname.split("/").pop()
  );

  const exam = exams.find(
    (item) => item.name === examName
  );

  if (!exam) {
    return (
      <InformationPage
        title="Exam not found"
        description="This exam is not available in our sample directory yet."
        icon={Search}
      />
    );
  }

  const Icon = exam.icon;

  return (
    <>
      <div className="detail-page">
        <Link to="/exams" className="text-link">
          ← Back to exams
        </Link>

        <div className={`exam-icon ${exam.color}`}>
          <Icon size={27} />
        </div>

        <span className="eyebrow">{exam.category}</span>

        <h1>{exam.name}</h1>

        <p>{exam.description}</p>

        <div className="detail-panel">
          <strong>Conducting organisation</strong>
          <p>{exam.organisation}</p>

          <strong>Exam coverage</strong>
          <p>{exam.level}</p>

          <strong>Information status</strong>
          <p>
            Sample listing — official details have not yet
            been verified.
          </p>
        </div>

        <p className="detail-notice">
          Detailed eligibility, syllabus, dates and official
          notifications will be added after source verification.
        </p>

        <div className="hero-buttons">
          <Link
            to="/exams"
            className="button button-outline"
          >
            Explore More Exams
          </Link>

          <Link
            to={`/login?next=${encodeURIComponent(
              `/students?exam=${encodeURIComponent(exam.name)}`
            )}`}
            className="button button-primary"
          >
            Start Preparation <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

/* =========================================
   GOOGLE ICON
========================================= */

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 37.96 46.98 31.84 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

/* =========================================
   AUTHENTICATION PAGE
========================================= */

function AuthPage({ mode = "login" }) {
  const isSignup = mode === "signup";
  const isForgot = mode === "forgot";

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const nextPath = params.get("next") || "/students";
  const navigate = useNavigate();
  const selectedRole = params.get("role") || "student";

  const [role, setRole] = useState(selectedRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("info");

  function showMessage(message, type = "info") {
    setNotice(message);
    setNoticeType(type);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setNotice("");

    if (isForgot) {
      showMessage(
        "Authentication is not connected yet. Please try again later.",
  "info"
      );
      return;
    }

    if (isSignup && password !== confirmPassword) {
      showMessage(
        "Password aur Confirm Password match nahi kar rahe.",
        "error"
      );
      return;
    }

    showMessage(
      "Authentication backend abhi connect nahi hua hai. Secure login aur account creation next development step mein implement hoga.",
      "info"
    );
  }

  function handleGoogleLogin() {
    showMessage(
      "Google Sign-in interface ready hai. Actual Google authentication ke liye OAuth configuration aur backend integration required hai.",
      "info"
    );
  }

  const pageTitle = isForgot
    ? "Reset your password"
    : isSignup
      ? "Create your account"
      : "Welcome back";

  const pageDescription = isForgot
    ? "Enter your registered email address and we'll help you reset your password."
    : isSignup
      ? "Create your ExamSphere account and start your preparation journey."
      : "Sign in to continue your learning and exam preparation journey.";

  return (
    <main className="auth-page">
      <div className="auth-layout">

        {/* LEFT BRANDING PANEL */}

        <section className="auth-brand-panel">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">
              <GraduationCap size={27} />
            </span>

            <span>
              Exam<span>Sphere</span>
            </span>
          </Link>

          <div className="auth-brand-content">
            <span className="auth-brand-eyebrow">
              INDIA'S UNIFIED EDUCATION PLATFORM
            </span>

            <h2>
              Your ambition deserves a smarter preparation system.
            </h2>

            <p>
              Discover opportunities, prepare with confidence
              and move closer to your goals with ExamSphere.
            </p>

            <div className="auth-benefit-list">
              <div>
                <span><CheckCircle2 size={18} /></span>
                Explore government examinations
              </div>

              <div>
                <span><CheckCircle2 size={18} /></span>
                Build a structured study plan
              </div>

              <div>
                <span><CheckCircle2 size={18} /></span>
                Learn, practise and track progress
              </div>
            </div>
          </div>

          <div className="auth-brand-bottom">
            <ShieldCheck size={17} />
            One platform. Multiple possibilities.
          </div>

          <div className="auth-decoration auth-decoration-one"></div>
          <div className="auth-decoration auth-decoration-two"></div>
        </section>

        {/* RIGHT FORM PANEL */}

        <section className="auth-form-panel">
          <div className="auth-form-container">

            <div className="auth-mobile-brand">
              <Link to="/" className="auth-brand">
                <span className="auth-brand-icon">
                  <GraduationCap size={24} />
                </span>

                <span>
                  Exam<span>Sphere</span>
                </span>
              </Link>
            </div>

            <div className="auth-heading">
              <span className="auth-heading-label">
                {isForgot
                  ? "ACCOUNT RECOVERY"
                  : isSignup
                    ? "GET STARTED"
                    : "WELCOME TO EXAMSPHERE"}
              </span>

              <h1>{pageTitle}</h1>

              <p>{pageDescription}</p>
            </div>

            {/* GOOGLE SIGN IN */}

            {!isForgot && (
              <>
                <button
                  type="button"
                  className="auth-google-button"
                  onClick={handleGoogleLogin}
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </button>

                <div className="auth-divider">
                  <span></span>
                  <p>OR CONTINUE WITH EMAIL</p>
                  <span></span>
                </div>
              </>
            )}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* ACCOUNT TYPE */}

              {isSignup && (
                <div className="auth-field">
                  <label>Choose your account type</label>

                  <div className="auth-role-options">
                    <button
                      type="button"
                      className={role === "student" ? "active" : ""}
                      onClick={() => setRole("student")}
                      aria-pressed={role === "student"}
                    >
                      <GraduationCap size={19} />
                      <span>Student</span>
                    </button>

                    <button
                      type="button"
                      className={role === "teacher" ? "active" : ""}
                      onClick={() => setRole("teacher")}
                      aria-pressed={role === "teacher"}
                    >
                      <Users size={19} />
                      <span>Teacher</span>
                    </button>
                  </div>
                </div>
              )}

              {/* FULL NAME */}

              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="fullName">
                    Full name
                  </label>

                  <div className="auth-input-wrapper">
                    <UserRound size={18} />

                    <input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
                      autoComplete="name"
                      required
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}

              <div className="auth-field">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* MOBILE NUMBER */}

              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="mobile">
                    Mobile number
                  </label>

                  <div className="auth-input-wrapper">
                    <Smartphone size={18} />

                    <input
                      id="mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(event) =>
                        setMobile(event.target.value)
                      }
                      autoComplete="tel"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              )}

              {/* PASSWORD */}

              {!isForgot && (
                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="password">
                      Password
                    </label>

                    {!isSignup && (
                      <Link
                        to={`/forgot-password?next=${encodeURIComponent(nextPath)}`}
                        className="auth-forgot-link"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>

                  <div className="auth-input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={
                        isSignup
                          ? "Create a strong password"
                          : "Enter your password"
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      autoComplete={
                        isSignup
                          ? "new-password"
                          : "current-password"
                      }
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="auth-eye-button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword
                        ? <EyeOff size={18} />
                        : <Eye size={18} />}
                    </button>
                  </div>

                  {isSignup && (
                    <small className="auth-field-help">
                      Use at least 8 characters.
                    </small>
                  )}
                </div>
              )}

              {/* CONFIRM PASSWORD */}

              {isSignup && (
                <div className="auth-field">
                  <label htmlFor="confirmPassword">
                    Confirm password
                  </label>

                  <div className="auth-input-wrapper">
                    <LockKeyhole size={18} />

                    <input
                      id="confirmPassword"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="auth-eye-button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword
                        ? <EyeOff size={18} />
                        : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {/* REMEMBER ME */}

              {!isSignup && !isForgot && (
                <div className="auth-remember-row">
                  <label>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) =>
                        setRememberMe(event.target.checked)
                      }
                    />

                    <span>Remember me</span>
                  </label>
                </div>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-submit"
              >
                {isForgot
                  ? "Send reset instructions"
                  : isSignup
                    ? "Create account"
                    : "Sign in"}

                <ArrowRight size={18} />
              </button>
            </form>

            {/* NOTIFICATION */}

            {notice && (
              <div
                className={`auth-notice ${noticeType}`}
                role="status"
              >
                {notice}
              </div>
            )}

            {/* BOTTOM NAVIGATION */}

            <div className="auth-switch">
              {isForgot ? (
                <>
                  Remember your password?

                  <Link
                    to={`/login?next=${encodeURIComponent(nextPath)}`}
                  >
                    Back to login
                  </Link>
                </>
              ) : isSignup ? (
                <>
                  Already have an account?

                  <Link
                    to={`/login?next=${encodeURIComponent(nextPath)}`}
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don't have an account?

                  <Link
                    to={`/signup?next=${encodeURIComponent(nextPath)}`}
                  >
                    Create an account
                  </Link>
                </>
              )}
            </div>

            <Link to="/" className="auth-back-home">
              <ArrowLeft size={15} />
              Back to homepage
            </Link>

            <div className="auth-legal">
              By continuing, you agree to our{" "}
              <a href="#terms">Terms of Service</a> and{" "}
              <a href="#privacy">Privacy Policy</a>.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================
   PROTECTED DASHBOARD ROUTE
========================================= */

function ProtectedDashboard() {
  return <StudentDashboard />;
}

/* =========================================
   FOOTER
========================================= */

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="brand">
        <span className="brand-icon">
          <GraduationCap size={21} />
        </span>

        <span>
          Exam<span className="brand-accent">Sphere</span>
        </span>
      </Link>

      <p>Discover. Prepare. Track. Achieve.</p>

      <span>
        © {new Date().getFullYear()} ExamSphere.
        All rights reserved.
      </span>

      <p className="footer-disclaimer">
  Disclaimer: Please verify all information provided on ExamSphere
  with the respective official website before relying on it.
</p>
    </footer>
  );
}

/* =========================================
   APPLICATION LAYOUT
========================================= */

function AppLayout() {
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/students") ||
    location.pathname.startsWith("/teachers/dashboard");

  const isAuthRoute = [
    "/login",
    "/signup",
    "/forgot-password",
  ].includes(location.pathname);

  return (
    <div className="app-shell">
      {!isDashboardRoute && !isAuthRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/exams" element={<ExamsPage />} />

        <Route
          path="/exams/:examName"
          element={<ExamDetail />}
        />

        <Route
          path="/for-students"
          element={<ForStudentsPage />}
        />

        {/* Public Teacher Information Page */}
        <Route
          path="/teachers"
          element={<TeachersPage />}
        />

        {/* Teacher Dashboard */}
        <Route
          path="/teachers/dashboard/*"
          element={<TeacherDashboard />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<AuthPage mode="login" />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<AuthPage mode="signup" />}
        />

        {/* Forgot Password Page */}
        <Route
          path="/forgot-password"
          element={<AuthPage mode="forgot" />}
        />

        {/* Student Dashboard */}
        <Route
          path="/students/*"
          element={<ProtectedDashboard />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <InformationPage
              title="Page not found"
              description="The page you're looking for does not exist."
              icon={Search}
            />
          }
        />
      </Routes>
    </div>
  );
}

/* =========================================
   APP ROOT
========================================= */

export default function App() {
  return <AppLayout />;
}