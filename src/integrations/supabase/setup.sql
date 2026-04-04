-- Añadir columna discord_id si no existe
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS discord_id TEXT;

-- Asegurar que las políticas de RLS permitan ver y actualizar este campo
-- (Las políticas existentes en profiles ya cubren SELECT y UPDATE para el dueño del perfil)