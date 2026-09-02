-- Migración: agregar talles disponibles a productos ya existentes
-- Ejecutar en Supabase Dashboard > SQL Editor > New query

alter table public.products
    add column if not exists sizes text[] not null default '{}';
