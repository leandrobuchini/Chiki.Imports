-- =========================================================
-- Chiki.Imports — Esquema de base de datos para Supabase
-- Ejecutar este script completo en: Supabase Dashboard > SQL Editor > New query
-- =========================================================

-- 1) Tabla de productos
create table if not exists public.products (
    id bigint generated always as identity primary key,
    name text not null,
    price numeric(10, 2) not null default 0,
    discount numeric(5, 2) not null default 0,
    category text not null default 'Camisetas',
    image text not null,
    sizes text[] not null default '{}',
    created_at timestamptz not null default now()
);

-- Índice útil para filtrar/ordenar por categoría o fecha
create index if not exists products_category_idx on public.products (category);
create index if not exists products_created_at_idx on public.products (created_at desc);

-- 2) Row Level Security
alter table public.products enable row level security;

-- Cualquiera puede LEER el catálogo (la tienda es pública)
drop policy if exists "Productos: lectura pública" on public.products;
create policy "Productos: lectura pública"
    on public.products
    for select
    to anon, authenticated
    using (true);

-- Solo usuarios autenticados pueden crear/editar/borrar productos
-- (usá esto si migrás el login del admin a Supabase Auth)
drop policy if exists "Productos: escritura autenticada" on public.products;
create policy "Productos: escritura autenticada"
    on public.products
    for all
    to authenticated
    using (true)
    with check (true);

-- =========================================================
-- 3) Storage: bucket público para las imágenes de productos
-- =========================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Lectura pública de las imágenes
drop policy if exists "Imágenes de productos: lectura pública" on storage.objects;
create policy "Imágenes de productos: lectura pública"
    on storage.objects
    for select
    to anon, authenticated
    using (bucket_id = 'product-images');

-- Solo usuarios autenticados pueden subir/borrar imágenes
drop policy if exists "Imágenes de productos: escritura autenticada" on storage.objects;
create policy "Imágenes de productos: escritura autenticada"
    on storage.objects
    for all
    to authenticated
    using (bucket_id = 'product-images')
    with check (bucket_id = 'product-images');

-- =========================================================
-- 4) (Opcional) Cargar los productos que ya tenías hardcodeados
-- Podés borrar este bloque si preferís cargar todo de cero desde el panel de admin.
-- Nota: las imágenes acá apuntan a /images/products/... (las de la carpeta public/
-- del proyecto). Si preferís, subilas al bucket 'product-images' y actualizá las URLs.
-- =========================================================
-- insert into public.products (name, price, discount, category, image) values
--   ('Argentina Local 2026 + Parche + Messi 10', 60000, 0, 'Camisetas', '/images/products/ec62b6d4.jpg'),
--   ('Argentina Edicion Aniversario', 50000, 0, 'Camisetas', '/images/products/ebef86d9.jpg'),
--   ('Atletico Madrid 25-26 + Parche + Julian Alvarez N°19', 60000, 0, 'Camisetas', '/images/products/AtleticoMadrid.jpg'),
--   ('Inter Miami 25 - 26 + Parche + Messi N°10', 55000, 0, 'Camisetas', '/images/products/InterMiami.jpg'),
--   ('Roma Alternativa 25-26', 50000, 0, 'Camisetas', '/images/products/RomaAlternativa.jpeg'),
--   ('Adidas Oasis Black', 53500, 0, 'Camisetas', '/images/products/oasisBlack.jpeg'),
--   ('Barcelona Local 25 - 26 + Parche', 53500, 0, 'Camisetas', '/images/products/Barcelona.jpg'),
--   ('Liverpool 25 - 26 Alexis Mac Allister N°10', 60000, 0, 'Camisetas', '/images/products/liverpoolBlanca.jpg'),
--   ('Liverpool 25 - 26 Short Jugador', 50000, 0, 'Shorts', '/images/products/shortLiverpool.jpeg'),
--   ('Argentina 25 - 26 Short Jugador', 50000, 0, 'Shorts', '/images/products/shortArg.jpeg'),
--   ('Short Sorpresa', 55000, 0, 'Shorts', '/images/products/images.jpeg'),
--   ('Camiseta Sorpresa', 60000, 0, 'Camisetas', '/images/products/regalo-sorpresa.jpg');
