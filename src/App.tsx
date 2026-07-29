'use client';

import Navbar from './components/navbar/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900">
      <Navbar />
      <main className="min-h-[calc(100vh-96px)]" aria-label="Main content" />
    </div>
  );
}
