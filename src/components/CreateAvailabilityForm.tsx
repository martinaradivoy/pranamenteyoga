"use client";

import { useState, useTransition } from "react";
import { createAvailability } from "@/actions/availability.actions";


export default function CreateAvailabilityForm() {

  const [message, setMessage] = useState("");

  const [isPending, startTransition] = useTransition();


  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();


    const formData = new FormData(e.currentTarget);


    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;


    const startAt = new Date(
      `${date}T${startTime}:00`
    );


    const endAt = new Date(
      `${date}T${endTime}:00`
    );


    startTransition(async () => {

      const result = await createAvailability({
        startAt,
        endAt,
      });


      if (result.success) {
        setMessage("Horario creado correctamente ✅");
      } else {
        setMessage(result.error ?? "Ocurrió un error");
      }

    });
  }


  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 rounded-[1.75rem] border border-[#e4d7c7] bg-[#faf1e9] p-8 shadow-[0_24px_70px_-50px_rgba(159,122,89,0.45)]"
    >

      <input
        name="date"
        type="date"
        required
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <input
        name="startTime"
        type="time"
        required
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <input
        name="endTime"
        type="time"
        required
        className="w-full rounded-3xl border border-[#d8c5b1] bg-white/90 px-4 py-3 text-slate-800 shadow-sm outline-none transition focus:border-[#9f7a59] focus:ring-2 focus:ring-[#9f7a59]/20"
      />


      <button
        disabled={isPending}
        className="inline-flex w-full justify-center rounded-full bg-[#9f7a59] px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-[#9f7a59]/20 transition hover:bg-[#8d664d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? "Creando..."
          : "Crear horario"}
      </button>


      {message && (
        <p className="text-sm text-slate-700">
          {message}
        </p>
      )}

    </form>
  );
}