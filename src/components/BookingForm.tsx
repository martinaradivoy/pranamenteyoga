"use client";


type BookingFormProps = {
  availabilityId: string;
};


export default function BookingForm({
  availabilityId,
}: BookingFormProps) {

  return (
    <div className="mt-6 space-y-5 rounded-[1.75rem] border border-[#e4d7c7] bg-[#fbf4ed] p-6 shadow-[0_20px_60px_-40px_rgba(159,122,89,0.45)]">

      <p className="text-sm text-slate-600">
        Reservando horario:
        <br />
        <span className="font-semibold text-slate-900">{availabilityId}</span>
      </p>


      <input
        placeholder="Nombre"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <input
        placeholder="Email"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <input
        placeholder="Teléfono"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <textarea
        placeholder="Comentario opcional"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <button
        className="w-full rounded-full bg-[#9f7a59] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#9f7a59]/20 transition hover:bg-[#8d664d]"
      >
        Confirmar reserva
      </button>

    </div>
  );
}