import { Lucia } from 'lucia';
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import { cookies } from 'next/headers.js';

import db from './db.js';

const adapter = new BetterSqlite3Adapter(db, {
    // tables of storing
    user: 'users',
    session: 'sessions'
});
const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
});

function setCookie(cookie) {
    cookies().set(
        cookie.name,
        cookie.value,
        cookie.attributes
    );
}

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(sessionCookie);
}

export async function verifyAuthSession() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    const sessionId = sessionCookie.value;

    if (!sessionCookie || !sessionId) {
        return {
            user: null,
            session: null
        };
    }

    const checkSession = await lucia.validateSession(sessionId);
    // NextJs will throw an error if running the page rendering process
    try {
        if (checkSession.session && checkSession.session.fresh) {
            // refreshing session cookie
            const sessionCookie = lucia.createSessionCookie(checkSession.session.id);
            setCookie(sessionCookie);
        }
      
        if (!checkSession.session) {
            // invalid session data case
            const sessionCookie = lucia.createBlankSessionCookie();
            setCookie(sessionCookie);
        }

        return checkSession;

    } catch (error) {

    }

}