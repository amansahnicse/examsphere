import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const questions = [
{
question: 'Which part of the Indian Constitution contains Fundamental Rights?',
options: ['Part I', 'Part II', 'Part III', 'Part IV'],
answer: 2,
explanation: 'Fundamental Rights are included in Part III of the Indian Constitution.'
},
{
question: 'What is the capital of India?',
options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
answer: 1,
explanation: 'New Delhi is the capital of India.'
},
{
question: 'Which planet is known as the Red Planet?',
options: ['Venus', 'Jupiter', 'Mars', 'Mercury'],
answer: 2,
explanation: 'Mars is known as the Red Planet.'
},
{
question: 'What is 25% of 200?',
options: ['25', '40', '50', '75'],
answer: 2,
explanation: '25% of 200 is 50.'
},
{
question: 'Which institution issues most currency notes in India?',
options: ['SBI', 'RBI', 'SEBI', 'NITI Aayog'],
answer: 1,
explanation: 'The Reserve Bank of India issues most banknotes in India.'
}
]

const resources = [
{
title: 'NCERT Textbooks',
description: 'Build your basic concepts using school textbooks.',
url: 'https://ncert.nic.in/textbook.php'
},
{
title: 'UPSC Previous Year Papers',
description: 'Find official previous-year examination papers.',
url: 'https://upsc.gov.in/examinations/previous-question-papers'
},
{
title: 'SSC Official Website',
description: 'Check examination notifications and updates.',
url: 'https://ssc.gov.in/'
},
{
title: 'Press Information Bureau',
description: 'Read official government announcements for current affairs.',
url: 'https://pib.gov.in/'
}
]

export default function ResourcesPage({ type = 'study' }) {
const [started, setStarted] = useState(false)
const [answers, setAnswers] = useState({})
const [submitted, setSubmitted] = useState(false)
const [time, setTime] = useState(300)

useEffect(() => {
if (!started || submitted || time <= 0) return

```
const timer = setInterval(() => {
  setTime(previous => previous - 1)
}, 1000)

return () => clearInterval(timer)
```

}, [started, submitted, time])

useEffect(() => {
if (started && time === 0) {
setSubmitted(true)
}
}, [started, time])

const score = questions.reduce(
(total, question, index) =>
total + (answers[index] === question.answer ? 1 : 0),
0
)

function startTest() {
setAnswers({})
setSubmitted(false)
setTime(300)
setStarted(true)
}

const titles = {
study: 'Study Materials',
mock: 'Mock Tests',
current: 'Current Affairs'
}

return ( <main className="exam-detail-page"> <section className="exam-detail-card"> <Link to="/" className="back-link">← Back to Home</Link>

```
    <span className="eyebrow">EXAMSPHERE LEARNING HUB</span>
    <h1>{titles[type] || titles.study}</h1>

    {type === 'study' && (
      <>
        <p>Explore study resources and official examination papers.</p>

        <div className="pattern-list">
          {resources.map(resource => (
            <article className="pattern-card" key={resource.title}>
              <div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noreferrer">
                  Open Resource ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </>
    )}

    {type === 'current' && (
      <>
        <p>Follow trusted sources for government updates and current affairs.</p>

        <div className="pattern-list">
          <article className="pattern-card">
            <div>
              <h3>📰 Press Information Bureau</h3>
              <p>Official government announcements and policy updates.</p>
              <a href="https://pib.gov.in/" target="_blank" rel="noreferrer">
                Read Latest Updates ↗
              </a>
            </div>
          </article>

          <article className="pattern-card">
            <div>
              <h3>🏛️ National Portal of India</h3>
              <p>Government information, schemes and public services.</p>
              <a href="https://www.india.gov.in/" target="_blank" rel="noreferrer">
                Visit Portal ↗
              </a>
            </div>
          </article>

          <article className="pattern-card">
            <div>
              <h3>🏦 Reserve Bank of India</h3>
              <p>Banking, financial and monetary policy announcements.</p>
              <a href="https://www.rbi.org.in/" target="_blank" rel="noreferrer">
                Read RBI Updates ↗
              </a>
            </div>
          </article>
        </div>
      </>
    )}

    {type === 'mock' && (
      <>
        <p>Attempt five multiple-choice questions. You have five minutes.</p>

        {!started ? (
          <button className="primary-button" onClick={startTest}>
            Start Mock Test →
          </button>
        ) : (
          <>
            <h3>
              Time Left: {Math.floor(time / 60)}:
              {String(time % 60).padStart(2, '0')}
            </h3>

            {questions.map((question, index) => (
              <article className="pattern-card" key={question.question}>
                <div>
                  <h3>{index + 1}. {question.question}</h3>

                  {question.options.map((option, optionIndex) => (
                    <label
                      key={option}
                      style={{
                        display: 'block',
                        margin: '12px 0',
                        cursor: submitted ? 'default' : 'pointer'
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        checked={answers[index] === optionIndex}
                        disabled={submitted}
                        onChange={() =>
                          setAnswers(previous => ({
                            ...previous,
                            [index]: optionIndex
                          }))
                        }
                      />
                      {' '}{option}
                    </label>
                  ))}

                  {submitted && (
                    <p>
                      <strong>
                        Correct answer: {question.options[question.answer]}
                      </strong>
                      <br />
                      {question.explanation}
                    </p>
                  )}
                </div>
              </article>
            ))}

            {!submitted ? (
              <button
                className="primary-button"
                onClick={() => setSubmitted(true)}
              >
                Submit Answers
              </button>
            ) : (
              <div className="pattern-card">
                <div>
                  <h2>Your Score: {score} / {questions.length}</h2>
                  <p>
                    {score === questions.length
                      ? 'Excellent work!'
                      : 'Review the explanations and try again.'}
                  </p>
                  <button className="primary-button" onClick={startTest}>
                    Try Again ↻
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </>
    )}
  </section>
</main>


)
}
