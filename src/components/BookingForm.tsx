"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "@/actions/booking.actions";

type BookingFormProps = {
  availabilityId: string;
};

export default function BookingForm({
  availabilityId,
}: BookingFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleBooking() {
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Ingresá tu nombre");
      return;
    }

    if (!email.trim()) {
      setError("Ingresá tu email");
      return;
    }

    if (!phone.trim()) {
      setError("Ingresá tu teléfono");
      return;
    }

    try {
      setLoading(true);

      const result = await createBooking({
        availabilityId,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        comment: comment.trim(),
      });

      if (!result.success) {
        setError(result.error || "Error al crear la reserva");
        return;
      }

      setSuccess("¡Reserva confirmada!");

      setName("");
      setEmail("");
      setPhone("");
      setComment("");

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6 space-y-5 rounded-[1.75rem] border border-[#e4d7c7] bg-[#fbf4ed] p-6 shadow-[0_20px_60px_-40px_rgba(159,122,89,0.45)]">
      <p className="text-sm text-slate-600">
        Completá tus datos para reservar este horario.
      </p>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Teléfono"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentario opcional"
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />

      <button
        onClick={handleBooking}
        disabled={loading}
        className="w-full rounded-full bg-[#9f7a59] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#9f7a59]/20 transition hover:bg-[#8d664d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Reservando..." : "Confirmar reserva"}
      </button>
    </div>
  );
}