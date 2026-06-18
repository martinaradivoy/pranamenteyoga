export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(159,122,89,0.18),transparent_35%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#8d7a65]">
          Yoga Online
        </p>

        <h1 className="text-5xl font-semibold leading-tight text-slate-900 md:text-7xl">
          Encuentra equilibrio, calma y bienestar.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Clases online con una propuesta consciente, adaptadas a tu nivel,
          tu cuerpo y tus horarios.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#agenda"
            className="inline-flex rounded-full bg-[#9f7a59] px-8 py-4 text-white shadow-lg shadow-[#9f7a59]/20 transition hover:bg-[#8d664d] hover:-translate-y-0.5"
          >
            Reservá tu clase
          </a>
          <a
            href="#about"
            className="inline-flex rounded-full border border-[#9f7a59] bg-white px-8 py-4 text-[#9f7a59] transition hover:bg-[#fff3ea]"
          >
            Conocé a la profe
          </a>
        </div>
      </div>
    </section>
  );
}