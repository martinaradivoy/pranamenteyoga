"use client";

import { useState } from "react";
import BookingForm from "@/components/BookingForm";

type BookingCardProps = {
  id: string;
  dateLabel: string;
  timeLabel: string;
};

export default function BookingCard({
  id,
  dateLabel,
  timeLabel,
}: BookingCardProps) {

  const [openForm, setOpenForm] = useState(false);


  return (
    <div className="rounded-4xl border border-[#e4d7c7] bg-white/95 p-6 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.18)]">

      <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9f7a59]">{dateLabel}</p>

      <p className="mt-3 text-xl font-semibold text-slate-900">{timeLabel}</p>


      {!openForm ? (
        <button
          onClick={() => setOpenForm(true)}
          className="mt-6 inline-flex rounded-full bg-[#9f7a59] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#9f7a59]/20 transition hover:bg-[#8d664d]"
        >
          Reservar
        </button>
      ) : (
        <BookingForm availabilityId={id} />
      )}

    </div>
  );
}