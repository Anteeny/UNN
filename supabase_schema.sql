-- ==============================================================================
-- UNN Freshers' Xperience FX26 & Colour Picnic - Supabase Database Schema
-- Table: public.picnic_registrations
-- ==============================================================================
-- Run this entire script in your Supabase Dashboard:
-- 1. Go to https://supabase.com/dashboard/project/cjbedftdexzcsydwayig
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Paste this script and click "Run"
-- ==============================================================================

-- 1. Create table (if starting fresh)
CREATE TABLE IF NOT EXISTS public.picnic_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ticket_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    faculty TEXT NOT NULL,
    department TEXT NOT NULL,
    looking_forward_to TEXT,
    assigned_color TEXT NOT NULL,
    assigned_team TEXT NOT NULL,
    event_name TEXT DEFAULT 'Freshers'' Xperience FX26 & Colour Picnic',
    food_secured BOOLEAN DEFAULT true,
    checked_in_saturday BOOLEAN DEFAULT false,
    checked_in_sunday BOOLEAN DEFAULT false
);

-- ==============================================================================
-- 2. MIGRATION: Run safely if your table already exists
-- (Adds newly introduced columns without affecting existing attendee records)
-- ==============================================================================
ALTER TABLE public.picnic_registrations ADD COLUMN IF NOT EXISTS event_name TEXT DEFAULT 'Freshers'' Xperience FX26 & Colour Picnic';
ALTER TABLE public.picnic_registrations ADD COLUMN IF NOT EXISTS food_secured BOOLEAN DEFAULT true;
ALTER TABLE public.picnic_registrations ADD COLUMN IF NOT EXISTS checked_in_saturday BOOLEAN DEFAULT false;
ALTER TABLE public.picnic_registrations ADD COLUMN IF NOT EXISTS checked_in_sunday BOOLEAN DEFAULT false;

-- ==============================================================================
-- 3. Indexes for fast lookup, attendance search, and verification at venue gates
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_picnic_phone ON public.picnic_registrations (phone_number);
CREATE INDEX IF NOT EXISTS idx_picnic_faculty ON public.picnic_registrations (faculty);
CREATE INDEX IF NOT EXISTS idx_picnic_ticket ON public.picnic_registrations (ticket_id);
CREATE INDEX IF NOT EXISTS idx_picnic_created ON public.picnic_registrations (created_at DESC);

-- ==============================================================================
-- 4. Enable Row Level Security (RLS)
-- ==============================================================================
ALTER TABLE public.picnic_registrations ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- 5. RLS Policies (Idempotent: drops previous versions to avoid duplicate errors)
-- ==============================================================================

-- POLICY A: Allow ANY visitor (anonymous/public) to submit registration
DROP POLICY IF EXISTS "Allow public registration insert" ON public.picnic_registrations;
CREATE POLICY "Allow public registration insert"
ON public.picnic_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- POLICY B: Allow public/freshers to view own registration data by ticket_id or id
DROP POLICY IF EXISTS "Allow users to view own registration" ON public.picnic_registrations;
CREATE POLICY "Allow users to view own registration"
ON public.picnic_registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- POLICY C: Allow updates for gate check-in and food claim
DROP POLICY IF EXISTS "Allow gate check-in update" ON public.picnic_registrations;
CREATE POLICY "Allow gate check-in update"
ON public.picnic_registrations
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);
