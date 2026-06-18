export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-4xl font-semibold text-slate-900">
          Servicios
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Clases Online",
              description: "Prácticas diseñadas para tu casa, con secuencias claras y alineadas a tu cuerpo.",
            },
            {
              title: "Acompañamiento Personalizado",
              description: "Un espacio seguro para avanzar en tu práctica con atención personalizada.",
            },
            {
              title: "Bienestar Integral",
              description: "Respiración, movilidad y calma para mejorar tu energía y descanso.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-4xl border border-[#e4d7c7] bg-white p-8 shadow-[0_20px_60px_-45px_rgba(159,122,89,0.35)]"
            >
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}