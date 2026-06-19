import CreateAvailabilityForm from "@/components/CreateAvailabilityForm";
import AvailabilityList from "@/components/AvailabilityList";

export default function AdminPage() {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-4xl bg-[#fff7f0] p-10 shadow-[0_24px_70px_-50px_rgba(159,122,89,0.3)]">
          <h1 className="text-4xl font-semibold text-slate-900">
            Panel Administrativo
          </h1>

          <p className="mt-3 text-slate-600">
            Gestioná disponibilidades y reservas de clases.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wider text-[#9f7a59]">
              Estado
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Activo
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wider text-[#9f7a59]">
              Sistema
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Online
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-wider text-[#9f7a59]">
              Reservas
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Gestionadas
            </h3>
          </div>
        </div>

        <div className="rounded-4xl border border-[#e4d7c7] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Crear disponibilidad
          </h2>

          <p className="mt-2 text-slate-600">
            Agregá nuevos horarios para que los alumnos puedan reservar.
          </p>

          <div className="mt-8">
            <CreateAvailabilityForm />
          </div>
        </div>

         <div className="mt-10 rounded-4xl border border-[#e4d7c7] bg-white p-8 shadow-sm">
             <h2 className="text-2xl font-semibold text-slate-900">
              Horarios creados
             </h2>
    
              <p className="mt-2 text-slate-600">
               Todos los horarios registrados en el sistema.
              </p>

             <div className="mt-8">
               <AvailabilityList />
             </div>
         </div>

      </div>
    </main>
  );
}