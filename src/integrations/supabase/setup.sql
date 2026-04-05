-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de Productos (Tools)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    image_url TEXT,
    file_url TEXT,
    downloads INTEGER DEFAULT 0,
    icon_type TEXT DEFAULT 'mail',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Cuentas (Stock)
CREATE TABLE IF NOT EXISTS public.accounts_stock (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_id TEXT NOT NULL, -- dazn, netflix, etc.
    account_data TEXT NOT NULL, -- email:pass
    is_claimed BOOLEAN DEFAULT FALSE,
    claimed_by UUID REFERENCES auth.users(id),
    claimed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla del Vault (Métodos)
CREATE TABLE IF NOT EXISTS public.vault_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'WORKING',
    difficulty INTEGER DEFAULT 1,
    category TEXT DEFAULT 'METHOD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Daily Drops
CREATE TABLE IF NOT EXISTS public.daily_drops (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    account_data TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts_stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_drops ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (Lectura pública, Escritura solo Admin)
-- Nota: El admin se identifica por email en la lógica de la app, 
-- pero aquí definimos políticas básicas.
CREATE POLICY "Public read access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.vault_methods FOR SELECT USING (true);

-- Trigger para actualizar perfiles (Asegurar que el campo role existe)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user';
    END IF;
END $$;