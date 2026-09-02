# Chiki.Imports

Tienda online construida con React + Vite. El catálogo de productos y las imágenes se
almacenan en [Supabase](https://supabase.com) (Postgres + Storage), y el acceso al panel
de administración usa Supabase Auth.

## 1) Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta / un nuevo proyecto (es gratis).
2. Cuando el proyecto termine de crearse, andá a **Project Settings > API** y copiá:
   - **Project URL**
   - **anon public key**

## 2) Configurar las variables de entorno

En la raíz del proyecto, copiá `.env.example` a `.env`:

```bash
cp .env.example .env
```

Y completá con los valores que copiaste en el paso anterior:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

`.env` está en `.gitignore`, así que nunca se sube al repositorio.

## 3) Crear la tabla de productos y el bucket de imágenes

1. En el dashboard de Supabase, andá a **SQL Editor > New query**.
2. Pegá y ejecutá todo el contenido del archivo [`supabase/schema.sql`](./supabase/schema.sql) de este repo.
3. Esto crea:
   - La tabla `products` (con `name`, `price`, `discount`, `category`, `image`).
   - Las políticas de seguridad (RLS): cualquiera puede **leer** el catálogo, pero solo un
     usuario autenticado puede **crear/editar/borrar** productos.
   - El bucket público `product-images` en Storage, para las fotos.

## 4) Crear el usuario administrador

El login del panel de admin ahora usa Supabase Auth (email + contraseña) en vez de una
contraseña fija en el código.

1. En el dashboard de Supabase, andá a **Authentication > Users > Add user**.
2. Creá un usuario con tu email y una contraseña segura (marcá "Auto Confirm User" para
   no tener que verificar el email).
3. Usá ese email/contraseña para entrar al panel de admin desde la tienda (ícono de
   candado / botón de admin en el sitio).

## 5) Instalar dependencias y correr el proyecto

```bash
npm install
npm run dev
```

## 6) (Opcional) Migrar los productos que ya tenías

Los 12 productos que estaban hardcodeados en el código quedaron comentados al final de
`supabase/schema.sql`, por si querés cargarlos de una sola vez en vez de recrearlos
manualmente desde el panel. Ojo: esas rutas de imagen (`/images/products/...`) apuntan a
la carpeta `public/` del proyecto, no al bucket de Storage — funcionan igual, pero si
querés que las fotos también vivan en Supabase, subilas al bucket `product-images` y
actualizá esas URLs.

## Notas técnicas

- **Imágenes**: al agregar un producto desde el panel, la foto se sube al bucket
  `product-images` de Supabase Storage y se guarda la URL pública en la tabla `products`.
- **Tiempo real**: el catálogo se actualiza automáticamente en todas las pestañas/dispositivos
  abiertos cuando se agrega o borra un producto (usando Realtime de Supabase).
- **Seguridad**: las políticas RLS de `products` y del bucket exigen una sesión autenticada
  para escribir. Si en el futuro necesitás más de un admin, simplemente creá más usuarios
  desde **Authentication > Users**.
