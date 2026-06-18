export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/60 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold tracking-[0.2em] text-slate-900">
          PranaMente Yoga
        </h1>

        <nav className="hidden items-center gap-8 md:flex text-sm text-slate-700">
          <a href="#about" className="transition hover:text-slate-900">
            Sobre mí
          </a>
          <a href="#services" className="transition hover:text-slate-900">
            Servicios
          </a>
          <a
             href="#agenda"
             className="rounded-full bg-[#9f7a59] px-5 py-2 text-white shadow-sm shadow-[#9f7a59]/20 transition hover:bg-[#8d664d]"
          >
            Agendá tu clase
          </a>
        </nav>
      </div>
    </header>
  );
}