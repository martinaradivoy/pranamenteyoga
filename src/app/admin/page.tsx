import CreateAvailabilityForm from "@/components/CreateAvailabilityForm";

export default function AdminPage() {
  return (
    <main className="min-h-screen px-6 py-24">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          Panel Administrativo
        </h1>


        <p className="mt-4 text-gray-600">
          Gestión de disponibilidades y reservas.
        </p>


        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border p-6">

            <h2 className="text-xl font-semibold">  
              Crear disponibilidad
            </h2>

           <p className="mt-2 text-sm text-gray-600">
            Agregar nuevos horarios disponibles.
           </p>

           <CreateAvailabilityForm />

          </div>


          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              Reservas
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Consultar reservas realizadas.
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}