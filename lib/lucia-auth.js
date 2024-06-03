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

function createBlankCookie() {
    const sessionCookie = lucia.createBlankSessionCookie();
    setCookie(sessionCookie);
}

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookie(sessionCookie);
}

export async function verifyAuthSession() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    
    if (!sessionCookie) {
        return {
            user: null,
            session: null
        };
    }
    
    const sessionId = sessionCookie.value;

    if(!sessionId){
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
            createBlankCookie();
        }

        return checkSession;

    } catch (error) {

    }
}

export async function removeSession() {
    const { session } = await verifyAuthSession();

    if (!session) {
        return {
            error: 'Unauthorized!'
        };
    }

    await lucia.invalidateSession(session.id);
    createBlankCookie();
}