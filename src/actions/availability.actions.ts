"use server";

import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api";
import { z } from "zod";

const availabilitySchema = z.object({
  startAt: z.date().refine((date) => date > new Date(), {
    message: "La fecha debe ser en el futuro",
  }),
  endAt: z.date(),
}).refine((data) => data.endAt > data.startAt, {
  message: "La fecha final debe ser después de la fecha inicial",
  path: ["endAt"],
});

export async function createAvailability(data: {
  startAt: Date;
  endAt: Date;
}) {
  const validation = availabilitySchema.safeParse(data);

  if (!validation.success) {
    return errorResponse(
      validation.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ")
    );
  }

  try {
    const availability = await prisma.availability.create({
      data: {
        startAt: validation.data.startAt,
        endAt: validation.data.endAt,
      },
    });

    return successResponse(availability);
  } catch (error) {
    console.error("[createAvailability]", error);
    return errorResponse("Error creando disponibilidad");
  }
}

export async function getAvailableSlots() {
  try {
    const slots = await prisma.availability.findMany({
      where: {
        isActive: true,
        booking: null,
      },
      orderBy: {
        startAt: "asc",
      },
    });

    return successResponse(slots);
  } catch (error) {
    console.error("[getAvailableSlots]", error);
    return errorResponse("Error obteniendo disponibilidades");
  }
}

export async function deleteAvailability(id: string) {
  try {
    const availability = await prisma.availability.findUnique({
      where: { id },
      include: { booking: true },
    });

    if (!availability) {
      return errorResponse("Disponibilidad no encontrada");
    }

    if (availability.booking) {
      return errorResponse("No se puede eliminar un horario con reserva");
    }

    await prisma.availability.delete({
      where: { id },
    });

    return successResponse({ id });
  } catch (error) {
    console.error("[deleteAvailability]", error);
    return errorResponse("Error eliminando disponibilidad");
  }
}

export async function toggleAvailabilityStatus(id: string) {
  try {
    const availability = await prisma.availability.findUnique({
      where: { id },
    });

    if (!availability) {
      return errorResponse("Disponibilidad no encontrada");
    }

    const updated = await prisma.availability.update({
      where: { id },
      data: { isActive: !availability.isActive },
    });

    return successResponse(updated);
  } catch (error) {
    console.error("[toggleAvailabilityStatus]", error);
    return errorResponse("Error actualizando disponibilidad");
  }
}

export async function getAllAvailabilities() {
  try {
    const availabilities = await prisma.availability.findMany({
      include: {
        booking: true,
      },
      orderBy: {
        startAt: "asc",
      },
    });

    console.log(
      "AVAILABILITIES:",
      JSON.stringify(availabilities, null, 2)
    );

    return successResponse(availabilities);

  } catch (error) {
    console.error("[getAllAvailabilities]", error);
    return errorResponse("Error obteniendo disponibilidades");
  }
}

