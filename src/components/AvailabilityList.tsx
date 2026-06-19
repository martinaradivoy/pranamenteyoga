import { getAllAvailabilities } from "@/actions/availability.actions";

export default async function AvailabilityList() {
  const result = await getAllAvailabilities();

  if (!result.success || !result.data?.length) {
    return (
      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        No hay horarios creados.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result.data.map((slot) => {
        const status = slot.booking
          ? "RESERVADO"
          : slot.isActive
          ? "ACTIVO"
          : "INACTIVO";

        return (
          <div
            key={slot.id}
            className="rounded-3xl border border-[#e4d7c7] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {slot.startAt.toLocaleDateString("es-AR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "America/Argentina/Buenos_Aires",
                  })}
                </p>

                <p className="mt-2 text-slate-600">
                  {slot.startAt.toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Argentina/Buenos_Aires",
                  })}
                  {" - "}
                  {slot.endAt.toLocaleTimeString("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: "America/Argentina/Buenos_Aires",
                  })}
                </p>
              </div>

              <div>
                {status === "ACTIVO" && (
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Activo
                  </span>
                )}

                {status === "INACTIVO" && (
                  <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    Inactivo
                  </span>
                )}

                {status === "RESERVADO" && (
                  <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                    Reservado
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}