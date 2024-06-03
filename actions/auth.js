'use server';

import { redirect } from "next/navigation.js";

import { createUser, getUserByEmail } from "@/lib/user.js";
import { createAuthSession, removeSession } from "@/lib/lucia-auth.js";
import { verifyPassword } from "@/lib/hash.js";

export async function register(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = {};

    if (!email || !email.includes('@')) {
        errors.email = 'Please enter a valid email address.'
    }

    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.'
    }

    if (Object.keys(errors).length > 0) {
        return {
            errors
        }
    }

    try {
        const userId = createUser(email, password);

        await createAuthSession(userId);
        redirect('/training');
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return {
                errors: {
                    email: 'Account with this email already exist.'
                }
            }
        }

        throw err;
    }
}

export async function login(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const existingUser = getUserByEmail(email);

    if (!existingUser) {
        return {
            errors: {
                email: 'Could not authenticate user, please check your credentials.'
            }
        };
    }

    const isValidPassword = verifyPassword(existingUser.password, password);

    if (!isValidPassword) {
        return {
            errors: {
                password: 'Could not authenticate user, please check your credentials.'
            }
        };
    }

    await createAuthSession(existingUser.id);
    redirect('/training');
}

export async function logout() {
    await removeSession();
    redirect('/');
}

