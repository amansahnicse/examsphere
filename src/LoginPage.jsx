import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signInWithPopup
} from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import './App.css'

function LoginPage() {
const [isSignup, setIsSignup] = useState(false)
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const [loading, setLoading] = useState(false)

const navigate = useNavigate()

async function handleSubmit(event) {
event.preventDefault()
setError('')
setLoading(true)

```
try {
  if (isSignup) {
    await createUserWithEmailAndPassword(auth, email, password)
  } else {
    await signInWithEmailAndPassword(auth, email, password)
  }

  navigate('/')
} catch (err) {
  const messages = {
    'auth/email-already-in-use': 'This email already has an account. Please log in.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Choose a stronger password with at least 6 characters.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/user-not-found': 'No account found. Please sign up first.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed.'
  }

  setError(messages[err.code] || err.message || 'Something went wrong. Please try again.')
} finally {
  setLoading(false)
}
```

}

async function handleGoogleLogin() {
setError('')
setLoading(true)

```
try {
  await signInWithPopup(auth, googleProvider)
  navigate('/')
} catch (err) {
  setError(
    err.code === 'auth/popup-closed-by-user'
      ? 'The Google sign-in window was closed.'
      : err.message || 'Google sign-in failed. Please try again.'
  )
} finally {
  setLoading(false)
}
```

}

return ( <div className="auth-page"> <div className="auth-card"> <Link to="/" className="logo auth-logo"> <span className="logo-icon">E</span> <span>Exam<span className="logo-light">Sphere</span></span> </Link>

```
    <span className="eyebrow">
      {isSignup ? 'START YOUR JOURNEY' : 'WELCOME BACK'}
    </span>

    <h1>{isSignup ? 'Create Account' : 'Welcome Back!'}</h1>

    <p className="auth-description">
      {isSignup
        ? 'Create your account and begin your exam preparation.'
        : 'Log in to continue your learning journey.'}
    </p>

    <form className="auth-form" onSubmit={handleSubmit}>
      {isSignup && (
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          autoComplete="name"
        />
      )}

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password (minimum 6 characters)"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        minLength={6}
        autoComplete={isSignup ? 'new-password' : 'current-password'}
      />

      {error && <p className="auth-error" role="alert">{error}</p>}

      <button className="primary-button auth-submit" type="submit" disabled={loading}>
        {loading
          ? 'Please wait...'
          : isSignup
            ? 'Create Account →'
            : 'Login →'}
      </button>
    </form>

    <div className="auth-divider">
      <span>OR</span>
    </div>

    <button
      type="button"
      className="google-button"
      onClick={handleGoogleLogin}
      disabled={loading}
    >
      Continue with Google
    </button>

    <p className="auth-switch">
      {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
      <button
        type="button"
        onClick={() => {
          setIsSignup(!isSignup)
          setError('')
        }}
      >
        {isSignup ? 'Login' : 'Sign up'}
      </button>
    </p>

    <Link to="/" className="auth-home-link">← Back to homepage</Link>
  </div>
</div>

)
}

export default LoginPage
