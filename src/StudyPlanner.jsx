import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  CalendarDays,
  Clock,
  Target,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./StudyPlanner.css";

const STORAGE_KEY = "examsphere-study-planner";

const subjects = [
  "Indian Polity",
  "History",
  "Geography",
  "Economy",
  "General Science",
  "Mathematics",
  "Reasoning",
  "Current Affairs",
  "English",
  "Other",
];

const getLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getSavedTasks = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

function StudyPlanner() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [selectedDate, setSelectedDate] = useState(getLocalDate());

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Indian Polity");
  const [duration, setDuration] = useState("60");

 useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  window.dispatchEvent(
    new CustomEvent("study-planner-updated", {
      detail: tasks,
    })
  );
}, [tasks]);
  const todaysTasks = useMemo(
    () => tasks.filter((task) => task.date === selectedDate),
    [tasks, selectedDate]
  );

  const completedTasks = todaysTasks.filter(
    (task) => task.completed
  ).length;

  const totalMinutes = todaysTasks.reduce(
    (total, task) => total + Number(task.duration),
    0
  );

  const completedMinutes = todaysTasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + Number(task.duration), 0);

  const progress = todaysTasks.length
    ? Math.round((completedTasks / todaysTasks.length) * 100)
    : 0;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours && remainingMinutes) {
      return `${hours}h ${remainingMinutes}m`;
    }

    if (hours) return `${hours}h`;

    return `${remainingMinutes}m`;
  };

  const addTask = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: `${Date.now()}-${Math.random()}`,
      title: title.trim(),
      subject,
      duration: Number(duration),
      date: selectedDate,
      completed: false,
    };

    setTasks((previous) => [...previous, newTask]);

    setTitle("");
    setDuration("60");
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  };

  const changeDate = (days) => {
    const date = new Date(`${selectedDate}T12:00:00`);
    date.setDate(date.getDate() + days);
    setSelectedDate(getLocalDate(date));
  };

  const weekDays = useMemo(() => {
    const current = new Date(`${selectedDate}T12:00:00`);
    const day = current.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;

    const monday = new Date(current);
    monday.setDate(current.getDate() + mondayOffset);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const dateKey = getLocalDate(date);

      const dayTasks = tasks.filter(
        (task) => task.date === dateKey
      );

      return {
        date: dateKey,
        label: date.toLocaleDateString("en-IN", {
          weekday: "short",
        }),
        number: date.getDate(),
        total: dayTasks.length,
        completed: dayTasks.filter((task) => task.completed).length,
      };
    });
  }, [selectedDate, tasks]);

  const weekTotal = weekDays.reduce(
    (total, day) => total + day.total,
    0
  );

  const weekCompleted = weekDays.reduce(
    (total, day) => total + day.completed,
    0
  );

  return (
    <div className="study-planner">
      <div className="planner-heading">
        <div>
          <span className="planner-eyebrow">
            SMART STUDY MANAGEMENT
          </span>

          <h1>Daily & Weekly Planner</h1>

          <p>
            Plan your study sessions, complete daily targets
            and track your preparation.
          </p>
        </div>

        <div className="planner-heading-icon">
          <CalendarDays size={32} />
        </div>
      </div>

      {/* Daily statistics */}
      <div className="planner-stats">
        <div className="planner-stat-card">
          <div className="planner-stat-icon">
            <Target size={21} />
          </div>

          <h2>{todaysTasks.length}</h2>
          <p>Today's Tasks</p>
        </div>

        <div className="planner-stat-card">
          <div className="planner-stat-icon">
            <CheckCircle2 size={21} />
          </div>

          <h2>{completedTasks}</h2>
          <p>Completed Tasks</p>
        </div>

        <div className="planner-stat-card">
          <div className="planner-stat-icon">
            <Clock size={21} />
          </div>

          <h2>{formatDuration(totalMinutes)}</h2>
          <p>Planned Study Time</p>
        </div>

        <div className="planner-stat-card">
          <div className="planner-stat-icon">
            <BookOpen size={21} />
          </div>

          <h2>{formatDuration(completedMinutes)}</h2>
          <p>Completed Study Time</p>
        </div>
      </div>

      {/* Weekly overview */}
      <section className="planner-card weekly-planner">
        <div className="planner-section-heading">
          <div>
            <h2>Weekly Overview</h2>
            <p>Your weekly study activity</p>
          </div>

          <span className="planner-week-summary">
            {weekCompleted}/{weekTotal} completed
          </span>
        </div>

        <div className="planner-week-days">
          {weekDays.map((day) => (
            <button
              key={day.date}
              className={`planner-day ${
                selectedDate === day.date ? "selected" : ""
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <span>{day.label}</span>
              <strong>{day.number}</strong>

              <small>
                {day.completed}/{day.total}
              </small>

              <div className="planner-day-indicator">
                <div
                  style={{
                    width: `${
                      day.total
                        ? (day.completed / day.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Daily progress */}
      <section className="planner-card daily-progress">
        <div className="planner-section-heading">
          <div>
            <h2>Daily Progress</h2>
            <p>
              {completedTasks} of {todaysTasks.length} tasks completed
            </p>
          </div>

          <strong>{progress}%</strong>
        </div>

        <div className="planner-progress-track">
          <div style={{ width: `${progress}%` }} />
        </div>
      </section>

      {/* Add task */}
      <section className="planner-card add-task-card">
        <div className="planner-section-heading">
          <div>
            <h2>Add Study Target</h2>
            <p>Create a new study task for your selected day.</p>
          </div>

          <div className="planner-add-icon">
            <Plus size={21} />
          </div>
        </div>

        <form onSubmit={addTask} className="planner-form">
          <div className="planner-form-group task-title-group">
            <label htmlFor="planner-title">Task Name</label>

            <input
              id="planner-title"
              type="text"
              placeholder="e.g. Fundamental Rights"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div className="planner-form-group">
            <label htmlFor="planner-subject">Subject</label>

            <select
              id="planner-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="planner-form-group">
            <label htmlFor="planner-duration">
              Duration
            </label>

            <select
              id="planner-duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
            >
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">1 Hour</option>
              <option value="90">1.5 Hours</option>
              <option value="120">2 Hours</option>
              <option value="180">3 Hours</option>
              <option value="240">4 Hours</option>
            </select>
          </div>

          <button type="submit" className="planner-add-button">
            <Plus size={17} />
            Add Target
          </button>
        </form>
      </section>

      {/* Task list */}
      <section className="planner-card task-list-card">
        <div className="planner-section-heading">
          <div>
            <h2>Study Tasks</h2>
            <p>
              {new Date(`${selectedDate}T12:00:00`).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <div className="planner-date-controls">
            <button
              onClick={() => changeDate(-1)}
              aria-label="Previous day"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setSelectedDate(getLocalDate())}
            >
              Today
            </button>

            <button
              onClick={() => changeDate(1)}
              aria-label="Next day"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {todaysTasks.length > 0 ? (
          <div className="planner-task-list">
            {todaysTasks.map((task) => (
              <div
                className={`planner-task ${
                  task.completed ? "task-completed" : ""
                }`}
                key={task.id}
              >
                <button
                  className="planner-task-check"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? "Mark incomplete"
                      : "Mark complete"
                  }
                >
                  {task.completed ? (
                    <CheckCircle2 size={21} />
                  ) : (
                    <Circle size={21} />
                  )}
                </button>

                <div className="planner-task-info">
                  <h3>{task.title}</h3>

                  <div>
                    <span>{task.subject}</span>
                    <span>
                      <Clock size={13} />
                      {formatDuration(Number(task.duration))}
                    </span>
                  </div>
                </div>

                <span className="planner-task-status">
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <button
                  className="planner-delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="planner-empty">
            <div>
              <CalendarDays size={29} />
            </div>

            <h3>No study targets yet</h3>

            <p>
              Add your first study target to start planning
              your preparation.
            </p>
          </div>
        )}
      </section>

      <div className="planner-note">
        Your study targets are automatically saved in this browser.
      </div>
    </div>
  );
}

export default StudyPlanner;