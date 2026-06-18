# API Backend Documentation

## Availability Actions

### `getAvailableSlots()`

Obtiene todos los horarios disponibles activos sin reserva.

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "cuid-string",
      startAt: Date,
      endAt: Date,
      isActive: true,
      createdAt: Date,
      updatedAt: Date
    }
  ]
}
```

**Usage:**
```typescript
const result = await getAvailableSlots();
if (result.success) {
  // Use result.data
}
```

---

### `createAvailability(data)`

Crea un nuevo horario disponible.

**Parameters:**
```typescript
{
  startAt: Date,  // Debe ser en el futuro
  endAt: Date     // Debe ser después de startAt
}
```

**Response:**
```typescript
{
  success: true,
  data: { /* Availability object */ }
}
// o
{
  success: false,
  error: "Error message"
}
```

---

### `deleteAvailability(id)`

Elimina un horario disponible (solo si no tiene reserva).

---

### `toggleAvailabilityStatus(id)`

Activa/desactiva un horario disponible.

---

## Booking Actions

### `createBooking(data)`

Crea una nueva reserva.

**Parameters:**
```typescript
{
  availabilityId: string,      // ID del horario
  name: string,                // Min 2 caracteres
  email: string,               // Email válido
  phone: string,               // Min 6 caracteres
  comment?: string             // Opcional
}
```

**Validation:**
- Horario debe existir
- Horario no debe tener reserva
- Horario debe estar activo
- Email debe ser válido

**Response:**
```typescript
{
  success: true,
  data: {
    id: string,
    availabilityId: string,
    name: string,
    email: string,
    phone: string,
    comment?: string,
    status: "CONFIRMED",
    createdAt: Date,
    updatedAt: Date
  }
}
```

---

### `getBookings()`

Obtiene todas las reservas con datos del horario.

---

### `updateBookingStatus(id, status)`

Actualiza el estado de una reserva.

**Status values:** `"CONFIRMED"` | `"CANCELLED"` | `"COMPLETED"`

---

### `cancelBooking(id)`

Cancela una reserva.

---

## Error Handling

Todas las responses siguen este patrón:

```typescript
type ApiResponse<T> = {
  success: boolean,
  data?: T,
  error?: string
}
```

**Always check `success` before accessing `data`:**

```typescript
const result = await createBooking(data);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}
```

---

## Ejemplos de uso en componentes

### En un servidor componente

```typescript
import { getAvailableSlots } from "@/actions/availability.actions";

export default async function Agenda() {
  const result = await getAvailableSlots();

  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div>
      {result.data.map(slot => (
        <div key={slot.id}>{slot.startAt.toLocaleString()}</div>
      ))}
    </div>
  );
}
```

### En un cliente componente (form)

```typescript
"use client";
import { createBooking } from "@/actions/booking.actions";
import { useState } from "react";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await createBooking({
      availabilityId: formData.get("availabilityId") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    });

    if (result.success) {
      console.log("Reserva creada:", result.data);
    } else {
      console.error("Error:", result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit(new FormData(e.currentTarget));
    }}>
      {/* form fields */}
    </form>
  );
}
```

---

## Production Checklist

- [x] Validación con Zod
- [x] Error handling robusto
- [x] Logging con contexto
- [x] Prisma con pool de conexiones
- [x] Índices en base de datos
- [x] Soft delete con cascada en relaciones
- [ ] Rate limiting (considerar para futuro)
- [ ] Autenticación (próxima fase)
- [ ] Notificaciones por email (próxima fase)
