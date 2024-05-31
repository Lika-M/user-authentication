'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import register from '@/actions/auth.js';

export default function AuthForm() {
  const [formState, formAction] = useFormState(register, { errors: null });

  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors &&
        (<ul id="form-errors">
          {Object.keys(formState.errors).map(key => (
            <li key={key}>{formState.errors[key]}</li>
          ))}
        </ul>)}
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
