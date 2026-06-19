"use server";

import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const bookingSchema = z.object({
  availabilityId: z.string().min(1, "ID de disponibilidad requerido"),

  name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "Nombre demasiado largo"),

  email: z
    .string()
    .trim()
    .email("Email inválido")
    .max(255, "Email demasiado largo"),

  phone: z
    .string()
    .trim()
    .min(6, "Teléfono inválido")
    .max(30, "Teléfono demasiado largo"),

  comment: z
    .string()
    .trim()
    .max(1000, "Comentario demasiado largo")
    .optional(),
});

export async function createBooking(data: {
  availabilityId: string;
  name: string;
  email: string;
  phone: string;
  comment?: string;
}) {
  const validation = bookingSchema.safeParse(data);

  if (!validation.success) {
    return errorResponse(
      validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")
    );
  }

  try {
    const availability = await prisma.availability.findUnique({
      where: {
        id: validation.data.availabilityId,
      },
      include: {
        booking: true,
      },
    });

    if (!availability) {
      return errorResponse("Horario no encontrado");
    }

    if (availability.startAt < new Date()) {
      return errorResponse("Este horario ya no está disponible");
    }

    if (!availability.isActive) {
      return errorResponse("Este horario no está disponible");
    }

    if (availability.booking) {
      return errorResponse("Este horario ya fue reservado");
    }

    const booking = await prisma.booking.create({
      data: {
        availabilityId: validation.data.availabilityId,
        name: validation.data.name,
        email: validation.data.email,
        phone: validation.data.phone,
        comment: validation.data.comment,
      },
    });

    return successResponse(booking);
  } catch (error: any) {
    console.error("[createBooking]", error);

    if (error?.code === "P2002") {
      return errorResponse(
        "Este horario acaba de ser reservado por otra persona"
      );
    }

    return errorResponse(
      "No se pudo crear la reserva. Intentá nuevamente."
    );
  }
}

export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        availability: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(bookings);
  } catch (error) {
    console.error("[getBookings]", error);
    return errorResponse("Error obteniendo reservas");
  }
}

export async function updateBookingStatus(
  id: string,
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return errorResponse("Reserva no encontrada");
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return successResponse(updated);
  } catch (error) {
    console.error("[updateBookingStatus]", error);
    return errorResponse("Error actualizando reserva");
  }
}

export async function cancelBooking(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return errorResponse("Reserva no encontrada");
    }

    if (booking.status === "CANCELLED") {
      return errorResponse("La reserva ya fue cancelada");
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return successResponse(updated);
  } catch (error) {
    console.error("[cancelBooking]", error);
    return errorResponse("Error cancelando reserva");
  }
}