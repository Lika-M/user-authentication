import './globals.css';

export const metadata = {
  title: 'User Auth',
  description: 'Next.js Authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
