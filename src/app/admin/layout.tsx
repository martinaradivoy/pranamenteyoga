import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <nav className="border-b border-[#e4d7c7] bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <h1 className="text-lg font-semibold tracking-[0.2em] text-slate-900">
          PranaMente Yoga
        </h1>

          <div className="flex gap-6">
            <Link
              href="/admin"
              className="font-medium text-slate-700 transition hover:text-[#9f7a59]"
            >
              Horarios
            </Link>

            <Link
              href="/admin/bookings"
              className="font-medium text-slate-700 transition hover:text-[#9f7a59]"
            >
              Reservas
            </Link>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}