import React from 'react'
import SignupForm from '../components/SignupForm'

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignupForm />
      </div>
    </div>
  )
}
