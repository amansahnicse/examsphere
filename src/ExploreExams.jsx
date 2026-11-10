
import { useEffect, useMemo, useState, useRef } from "react";

import {
  Search,
  ArrowRight,
  Filter,
  X,
  ChevronRight,
  FileText,
  CalendarDays,
  ExternalLink,
  CircleCheck,
  Clock,
  GraduationCap,
  IndianRupee,
  MapPin,
  Building2,
} from "lucide-react";

import {
  examData,
  examCategories,
} from "./data/exams";

import "./ExploreExams.css";

/* =========================================
   EXAM CARD
========================================= */

function ExamCard({ exam, onView }) {
  const Icon = exam.icon;

  return (
    <article className="exam-card">
      <div className="exam-card-top">
        <div className={`exam-icon ${exam.color}`}>
          <Icon size={23} />
        </div>

        <span className="level-tag">
          {exam.level}
        </span>
      </div>

      <p className="exam-category">
        {exam.category}
      </p>

      <h3>{exam.name}</h3>

      <p className="exam-org">
        {exam.organisation}
      </p>

      <p className="exam-description">
        {exam.description}
      </p>

      <div className="exam-tags">
        {exam.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="exam-card-information">
        <span>
          <GraduationCap size={15} />
          {exam.qualification}
        </span>

        <span>
          <MapPin size={15} />
          {exam.region}
        </span>
      </div>

      <button
        className="exam-link"
        onClick={() => onView(exam)}
      >
        View Details <ArrowRight size={16} />
      </button>
    </article>
  );
}

/* =========================================
   EXAM DETAILS MODAL
========================================= */

function ExamDetails({ exam, onClose }) {
  const Icon = exam.icon;

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <div
      className="exam-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="exam-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-modal-title"
      >
        <div className="exam-modal-header">
          <div className={`exam-icon ${exam.color}`}>
            <Icon size={25} />
          </div>

          <button
            className="exam-modal-close"
            onClick={onClose}
            aria-label="Close exam details"
          >
            <X size={21} />
          </button>
        </div>

        <span className="exam-category">
          {exam.category}
        </span>

        <h2 id="exam-modal-title">
          {exam.name}
        </h2>

        <p className="exam-modal-description">
          {exam.description}
        </p>

        <div className="exam-modal-section">
          <h3>Exam Overview</h3>

          <div className="exam-detail-row">
            <Building2 size={18} />
            <div>
              <span>Conducting Organisation</span>
              <strong>{exam.organisation}</strong>
            </div>
          </div>

          <div className="exam-detail-row">
            <GraduationCap size={18} />
            <div>
              <span>Qualification</span>
              <strong>{exam.qualification}</strong>
            </div>
          </div>

          <div className="exam-detail-row">
            <Clock size={18} />
            <div>
              <span>Age Information</span>
              <strong>{exam.age}</strong>
            </div>
          </div>

          <div className="exam-detail-row">
            <IndianRupee size={18} />
            <div>
              <span>Salary Information</span>
              <strong>{exam.salary}</strong>
            </div>
          </div>

          <div className="exam-detail-row">
            <MapPin size={18} />
            <div>
              <span>Exam Coverage</span>
              <strong>{exam.region}</strong>
            </div>
          </div>
        </div>

        <div className="exam-modal-section">
          <h3>Eligibility Information</h3>

          <div className="eligibility-notice">
            <Clock size={18} />

            <div>
              <strong>
                Official verification required
              </strong>

              <p>
                {exam.eligibilityRules.message}
              </p>
            </div>
          </div>
        </div>

        <div className="exam-modal-section">
          <h3>Important Information</h3>

          <div className="exam-detail-row">
            <FileText size={18} />

            <div>
              <span>Exam ID</span>
              <strong>{exam.id}</strong>
            </div>
          </div>

          <div className="exam-detail-row">
            <CalendarDays size={18} />

            <div>
              <span>Information Status</span>
              <strong>Sample listing</strong>
            </div>
          </div>
        </div>

        <div className="exam-modal-notice">
          <CircleCheck size={17} />

          <p>
            Detailed syllabus, selection process,
            official dates and notification links
            will be added after verification.
          </p>
        </div>

        <button
          className="exam-modal-action"
          onClick={onClose}
        >
          Close Details <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
}

/* =========================================
   EXPLORE EXAMS
========================================= */

export default function ExploreExams() {
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Exams");

  const [selectedExam, setSelectedExam] =
    useState(null);

  const [showFilters, setShowFilters] =
    useState(false);

  // Reference for automatic scrolling
  const resultsRef = useRef(null);

  const filteredExams = useMemo(() => {
    const term = search.trim().toLowerCase();

    return examData.filter((exam) => {
      const matchesCategory =
        selectedCategory === "All Exams" ||
        exam.category === selectedCategory;

      const searchableText = [
        exam.name,
        exam.short,
        exam.category,
        exam.organisation,
        exam.description,
        ...exam.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        searchableText.includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  // AUTOMATIC SMOOTH SCROLL ON SEARCH
  useEffect(() => {
    if (!search.trim()) return;

    const timer = setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 350);

    return () => clearTimeout(timer);
  }, [search, filteredExams.length]);

  function clearFilters() {
    setSearch("");
    setSelectedCategory("All Exams");
  }

  return (
    <section className="explore-exams-page">

      {/* PAGE HEADER */}

      <div className="explore-hero">
        <div>
          <span className="eyebrow">
            EXAM DISCOVERY
          </span>

          <h1>
            Explore Exams Across India
          </h1>

          <p>
            Discover government examinations,
            eligibility information and career opportunities
            from one platform.
          </p>
        </div>

        <div className="explore-hero-icon">
          <GraduationCap size={65} />
        </div>
      </div>

      {/* SEARCH */}

      <div className="exam-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Search UPSC, SSC, Banking, Railway..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={17} />
          </button>
        )}

        <button
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={17} />
          Filters
        </button>
      </div>

      {/* CATEGORY FILTERS */}

      <div
        className={`category-list ${
          showFilters ? "show-filters" : ""
        }`}
      >
        {examCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setShowFilters(false);
            }}
            className={
              selectedCategory === category
                ? "category-chip selected"
                : "category-chip"
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* RESULTS HEADER */}

      <div
        className="explore-results-header"
        ref={resultsRef}
      >
        <div>
          <h2>
            Available Examinations
          </h2>

          <p>
            Showing {filteredExams.length} examinations
          </p>
        </div>

        {(search || selectedCategory !== "All Exams") && (
          <button
            className="text-link"
            onClick={clearFilters}
          >
            Clear filters <X size={15} />
          </button>
        )}
      </div>

      {/* EXAM CARDS */}

      <div className="exam-grid">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onView={setSelectedExam}
            />
          ))
        ) : (
          <div className="empty-state">
            <Search size={32} />

            <h3>No examinations found</h3>

            <p>
              Try another exam name or category.
            </p>

            <button
              className="text-link"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* HELP BANNER */}

      <div className="exam-help-banner">
        <div>
          <span className="eyebrow">
            NOT SURE WHERE TO START?
          </span>

          <h2>
            Find examinations that match your profile.
          </h2>

          <p>
            Use Exam Finder to explore opportunities
            based on your education and personal details.
          </p>
        </div>

        <button
          onClick={() => {
            alert(
              "Open Exam Finder from the Student Dashboard menu."
            );
          }}
        >
          Find My Exam <ChevronRight size={18} />
        </button>
      </div>

      {/* DETAILS MODAL */}

      {selectedExam && (
        <ExamDetails
          exam={selectedExam}
          onClose={() => setSelectedExam(null)}
        />
      )}

    </section>
  );
}
