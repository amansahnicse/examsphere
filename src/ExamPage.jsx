import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './App.css'

const examDetails = {
  upsc: {
    name: 'UPSC Civil Services Examination',
    shortName: 'UPSC CSE',
    icon: '🏛️',
    description:
      'Prepare for the Civil Services Examination with an organised syllabus, subject-wise topics and a structured preparation roadmap.',
    overview: [
      { label: 'Exam Level', value: 'National' },
      { label: 'Exam Stages', value: 'Prelims, Mains & Interview' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'History',
        icon: '📜',
        topics: [
          'Ancient Indian History',
          'Medieval Indian History',
          'Modern Indian History',
          'Indian National Movement',
          'Art and Culture',
          'World History for Mains',
        ],
      },
      {
        title: 'Geography',
        icon: '🌍',
        topics: [
          'Physical Geography',
          'Indian Geography',
          'World Geography',
          'Climate and Weather',
          'Natural Resources',
          'Human and Economic Geography',
        ],
      },
      {
        title: 'Indian Polity',
        icon: '⚖️',
        topics: [
          'Constitution of India',
          'Fundamental Rights and Duties',
          'Parliament and State Legislatures',
          'President, Prime Minister and Council of Ministers',
          'Judiciary and Constitutional Bodies',
          'Governance and Public Policy',
        ],
      },
      {
        title: 'Economy',
        icon: '📈',
        topics: [
          'Basic Economic Concepts',
          'National Income and GDP',
          'Inflation and Monetary Policy',
          'Banking and Financial System',
          'Government Budget and Taxation',
          'Economic Development',
        ],
      },
      {
        title: 'Environment and Science',
        icon: '🌱',
        topics: [
          'Ecology and Ecosystems',
          'Biodiversity and Conservation',
          'Climate Change',
          'Pollution and Environmental Laws',
          'General Science and Technology',
          'Space and Biotechnology',
        ],
      },
      {
        title: 'Current Affairs',
        icon: '📰',
        topics: [
          'National and International Events',
          'Government Schemes',
          'Reports and Important Indices',
          'International Organisations',
          'Science and Technology News',
          'Important Awards and Appointments',
        ],
      },
      {
        title: 'CSAT',
        icon: '🧠',
        topics: [
          'Reading Comprehension',
          'Logical Reasoning',
          'Analytical Ability',
          'Basic Numeracy',
          'Data Interpretation',
          'Decision Making',
        ],
      },
    ],
    pattern: [
      {
        title: 'Preliminary Examination',
        detail:
          'Two objective papers: General Studies Paper I and CSAT Paper II. CSAT is qualifying, subject to UPSC rules.',
      },
      {
        title: 'Main Examination',
        detail:
          'A written examination consisting of qualifying language papers and merit-counting papers, including Essay, General Studies and optional subjects.',
      },
      {
        title: 'Personality Test',
        detail:
          'An interview assessing suitability for civil services.',
      },
    ],
    roadmap: [
      'Understand the official syllabus and examination pattern.',
      'Build basic concepts using NCERT and standard reference books.',
      'Study one subject at a time and prepare concise notes.',
      'Read current affairs regularly and revise important topics.',
      'Practise previous-year questions and mock tests.',
      'Prepare answer writing for Mains and revise consistently.',
    ],
  },

  ssc: {
    name: 'SSC Competitive Examinations',
    shortName: 'SSC',
    icon: '📝',
    description:
      'Build your preparation for SSC CGL, CHSL, MTS and GD through subject-wise learning and regular practice.',
    overview: [
      { label: 'Exam Level', value: 'National' },
      { label: 'Exam Types', value: 'CGL, CHSL, MTS & GD' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'General Intelligence and Reasoning',
        icon: '🧠',
        topics: [
          'Analogy and Classification',
          'Series and Coding-Decoding',
          'Blood Relations and Directions',
          'Syllogism and Venn Diagrams',
          'Non-Verbal Reasoning',
          'Logical and Analytical Reasoning',
        ],
      },
      {
        title: 'Quantitative Aptitude',
        icon: '🔢',
        topics: [
          'Number System and Simplification',
          'Percentage, Ratio and Proportion',
          'Profit, Loss and Discount',
          'Time, Speed and Distance',
          'Time and Work',
          'Algebra, Geometry and Mensuration',
          'Trigonometry and Data Interpretation',
        ],
      },
      {
        title: 'English Language',
        icon: '📖',
        topics: [
          'Grammar and Sentence Structure',
          'Vocabulary and Synonyms',
          'Antonyms and One-Word Substitution',
          'Idioms and Phrases',
          'Error Detection',
          'Reading Comprehension',
        ],
      },
      {
        title: 'General Awareness',
        icon: '🌐',
        topics: [
          'Indian History',
          'Geography and Polity',
          'Indian Economy',
          'General Science',
          'Current Affairs',
          'Important Days, Awards and Sports',
        ],
      },
    ],
    pattern: [
      {
        title: 'Computer-Based Examination',
        detail:
          'Most SSC examinations use computer-based tests. Subjects, tiers and marking schemes depend on the specific examination.',
      },
      {
        title: 'Skill or Physical Tests',
        detail:
          'Some posts require typing, data-entry, physical efficiency or physical standard tests.',
      },
      {
        title: 'Document Verification',
        detail:
          'Candidates must satisfy the relevant eligibility and document requirements.',
      },
    ],
    roadmap: [
      'Choose the correct SSC examination: CGL, CHSL, MTS or GD.',
      'Learn basic mathematics and English grammar.',
      'Practise reasoning questions every day.',
      'Revise static General Awareness and current affairs.',
      'Solve previous-year question papers.',
      'Take timed mock tests and analyse mistakes.',
    ],
  },

  banking: {
    name: 'Banking Examinations',
    shortName: 'Banking',
    icon: '🏦',
    description:
      'Prepare for banking recruitment examinations with structured aptitude practice and banking awareness.',
    overview: [
      { label: 'Exam Level', value: 'National' },
      { label: 'Exam Types', value: 'IBPS, SBI & RBI' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'Quantitative Aptitude',
        icon: '🔢',
        topics: [
          'Simplification and Approximation',
          'Number Series',
          'Percentage and Ratio',
          'Profit, Loss and Interest',
          'Time and Work',
          'Data Interpretation',
        ],
      },
      {
        title: 'Reasoning Ability',
        icon: '🧠',
        topics: [
          'Puzzles and Seating Arrangements',
          'Syllogism',
          'Inequality',
          'Coding-Decoding',
          'Blood Relations',
          'Logical Reasoning',
        ],
      },
      {
        title: 'English Language',
        icon: '📖',
        topics: [
          'Reading Comprehension',
          'Cloze Tests',
          'Error Detection',
          'Sentence Rearrangement',
          'Vocabulary',
          'Grammar',
        ],
      },
      {
        title: 'Banking and General Awareness',
        icon: '💳',
        topics: [
          'RBI and Banking Structure',
          'Monetary Policy',
          'Financial Awareness',
          'Government Schemes',
          'Current Affairs',
          'Economic and Banking Terminology',
        ],
      },
    ],
    pattern: [
      {
        title: 'Preliminary Examination',
        detail:
          'Many banking recruitment examinations begin with an objective screening examination.',
      },
      {
        title: 'Main Examination',
        detail:
          'The main examination typically covers aptitude, reasoning, English and relevant awareness subjects.',
      },
      {
        title: 'Interview or Further Assessment',
        detail:
          'Some examinations include interviews, language tests or other assessments depending on the post.',
      },
    ],
    roadmap: [
      'Identify the target examination and its latest notification.',
      'Build calculation speed and accuracy.',
      'Practise puzzles and seating arrangements daily.',
      'Improve English comprehension and grammar.',
      'Follow banking awareness and current affairs.',
      'Attempt sectional and full-length mock tests.',
    ],
  },

  railway: {
    name: 'Railway Recruitment Examinations',
    shortName: 'Railway',
    icon: '🚆',
    description:
      'Prepare for RRB recruitment examinations with organised mathematics, reasoning, science and general awareness topics.',
    overview: [
      { label: 'Exam Level', value: 'National' },
      { label: 'Exam Types', value: 'NTPC, Group D & Others' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'Mathematics',
        icon: '🔢',
        topics: [
          'Number System',
          'Percentage and Ratio',
          'Profit and Loss',
          'Time and Work',
          'Time, Speed and Distance',
          'Mensuration and Geometry',
        ],
      },
      {
        title: 'General Intelligence and Reasoning',
        icon: '🧠',
        topics: [
          'Analogy and Series',
          'Coding-Decoding',
          'Puzzles and Classification',
          'Directions and Blood Relations',
          'Syllogism',
          'Venn Diagrams',
        ],
      },
      {
        title: 'General Science',
        icon: '🔬',
        topics: [
          'Physics Fundamentals',
          'Chemistry Basics',
          'Biology and Human Body',
          'Scientific Developments',
          'Everyday Science',
        ],
      },
      {
        title: 'General Awareness',
        icon: '🌐',
        topics: [
          'Indian History and Geography',
          'Indian Polity',
          'Indian Economy',
          'Current Affairs',
          'Sports and Awards',
          'Important Organisations',
        ],
      },
    ],
    pattern: [
      {
        title: 'Computer-Based Test',
        detail:
          'The subjects, duration, marks and number of stages vary by RRB recruitment notification.',
      },
      {
        title: 'Further Assessment',
        detail:
          'Depending on the post, candidates may need a second CBT, aptitude test or typing test.',
      },
      {
        title: 'Physical and Medical Tests',
        detail:
          'Applicable posts may require physical efficiency and medical fitness assessments.',
      },
    ],
    roadmap: [
      'Select the specific RRB examination and post.',
      'Revise school-level mathematics and science.',
      'Practise reasoning questions daily.',
      'Prepare General Awareness and current affairs.',
      'Solve previous-year papers.',
      'Take timed mock tests and review incorrect answers.',
    ],
  },

  defence: {
    name: 'Defence Recruitment Examinations',
    shortName: 'Defence',
    icon: '🛡️',
    description:
      'Explore preparation topics for NDA, CDS and AFCAT examinations and organise your study plan.',
    overview: [
      { label: 'Exam Level', value: 'National' },
      { label: 'Exam Types', value: 'NDA, CDS & AFCAT' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'Mathematics',
        icon: '🔢',
        topics: [
          'Algebra',
          'Trigonometry',
          'Matrices and Determinants',
          'Coordinate Geometry',
          'Differential and Integral Calculus',
          'Statistics and Probability',
        ],
      },
      {
        title: 'English',
        icon: '📖',
        topics: [
          'Grammar and Usage',
          'Vocabulary',
          'Sentence Correction',
          'Reading Comprehension',
          'Synonyms and Antonyms',
        ],
      },
      {
        title: 'General Knowledge',
        icon: '🌐',
        topics: [
          'History and Geography',
          'Indian Polity',
          'Basic Economics',
          'Physics, Chemistry and Biology',
          'Current Affairs',
        ],
      },
      {
        title: 'Reasoning and Aptitude',
        icon: '🧠',
        topics: [
          'Verbal Reasoning',
          'Non-Verbal Reasoning',
          'Spatial Ability',
          'Logical Thinking',
          'Numerical Aptitude',
        ],
      },
    ],
    pattern: [
      {
        title: 'Written Examination',
        detail:
          'NDA, CDS and AFCAT have different paper structures and subject combinations. Check the target exam notification.',
      },
      {
        title: 'SSB or Selection Assessment',
        detail:
          'Applicable officer-entry routes include a Services Selection Board assessment.',
      },
      {
        title: 'Medical Examination',
        detail:
          'Candidates must meet the medical and other eligibility requirements for their entry.',
      },
    ],
    roadmap: [
      'Choose NDA, CDS, AFCAT or another specific entry.',
      'Read the official syllabus and eligibility conditions.',
      'Build mathematics and English fundamentals.',
      'Study General Knowledge and current affairs.',
      'Practise previous-year papers and mock tests.',
      'Learn about the applicable selection and medical process.',
    ],
  },

  'state-exams': {
    name: 'State Government Examinations',
    shortName: 'State Exams',
    icon: '📚',
    description:
      'Prepare for State PSC and other state-level recruitment examinations with a focus on general studies and state-specific topics.',
    overview: [
      { label: 'Exam Level', value: 'State' },
      { label: 'Exam Types', value: 'State PSC & Recruitment' },
      { label: 'Preparation', value: 'Foundation to Advanced' },
    ],
    syllabus: [
      {
        title: 'State-Specific General Knowledge',
        icon: '🗺️',
        topics: [
          'State History',
          'State Geography',
          'Culture, Language and Heritage',
          'Important Personalities',
          'State Government Schemes',
          'Economy and Administration',
        ],
      },
      {
        title: 'Indian History and Polity',
        icon: '🏛️',
        topics: [
          'Ancient and Modern Indian History',
          'Indian National Movement',
          'Constitution of India',
          'Fundamental Rights and Duties',
          'Parliament and Judiciary',
          'Governance',
        ],
      },
      {
        title: 'General Studies',
        icon: '🌍',
        topics: [
          'Indian and World Geography',
          'Basic Economics',
          'General Science',
          'Environment',
          'Current Affairs',
          'Important Reports and Schemes',
        ],
      },
      {
        title: 'Aptitude and Language',
        icon: '✍️',
        topics: [
          'Reasoning',
          'Basic Mathematics',
          'Comprehension',
          'Grammar and Vocabulary',
          'State Language, where applicable',
        ],
      },
    ],
    pattern: [
      {
        title: 'Preliminary Examination',
        detail:
          'Many State PSC examinations use a screening examination, but the format varies by state and post.',
      },
      {
        title: 'Main Examination',
        detail:
          'Some recruitments include descriptive or additional objective papers.',
      },
      {
        title: 'Interview or Other Tests',
        detail:
          'The final selection process depends on the specific recruitment rules.',
      },
    ],
    roadmap: [
      'Choose your state and the exact recruitment examination.',
      'Download the latest official syllabus.',
      'Give special attention to state-specific General Knowledge.',
      'Study Indian Polity, History and Geography.',
      'Practise aptitude and language questions as required.',
      'Solve previous-year papers and revise regularly.',
    ],
  },
}

function ExamPage() {
  const { examName } = useParams()
  const exam = examDetails[examName]
  const [activeTab, setActiveTab] = useState('syllabus')
  const [expandedSubject, setExpandedSubject] = useState(0)

  if (!exam) {
    return (
      <main className="exam-detail-page">
        <h1>Exam Not Found</h1>
        <p>Please select an exam from the ExamSphere homepage.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </main>
    )
  }

  return (
    <main className="exam-detail-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <section className="exam-detail-card">
        <span className="eyebrow">EXAMSPHERE • EXAM GUIDE</span>

        <div className="exam-page-heading">
          <div className="exam-page-icon">{exam.icon}</div>
          <div>
            <span className="exam-short-name">{exam.shortName}</span>
            <h1>{exam.name}</h1>
            <p>{exam.description}</p>
          </div>
        </div>

        <div className="exam-overview-grid">
          {exam.overview.map((item) => (
            <div className="exam-overview-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="exam-tabs" role="tablist" aria-label="Exam information">
          <button
            className={activeTab === 'syllabus' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveTab('syllabus')}
          >
            📚 Syllabus
          </button>
          <button
            className={activeTab === 'pattern' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveTab('pattern')}
          >
            📝 Exam Pattern
          </button>
          <button
            className={activeTab === 'roadmap' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveTab('roadmap')}
          >
            🎯 Preparation Plan
          </button>
          <button
            className={activeTab === 'materials' ? 'exam-tab active' : 'exam-tab'}
            onClick={() => setActiveTab('materials')}
          >
            📚 Study Materials
          </button>
        </div>

        {activeTab === 'syllabus' && (
          <section className="exam-tab-content">
            <div className="exam-content-heading">
              <div>
                <span className="eyebrow">SUBJECT-WISE BREAKDOWN</span>
                <h2>Detailed Syllabus</h2>
              </div>
              <span className="topic-count">
                {exam.syllabus.length} subjects
              </span>
            </div>

            <div className="syllabus-list">
              {exam.syllabus.map((subject, index) => (
                <article className="syllabus-card" key={subject.title}>
                  <button
                    className="syllabus-header"
                    onClick={() =>
                      setExpandedSubject(
                        expandedSubject === index ? -1 : index
                      )
                    }
                    aria-expanded={expandedSubject === index}
                  >
                    <span className="syllabus-subject-icon">
                      {subject.icon}
                    </span>
                    <span className="syllabus-subject-title">
                      <strong>{subject.title}</strong>
                      <small>{subject.topics.length} important topics</small>
                    </span>
                    <span className="syllabus-chevron">
                      {expandedSubject === index ? '−' : '+'}
                    </span>
                  </button>

                  {expandedSubject === index && (
                    <div className="syllabus-topics">
                      {subject.topics.map((topic) => (
                        <div className="syllabus-topic" key={topic}>
                          <span>✓</span>
                          {topic}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'pattern' && (
          <section className="exam-tab-content">
            <span className="eyebrow">UNDERSTAND THE SELECTION PROCESS</span>
            <h2>Exam Pattern</h2>

            <div className="pattern-list">
              {exam.pattern.map((stage, index) => (
                <article className="pattern-card" key={stage.title}>
                  <span className="pattern-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="syllabus-disclaimer">
              Exam structures may change. Always verify the latest official
              notification for the exact exam you plan to take.
            </p>
          </section>
        )}

        {activeTab === 'roadmap' && (
          <section className="exam-tab-content">
            <span className="eyebrow">YOUR PREPARATION JOURNEY</span>
            <h2>Preparation Roadmap</h2>
            <p className="roadmap-intro">
              Follow these steps to organise your preparation.
            </p>

            <div className="roadmap-list">
              {exam.roadmap.map((step, index) => (
                <div className="roadmap-item" key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'materials' && (
          <section className="exam-tab-content">
            <span className="eyebrow">LEARNING RESOURCES</span>
            <h2>Study Materials</h2>
            <p className="roadmap-intro">
              Use these resources to organise your preparation for {exam.shortName}.
            </p>

            <div className="pattern-list">
              <article className="pattern-card">
                <span className="pattern-number">01</span>
                <div>
                  <h3>📚 Syllabus and Notes</h3>
                  <p>Review the syllabus above and prepare short notes for each subject.</p>
                </div>
              </article>

              <article className="pattern-card">
                <span className="pattern-number">02</span>
                <div>
                  <h3>📝 Practice Questions</h3>
                  <p>Practise topic-wise questions and record the mistakes you make.</p>
                </div>
              </article>

              <article className="pattern-card">
                <span className="pattern-number">03</span>
                <div>
                  <h3>📄 Previous-Year Papers</h3>
                  <p>Attempt previous-year papers under timed conditions and review your answers.</p>
                </div>
              </article>

              <article className="pattern-card">
                <span className="pattern-number">04</span>
                <div>
                  <h3>⏱️ Mock Tests and Revision</h3>
                  <p>Take regular mock tests, revise weak topics, and track your progress.</p>
                </div>
              </article>
            </div>

            <p className="syllabus-disclaimer">
              These are study suggestions, not downloadable files. Check the relevant official exam website for verified notifications and papers.
            </p>
          </section>
        )}

      </section>

      <p className="official-note">
        <strong>Important:</strong> This is a general preparation guide, not a
        substitute for the official syllabus. Exact subjects, topics, stages
        and eligibility requirements vary by examination and recruitment year.
      </p>
    </main>
  )
}

export default ExamPage