import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 rounded-4xl bg-[#fff7f0] p-10 shadow-[0_20px_60px_-40px_rgba(159,122,89,0.5)] md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="mb-6 text-4xl font-semibold text-slate-900">
            Sobre mí
          </h2>

          <p className="max-w-xl text-slate-600 leading-8">
            Soy profesora de yoga con una mirada cercana, uniendo respiración,
            movimiento y presencia. Mis clases están pensadas para que te sientas
            cómodo, conectado y renovado.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Clases adaptadas a tu ritmo",
              "Acompañamiento desde la escucha",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-[#e4d7c7] bg-white/90 p-5"
              >
                <p className="font-medium text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative h-full min-h-88 w-full overflow-hidden rounded-4xl bg-[#f5e7db]">
            <Image
              src="/images/about.jpeg"
              alt="Profesora de yoga"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}