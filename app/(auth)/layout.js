import { logout } from '@/actions/auth.js';
import '../globals.css';

export const metadata = {
    title: 'Activity',
    description: 'Authentication',
};

export default function AuthRootLayout({ children }) {
    return (
        <>
            <header id="auth-header">
                <p>Welcome back!</p>
                <form action={logout}>
                    <button>Logout</button>
                </form>
            </header>
            {children}
        </>
    );
}
