import { getAvailableSlots } from "@/actions/availability.actions";
import BookingCard from "@/components/BookingCard";

export default async function Agenda() {
const result = await getAvailableSlots();

if (!result.success) {
  return (
    <section id="agenda" className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-4xl border border-[#e4d7c7] bg-[#fff7f0] p-10 text-center shadow-[0_24px_70px_-50px_rgba(159,122,89,0.3)]">
        <h2 className="text-3xl font-semibold text-slate-900">
          No hay horarios disponibles
        </h2>
        <p className="mt-4 text-slate-600">
          Pronto habrá nuevos turnos. Volvé más tarde o escribime para
          coordinar una clase privada.
        </p>
      </div>
    </section>
  );
}

  const availabilities = result.data || [];

  return (
    <section id="agenda" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 rounded-4xl bg-[#fff7f0] p-10 shadow-[0_24px_70px_-50px_rgba(159,122,89,0.3)]">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8d7a65]">
            Agenda
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-slate-900">
            Reservá tu próxima clase
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Elegí el mejor momento para tu práctica y accedé a clases que
            te ayudan a descansar, tonificar y conectar.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {availabilities.map((slot: any) => {
            const dateLabel = slot.startAt.toLocaleDateString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
            });

            const timeLabel = `${slot.startAt.toLocaleTimeString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              hour: "2-digit",
              minute: "2-digit",
            })} - ${slot.endAt.toLocaleTimeString("es-AR", {
              timeZone: "America/Argentina/Buenos_Aires",
              hour: "2-digit",
              minute: "2-digit",
            })}`;

            return (
              <BookingCard
                key={slot.id}
                id={slot.id}
                dateLabel={dateLabel}
                timeLabel={timeLabel}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}