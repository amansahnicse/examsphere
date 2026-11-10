import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  BrainCircuit,
  ChartNoAxesCombined,
  Target,
  Users,
  GraduationCap,
  CalendarCheck,
  ClipboardList,
  FolderOpen,
  BarChart3,
  UserPlus,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import "./HomepageSections.css";

const studentFeatures = [
  {
    icon: BookOpen,
    title: "Detailed Exam Syllabus",
    description:
      "Explore exam-wise syllabus with properly organised subjects and topics.",
  },
  {
    icon: FileText,
    title: "Notes & Study Materials",
    description:
      "Access organised study notes, revision material and learning resources.",
  },
  {
    icon: ClipboardCheck,
    title: "PYQ & Question Bank",
    description:
      "Practise previous-year questions and topic-wise questions with solutions.",
  },
  {
    icon: Target,
    title: "Mock Tests",
    description:
      "Attempt topic-wise and full-length tests with different difficulty levels.",
  },
  {
    icon: BrainCircuit,
    title: "AI Learning Assistant",
    description:
      "Understand difficult topics, ask questions and learn in your preferred language.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Performance Analysis",
    description:
      "Track your preparation, identify weak topics and understand your progress.",
  },
];

const teacherFeatures = [
  {
    icon: ClipboardList,
    title: "Create & Manage Tests",
    description:
      "Create online tests, organise questions and conduct assessments for your students.",
  },
  {
    icon: FolderOpen,
    title: "Upload Study Materials",
    description:
      "Share notes, PDFs, assignments and other learning resources with your classes.",
  },
  {
    icon: Users,
    title: "Manage Classes & Groups",
    description:
      "Create student groups, manage batches and organise classroom activities.",
  },
  {
    icon: CalendarCheck,
    title: "Student Attendance",
    description:
      "Mark students Present, Absent, Late or on Leave and maintain attendance records.",
  },
  {
    icon: BarChart3,
    title: "Student Performance",
    description:
      "Review test results, learning progress and individual student performance.",
  },
  {
    icon: UserPlus,
    title: "Assignments & Practice",
    description:
      "Assign homework, practice questions and learning activities to your groups.",
  },
];

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="home-service-card">
      <div className="home-service-icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </article>
  );
}

export default function HomepageSections() {
  return (
    <div className="homepage-services">

      {/* STUDENT SECTION */}

      <section className="home-student-section">
        <div className="home-section-heading">
          <span className="home-section-eyebrow">
            FOR STUDENTS
          </span>

          <h2>
            Prepare smarter. Move forward with confidence.
          </h2>

          <p>
            From understanding your exam syllabus to practising
            questions and tracking performance, everything you
            need for your preparation journey in one place.
          </p>
        </div>

        <div className="home-service-grid">
          {studentFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>

        <div className="home-section-action">
          <Link to="/signup" className="home-service-button">
            Start Student Journey
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* TEACHER SECTION */}

      <section className="home-teacher-section">
        <div className="home-teacher-content">

          <div className="home-teacher-heading">
            <span className="home-section-eyebrow">
              FOR TEACHERS & EDUCATORS
            </span>

            <h2>
              Teach, manage and guide students in one place.
            </h2>

            <p>
              Organise your classes, conduct online tests,
              share learning resources and manage student
              attendance through your Teacher Dashboard.
            </p>

            <Link
              to="/signup?role=teacher"
              className="home-service-button home-teacher-button"
            >
              Explore Teacher Services
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="home-teacher-points">
            <div>
              <CheckCircle2 size={18} />
              <span>Create and manage student groups</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Mark and review daily attendance</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Share notes, tests and assignments</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Monitor student performance</span>
            </div>
          </div>
        </div>

        <div className="home-teacher-grid">
          {teacherFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>

        <div className="home-teacher-note">
          <GraduationCap size={17} />
          <p>
            Students will see group-related classes and attendance
            only after successfully joining a teacher's group.
          </p>
        </div>
      </section>

    </div>
  );
}