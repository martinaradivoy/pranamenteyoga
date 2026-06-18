import { prisma } from "@/lib/prisma";

type BookingWithAvailability = Awaited<ReturnType<typeof prisma.booking.findMany>>[number];

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
    <main className="min-h-screen px-6 py-24">

      <div className="mx-auto max-w-5xl">

        <h1 className="text-4xl font-bold">
          Reservas
        </h1>


        <div className="mt-10 space-y-4">

          {bookings.length === 0 ? (

            <p>
              No hay reservas todavía.
            </p>

          ) : (

            bookings.map((booking: any) => (

              <div
                key={booking.id}
                className="rounded-2xl border p-6"
              >

                <h2 className="text-xl font-semibold">
                  {booking.name}
                </h2>


                <p>
                  Email:
                  {" "}
                  {booking.email}
                </p>


                <p>
                  Teléfono:
                  {" "}
                  {booking.phone}
                </p>


                <p>
                  Fecha:
                  {" "}
                  {booking.availability.startAt.toLocaleDateString(
                    "es-AR",
                    {
                      timeZone:
                        "America/Argentina/Buenos_Aires",
                    }
                  )}
                </p>


                <p>
                  Horario:
                  {" "}
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


                <p>
                  Estado:
                  {" "}
                  {booking.status}
                </p>


              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}