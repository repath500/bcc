import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Inspect Clone',
  description: 'Sandbox-based coding agent UI'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
