import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Supabase Events Demo',
  description: 'Simple Next.js + Supabase RSVP app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-rose-50 text-gray-900 flex flex-col">
        {/* Navbar */}
        <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition">
              Supabase Events
            </a>
            <nav className="space-x-4 text-sm">
              <a href="/events" className="hover:text-indigo-600">Events</a>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white/70 py-3 text-sm text-center text-gray-600">
          Built with ❤️ Next.js + Supabase
        </footer>
      </body>
    </html>
  );
}
