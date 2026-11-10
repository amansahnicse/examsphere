import "./PreparationRoadmap.css";
import StudyPlanner from "./StudyPlanner";
import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Target,
  CalendarDays,
  ChevronDown,
  RotateCcw,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";

import "./PreparationRoadmap.css";

const STORAGE_KEY = "examsphere-roadmap-progress";

const roadmapData = {
  UPSC: {
    name: "UPSC Civil Services",
    subjects: [
      {
        name: "Indian Polity",
        topics: [
          "Historical Background",
          "Making of the Constitution",
          "Fundamental Rights",
          "Directive Principles of State Policy",
          "Fundamental Duties",
          "President and Vice President",
          "Prime Minister and Council of Ministers",
          "Parliament",
          "Supreme Court",
          "Constitutional Bodies",
        ],
      },
      {
        name: "Indian History",
        topics: [
          "Ancient Indian History",
          "Medieval Indian History",
          "Modern Indian History",
          "Revolt of 1857",
          "Indian National Movement",
          "Gandhian Era",
        ],
      },
      {
        name: "Geography",
        topics: [
          "Physical Geography",
          "Indian Geography",
          "Climate",
          "Rivers and Drainage System",
          "Natural Resources",
          "Agriculture",
        ],
      },
      {
        name: "Economy",
        topics: [
          "Basic Economics",
          "National Income",
          "Inflation",
          "Banking System",
          "Budget",
          "Government Schemes",
        ],
      },
    ],
  },

  BPSC: {
    name: "BPSC Combined Competitive Exam",
    subjects: [
      {
        name: "History",
        topics: [
          "Ancient Indian History",
          "Medieval Indian History",
          "Modern Indian History",
          "Revolt of 1857",
          "Indian National Movement",
          "History of Bihar",
        ],
      },
      {
        name: "Geography",
        topics: [
          "Physical Geography",
          "Indian Geography",
          "Geography of Bihar",
          "Rivers of Bihar",
          "Climate and Agriculture",
        ],
      },
      {
        name: "Indian Polity",
        topics: [
          "Constitutional Development",
          "Preamble",
          "Fundamental Rights",
          "Directive Principles",
          "Parliament",
          "State Government",
          "Judiciary",
        ],
      },
      {
        name: "General Science",
        topics: [
          "Physics Basics",
          "Chemistry Basics",
          "Biology Basics",
          "Human Body",
          "Scientific Developments",
        ],
      },
    ],
  },

  RRB: {
    name: "RRB NTPC",
    subjects: [
      {
        name: "Mathematics",
        topics: [
          "Number System",
          "LCM and HCF",
          "Percentage",
          "Ratio and Proportion",
          "Profit and Loss",
          "Simple and Compound Interest",
          "Time and Work",
          "Speed, Time and Distance",
        ],
      },
      {
        name: "General Intelligence",
        topics: [
          "Analogy",
          "Coding and Decoding",
          "Blood Relations",
          "Number Series",
          "Direction Sense",
          "Syllogism",
        ],
      },
      {
        name: "General Awareness",
        topics: [
          "Indian History",
          "Indian Geography",
          "Indian Polity",
          "Indian Economy",
          "Current Affairs",
          "General Science",
        ],
      },
    ],
  },
};

function getSavedProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function PreparationRoadmap() {
  const [selectedExam, setSelectedExam] = useState("UPSC");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [progress, setProgress] = useState(getSavedProgress);

  const exam = roadmapData[selectedExam];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

    window.dispatchEvent(
      new CustomEvent("roadmap-progress-updated", {
        detail: progress,
      })
    );
  }, [progress]);

  const allTopics = useMemo(() => {
    return exam.subjects.flatMap((subject) =>
      subject.topics.map((topic) => ({
        subject: subject.name,
        topic,
        id: `${selectedExam}-${subject.name}-${topic}`,
      }))
    );
  }, [exam, selectedExam]);

  const completedCount = allTopics.filter(
    (item) => progress[item.id]
  ).length;

  const totalTopics = allTopics.length;

  const percentage =
    totalTopics === 0
      ? 0
      : Math.round((completedCount / totalTopics) * 100);

  const visibleSubjects =
    selectedSubject === "All Subjects"
      ? exam.subjects
      : exam.subjects.filter(
          (subject) => subject.name === selectedSubject
        );

  const toggleTopic = (id) => {
    setProgress((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  };

  const resetProgress = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset this exam's progress?"
    );

    if (!confirmed) return;

    setProgress((previous) => {
      const updated = { ...previous };

      allTopics.forEach((item) => {
        delete updated[item.id];
      });

      return updated;
    });
  };

  return (
    <div className="roadmap-page">
      <div className="roadmap-heading">
        <div>
          <span className="roadmap-eyebrow">
            YOUR PREPARATION JOURNEY
          </span>

          <h1>Preparation Roadmap</h1>

          <p>
            Organise your syllabus, complete topics and track
            your preparation progress.
          </p>
        </div>

        <div className="roadmap-heading-icon">
          <GraduationCap size={35} />
        </div>
      </div>

      <section className="roadmap-exam-selector">
        <div>
          <label htmlFor="roadmap-exam">Select your target exam</label>

          <div className="roadmap-select-wrapper">
            <BookOpen size={18} />

            <select
              id="roadmap-exam"
              value={selectedExam}
              onChange={(event) => {
                setSelectedExam(event.target.value);
                setSelectedSubject("All Subjects");
              }}
            >
              {Object.entries(roadmapData).map(([key, item]) => (
                <option value={key} key={key}>
                  {item.name}
                </option>
              ))}
            </select>

            <ChevronDown size={16} />
          </div>
        </div>

        <div className="roadmap-demo-label">
          <LockKeyhole size={15} />
          Sample syllabus
        </div>
      </section>

      <section className="roadmap-progress-card">
        <div className="roadmap-progress-top">
          <div>
            <span>YOUR OVERALL PROGRESS</span>
            <h2>{percentage}% Completed</h2>
            <p>
              {completedCount} of {totalTopics} topics completed
            </p>
          </div>

          <div className="roadmap-progress-icon">
            <Target size={27} />
          </div>
        </div>

        <div className="roadmap-progress-track">
          <div
            className="roadmap-progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="roadmap-progress-footer">
          <span>{totalTopics - completedCount} topics remaining</span>

          <button onClick={resetProgress}>
            <RotateCcw size={14} />
            Reset Progress
          </button>
        </div>
      </section>

      <div className="roadmap-section-heading">
        <div>
          <h2>Complete Syllabus</h2>
          <p>Complete each topic as you study.</p>
        </div>

        <div className="roadmap-filter">
          <select
            value={selectedSubject}
            onChange={(event) =>
              setSelectedSubject(event.target.value)
            }
          >
            <option>All Subjects</option>

            {exam.subjects.map((subject) => (
              <option key={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="roadmap-subject-list">
        {visibleSubjects.map((subject) => {
          const subjectTopics = subject.topics.map((topic) => ({
            topic,
            id: `${selectedExam}-${subject.name}-${topic}`,
          }));

          const subjectCompleted = subjectTopics.filter(
            (item) => progress[item.id]
          ).length;

          const subjectPercentage = Math.round(
            (subjectCompleted / subjectTopics.length) * 100
          );

          return (
            <section className="roadmap-subject-card" key={subject.name}>
              <div className="roadmap-subject-header">
                <div className="roadmap-subject-icon">
                  <BookOpen size={20} />
                </div>

                <div className="roadmap-subject-info">
                  <h3>{subject.name}</h3>

                  <p>
                    {subjectCompleted}/{subjectTopics.length} topics
                    completed
                  </p>
                </div>

                <strong>{subjectPercentage}%</strong>
              </div>

              <div className="roadmap-subject-track">
                <div
                  style={{ width: `${subjectPercentage}%` }}
                />
              </div>

              <div className="roadmap-topic-list">
                {subjectTopics.map((item, index) => {
                  const completed = Boolean(progress[item.id]);

                  return (
                    <button
                      className={`roadmap-topic ${
                        completed ? "completed" : ""
                      }`}
                      key={item.id}
                      onClick={() => toggleTopic(item.id)}
                    >
                      {completed ? (
                        <CheckCircle2 size={19} />
                      ) : (
                        <Circle size={19} />
                      )}

                      <span>
                        {index + 1}. {item.topic}
                      </span>

                      <small>
                        {completed ? "Completed" : "Mark complete"}
                      </small>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

            <StudyPlanner />
    </div>
  );
}

export default PreparationRoadmap;