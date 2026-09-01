import { useState } from 'react'  
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail
} from 'lucide-react'

import { useSignIn } from '../hooks/useSignIn'

function SignInForm() {
  const { signIn, loading, error } = useSignIn()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    const email = data.get('email')
    const password = data.get('password')

    if (
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return
    }

    await signIn({
      email,
      password,
    })
  }
  return (
    <section className="w-full bg-base-100 sm:p-8 sm:pt-0">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-base-content">
          Log in to your account
        </h1>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
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
          <span className="label-text font-medium">
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

        {/* {error && (
          <p className="text-sm text-error">
            {error}
          </p>
        )} */}

        <button
          className="btn btn-primary w-full gap-2 mt-4"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              Sign In
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </section>
  )
}

export default SignInForm