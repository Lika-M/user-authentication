'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';

import register from '@/actions/auth.js';

export default function AuthForm({ mode }) {
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
          {!mode || mode === 'login' ? "Login" : "Create Account"}
        </button>
      </p>
      {mode === 'register' && (
        <p>
          <Link href="/?mode=login">Login with existing account.</Link>
        </p>
      )}
      {mode === 'login' && (
        <p>
          <Link href="/?mode=register">Create Account</Link>
        </p>
      )}
    </form>
  );
}
