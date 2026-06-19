import { prisma } from "@/lib/prisma";

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      availability: true,
    },
  });

  return (
    <main className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-4xl bg-[#fff7f0] p-10 shadow-[0_24px_70px_-50px_rgba(159,122,89,0.3)]">
          <h1 className="text-4xl font-semibold text-slate-900">
            Reservas
          </h1>

          <p className="mt-3 text-slate-600">
            Administración de alumnos y clases reservadas.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              No hay reservas todavía.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-3xl border border-[#e4d7c7] bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      {booking.name}
                    </h2>

                    <p className="mt-2 text-slate-600">
                      {booking.email}
                    </p>

                    <p className="text-slate-600">
                      {booking.phone}
                    </p>
                  </div>

                  <div>
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                      {booking.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9f7a59]">
                      Fecha
                    </p>

                    <p className="mt-1 font-medium">
                      {booking.availability.startAt.toLocaleDateString(
                        "es-AR",
                        {
                          timeZone:
                            "America/Argentina/Buenos_Aires",
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9f7a59]">
                      Horario
                    </p>

                    <p className="mt-1 font-medium">
                      {booking.availability.startAt.toLocaleTimeString(
                        "es-AR",
                        {
                          timeZone:
                            "America/Argentina/Buenos_Aires",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                      {" - "}
                      {booking.availability.endAt.toLocaleTimeString(
                        "es-AR",
                        {
                          timeZone:
                            "America/Argentina/Buenos_Aires",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {booking.comment && (
                  <div className="mt-6 rounded-2xl bg-[#faf7f2] p-4">
                    <p className="text-sm text-slate-600">
                      {booking.comment}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}