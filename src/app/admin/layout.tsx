import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>

      <nav className="border-b px-6 py-4">
        <div className="flex gap-6">

          <Link href="/admin">
            Horarios
          </Link>

          <Link href="/admin/bookings">
            Reservas
          </Link>

        </div>
      </nav>


      {children}

    </div>
  );
}