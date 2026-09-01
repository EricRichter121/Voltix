// components/SignUpForm.tsx

import { useState } from 'react'
import type { SubmitEvent } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from 'lucide-react'
import { useSignUp } from '../hooks/useSignUp'

function SignUpForm() {
  const { signUp, loading, error } = useSignUp()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    const password = data.get('password')
    const confirmation = data.get('passwordConfirmation')

    if (password !== confirmation) {
      setPasswordError('Passwords do not match.')
      return
    }

    setPasswordError('')

    await signUp({
      name: data.get('name') as string,
      email: data.get('email') as string,
      password: password as string,
    })
  }

  return (
    <section className="w-full bg-base-100 sm:p-8 sm:pt-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-base-content">
          Create your account
        </h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-medium">
            Full name
          </span>

          <span className="input input-bordered flex w-full items-center gap-3">
            <UserRound
              aria-hidden="true"
              className="h-4 w-4 text-base-content/40"
            />

            <input
              className="grow bg-transparent"
              name="name"
              placeholder="Alex Morgan"
              required
              type="text"
            />
          </span>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-medium">
            Email address
          </span>

          <span className="input input-bordered flex w-full items-center gap-3">
            <Mail
              aria-hidden="true"
              className="h-4 w-4 text-base-content/40"
            />

            <input
              className="grow bg-transparent"
              name="email"
              placeholder="alex@example.com"
              required
              type="email"
            />
          </span>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-medium">
            Password
          </span>

          <span className="input input-bordered flex w-full items-center gap-3">
            <LockKeyhole
              aria-hidden="true"
              className="h-4 w-4 text-base-content/40"
            />

            <input
              className="grow bg-transparent"
              minLength={8}
              name="password"
              placeholder="8+ characters"
              required
              type={showPassword ? 'text' : 'password'}
            />

            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-base-content/40 hover:text-base-content"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </span>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-1.5 font-medium">
            Confirm password
          </span>

          <span
            className={`input input-bordered flex w-full items-center gap-3 ${
              passwordError ? 'input-error' : ''
            }`}
          >
            <LockKeyhole
              aria-hidden="true"
              className="h-4 w-4 text-base-content/40"
            />

            <input
              className="grow bg-transparent"
              minLength={8}
              name="passwordConfirmation"
              placeholder="Repeat your password"
              required
              type={showConfirmation ? 'text' : 'password'}
            />

            <button
              aria-label={
                showConfirmation
                  ? 'Hide confirmed password'
                  : 'Show confirmed password'
              }
              className="text-base-content/40 hover:text-base-content"
              onClick={() => setShowConfirmation(!showConfirmation)}
              type="button"
            >
              {showConfirmation ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </span>

          {passwordError && (
            <span className="label-text-alt mt-1 text-error">
              {passwordError}
            </span>
          )}
        </label>

        {error && (
          <p className="text-sm text-error">
            {error}
          </p>
        )}

        <label className="flex items-start gap-3 pt-1 text-sm text-base-content/60">
          <input
            className="checkbox checkbox-primary checkbox-sm mt-0.5"
            required
            type="checkbox"
          />

          <span>
            I agree to the{' '}
            <a
              className="font-medium text-primary hover:underline"
              href="/terms"
            >
              terms and conditions
            </a>
            .
          </span>
        </label>

        <button
          className="btn btn-primary w-full gap-2"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              Create account
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </section>
  )
}

export default SignUpForm