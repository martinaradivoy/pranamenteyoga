# Guía de Deployment en Vercel

## Pasos previos

### 1. Preparar el proyecto
```bash
npm run build
```

### 2. Configurar variables de entorno en Vercel

Dentro del panel de Vercel, ir a **Settings > Environment Variables** y agregar:

```
DATABASE_URL=postgresql://[usuario]:[contraseña]@[host]:[puerto]/[base_datos]
NODE_ENV=production
```

### 3. Preparar la base de datos

Si usas Vercel Postgres:

```bash
# Crear un proyecto en Vercel Postgres
# Copiar la DATABASE_URL al panel de Vercel
```

### 4. Ejecutar migraciones de Prisma

Antes del primer deploy, ejecutar:

```bash
npx prisma migrate deploy
```

## Deployment automático

1. Conectar el repositorio GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Los builds se ejecutarán automáticamente en cada push a main

## Monitoreo

- Logs: Vercel Dashboard > Deployments > Logs
- Errores: Vercel Dashboard > Monitoring
- Base de datos: Panel de Vercel Postgres

## Consideraciones de producción

✅ **Implementado:**
- Prisma configurado con pool de conexiones
- Validación robusta con Zod
- Error handling mejorado
- Índices en base de datos
- next.config optimizado
- Logging controlado en producción

✅ **Verificar antes de deploy:**
- DATABASE_URL configurada en Vercel
- Migrations ejecutadas
- Build local exitoso: `npm run build`
- Test de API actions

## Rollback

Si hay issues post-deploy:
1. Vercel > Deployments > Seleccionar deployment anterior
2. Click en "Redeploy"

## Soporte

- Documentación Vercel: https://vercel.com/docs
- Documentación Next.js: https://nextjs.org/docs
- Documentación Prisma: https://www.prisma.io/docs
