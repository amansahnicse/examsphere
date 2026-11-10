import React, { useEffect, useRef, useState } from "react";

import {
  Search,
  UserRound,
  GraduationCap,
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  Info,
  AlertCircle,
} from "lucide-react";

import "./ExamFinder.css";

/* =========================================
   INITIAL FORM DATA
========================================= */

const initialForm = {
  dob: "",
  qualification: "",
  stream: "",
  passingYear: "",
  category: "",
  state: "",
  nationality: "Indian",
};

/* =========================================
   EXAM DATABASE
========================================= */

const exams = [
  {
    name: "UPSC Civil Services Examination",
    short: "UPSC CSE",
    qualification: "Graduation",
    description:
      "Civil services recruitment examination conducted by UPSC.",
    note: "Graduation, age and other conditions must be verified.",
  },
  {
    name: "SSC Combined Graduate Level",
    short: "SSC CGL",
    qualification: "Graduation",
    description:
      "Recruitment examination for various central government posts.",
    note: "Post-wise educational and age requirements apply.",
  },
  {
    name: "BPSC Combined Competitive Examination",
    short: "BPSC CCE",
    qualification: "Graduation",
    description:
      "Recruitment examination for various Bihar state government posts.",
    note: "Bihar-specific conditions and notification rules apply.",
  },
  {
    name: "RRB NTPC",
    short: "RRB NTPC",
    qualification: "12th",
    description:
      "Railway recruitment examination for undergraduate and graduate posts.",
    note: "Eligibility differs between undergraduate and graduate posts.",
  },
  {
    name: "IBPS Probationary Officer",
    short: "IBPS PO",
    qualification: "Graduation",
    description:
      "Banking recruitment examination for Probationary Officer posts.",
    note: "Age and educational conditions must be verified.",
  },
  {
    name: "National Defence Academy",
    short: "NDA",
    qualification: "12th",
    description:
      "Defence entrance examination for Army, Navy and Air Force wings.",
    note: "Age, educational stream and physical standards are important.",
  },
];

/* =========================================
   CALCULATE AGE
========================================= */

function calculateAge(dob) {
  if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  let age =
    today.getFullYear() - birthDate.getFullYear();

  const monthDifference =
    today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/* =========================================
   REUSABLE ICONS
========================================= */

function BookOpenIcon() {
  return <GraduationCap size={16} />;
}

function UsersIcon() {
  return <UserRound size={16} />;
}

/* =========================================
   EXAM FINDER COMPONENT
========================================= */

export default function ExamFinder() {
  const [form, setForm] = useState(initialForm);

  const [results, setResults] = useState(null);

  const [error, setError] = useState("");

  // Reference for automatic scrolling
  const resultsRef = useRef(null);

  /* =========================================
     AUTOMATIC SCROLL AFTER RESULTS
  ========================================= */

  useEffect(() => {
    if (!results) return;

    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [results]);

  /* =========================================
     UPDATE FORM FIELDS
  ========================================= */

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /* =========================================
     HANDLE FORM SUBMISSION
  ========================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.dob ||
      !form.qualification ||
      !form.category ||
      !form.state ||
      !form.nationality
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (new Date(form.dob) > new Date()) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    const age = calculateAge(form.dob);

    if (age < 0) {
      setError("Please enter a valid date of birth.");
      return;
    }

    const matchingExams = exams.filter((exam) => {
      if (exam.qualification === "Graduation") {
        return (
          form.qualification === "Graduation" ||
          form.qualification === "Post Graduation"
        );
      }

      if (exam.qualification === "12th") {
        return (
          form.qualification === "12th" ||
          form.qualification === "Graduation" ||
          form.qualification === "Post Graduation"
        );
      }

      return false;
    });

    setResults({
      age,
      exams: matchingExams,
    });
  };

  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {
    setForm(initialForm);
    setResults(null);
    setError("");
  };

  /* =========================================
     PAGE UI
  ========================================= */

  return (
    <div className="exam-finder-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="finder-hero">
        <div>
          <span className="finder-eyebrow">
            <ShieldCheck size={16} />
            SMART EXAM DISCOVERY
          </span>

          <h1>
            Find exams that
            <br />
            <span>match your profile.</span>
          </h1>

          <p>
            Enter your educational and personal details to discover
            government examinations relevant to your profile.
          </p>
        </div>

        <div className="finder-hero-icon">
          <GraduationCap size={75} strokeWidth={1.2} />
        </div>
      </section>

      {/* =====================================
          MAIN FORM
      ===================================== */}

      <section className="finder-content">

        <div className="finder-form-card">

          <div className="finder-card-heading">
            <div className="finder-heading-icon">
              <UserRound size={22} />
            </div>

            <div>
              <h2>Your profile</h2>
              <p>
                Provide your details to discover relevant exams.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="finder-form-grid">

              {/* DATE OF BIRTH */}

              <div className="finder-field">
                <label>
                  <CalendarDays size={16} />
                  Date of Birth *
                </label>

                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) =>
                    updateField("dob", e.target.value)
                  }
                  required
                />
              </div>

              {/* QUALIFICATION */}

              <div className="finder-field">
                <label>
                  <GraduationCap size={16} />
                  Highest Qualification *
                </label>

                <select
                  value={form.qualification}
                  onChange={(e) =>
                    updateField("qualification", e.target.value)
                  }
                  required
                >
                  <option value="">Select qualification</option>
                  <option value="10th">10th Pass</option>
                  <option value="12th">12th Pass</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Post Graduation">
                    Post Graduation
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* STREAM */}

              <div className="finder-field">
                <label>
                  <BookOpenIcon />
                  Stream
                </label>

                <select
                  value={form.stream}
                  onChange={(e) =>
                    updateField("stream", e.target.value)
                  }
                >
                  <option value="">Select stream</option>
                  <option value="Arts">Arts / Humanities</option>
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* PASSING YEAR */}

              <div className="finder-field">
                <label>
                  <CalendarDays size={16} />
                  Passing Year
                </label>

                <input
                  type="number"
                  placeholder="e.g. 2026"
                  min="1980"
                  max="2035"
                  value={form.passingYear}
                  onChange={(e) =>
                    updateField("passingYear", e.target.value)
                  }
                />
              </div>

              {/* CATEGORY */}

              <div className="finder-field">
                <label>
                  <UsersIcon />
                  Category *
                </label>

                <select
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value)
                  }
                  required
                >
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              {/* STATE */}

              <div className="finder-field">
                <label>
                  <MapPin size={16} />
                  State / Domicile *
                </label>

                <select
                  value={form.state}
                  onChange={(e) =>
                    updateField("state", e.target.value)
                  }
                  required
                >
                  <option value="">Select state</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Uttar Pradesh">
                    Uttar Pradesh
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Madhya Pradesh">
                    Madhya Pradesh
                  </option>
                  <option value="Other">Other State</option>
                </select>
              </div>

              {/* NATIONALITY */}

              <div className="finder-field">
                <label>
                  <ShieldCheck size={16} />
                  Nationality *
                </label>

                <select
                  value={form.nationality}
                  onChange={(e) =>
                    updateField("nationality", e.target.value)
                  }
                  required
                >
                  <option value="Indian">Indian</option>
                  <option value="Other">Other</option>
                </select>
              </div>

            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="finder-error">
                <AlertCircle size={17} />
                {error}
              </div>
            )}

            {/* FORM ACTIONS */}

            <div className="finder-form-actions">

              <button
                type="button"
                className="finder-reset"
                onClick={resetForm}
              >
                <RotateCcw size={16} />
                Reset
              </button>

              <button
                type="submit"
                className="finder-submit"
              >
                Find Relevant Exams
                <ArrowRight size={17} />
              </button>

            </div>

          </form>
        </div>

        {/* =====================================
            INFORMATION PANEL
        ===================================== */}

        <aside className="finder-info-card">

          <div className="finder-info-icon">
            <Info size={23} />
          </div>

          <h3>How does it work?</h3>

          <div className="finder-info-step">
            <span>01</span>

            <div>
              <strong>Enter your details</strong>
              <p>
                Share your age, education and category.
              </p>
            </div>
          </div>

          <div className="finder-info-step">
            <span>02</span>

            <div>
              <strong>Discover relevant exams</strong>
              <p>
                Explore examinations matching your qualification level.
              </p>
            </div>
          </div>

          <div className="finder-info-step">
            <span>03</span>

            <div>
              <strong>Verify eligibility</strong>
              <p>
                Check official notifications for final eligibility.
              </p>
            </div>
          </div>

          <div className="finder-disclaimer">
            This is an initial exam-discovery tool, not an official
            eligibility certificate. Final eligibility depends on
            examination-specific notification rules.
          </div>

        </aside>

      </section>

      {/* =====================================
          RESULTS SECTION
      ===================================== */}

      {results && (
        <section
          className="finder-results"
          ref={resultsRef}
        >

          {/* RESULTS HEADING */}

          <div className="finder-results-heading">

            <div>
              <span className="finder-overline">
                YOUR RESULTS
              </span>

              <h2>Relevant examinations</h2>

              <p>
                Profile age: {results.age} years ·{" "}
                {results.exams.length} possible matches
              </p>
            </div>

            <button
              onClick={() => setResults(null)}
            >
              Edit profile
            </button>

          </div>

          {/* MATCHING EXAMS */}

          {results.exams.length > 0 ? (

            <div className="finder-result-grid">

              {results.exams.map((exam) => (
                <article
                  className="finder-result-card"
                  key={exam.short}
                >

                  <div className="finder-result-top">

                    <div className="finder-result-icon">
                      <BriefcaseBusiness size={22} />
                    </div>

                    <span className="verification-badge">
                      <AlertCircle size={13} />
                      Verify eligibility
                    </span>

                  </div>

                  <h3>{exam.name}</h3>

                  <p>{exam.description}</p>

                  <div className="finder-result-qualification">
                    <GraduationCap size={16} />
                    Relevant qualification: {exam.qualification}
                  </div>

                  <div className="finder-result-note">
                    {exam.note}
                  </div>

                </article>
              ))}

            </div>

          ) : (

            <div className="finder-no-results">

              <Search size={30} />

              <h3>
                No matching exams in this sample
              </h3>

              <p>
                Try updating your qualification or explore all exams
                separately.
              </p>

            </div>

          )}

        </section>
      )}

    </div>
  );
}

