"use server";

import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const bookingSchema = z.object({
  availabilityId: z.string().min(1, "ID de disponibilidad requerido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(6, "Teléfono inválido"),
  comment: z.string().optional(),
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
        .map((issue: any) => `${issue.path.join(".")}: ${issue.message}`)
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

    if (availability.booking) {
      return errorResponse("Este horario ya fue reservado");
    }

    if (!availability.isActive) {
      return errorResponse("Este horario no está disponible");
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
  } catch (error) {
    console.error("[createBooking]", error);
    return errorResponse("No se pudo crear la reserva");
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
