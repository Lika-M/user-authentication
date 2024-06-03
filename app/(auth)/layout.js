import '../globals.css';

export const metadata = {
    title: 'Auth',
    description: 'Authentication',
};

export default function AuthRootLayout({ children }) {
    return (
        <>
            <header id="auth-header">
                <p>Welcome back!</p>
                <form>
                    <button>Logout</button>
                </form>
            </header>
            {children}
        </>
    );
}
