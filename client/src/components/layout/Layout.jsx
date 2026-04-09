import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}