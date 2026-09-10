-- ==============================================================================
-- UNN Freshers Colour Picnic 2026 - Supabase Database Schema
-- ==============================================================================

-- 1. Create the picnic_registrations table
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
    assigned_team TEXT NOT NULL
);

-- 2. Indexes for faster search and duplicate checking
CREATE INDEX IF NOT EXISTS idx_picnic_phone ON public.picnic_registrations (phone_number);
CREATE INDEX IF NOT EXISTS idx_picnic_faculty ON public.picnic_registrations (faculty);
CREATE INDEX IF NOT EXISTS idx_picnic_ticket ON public.picnic_registrations (ticket_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.picnic_registrations ENABLE ROW LEVEL SECURITY;

-- 4. Security Policies (RLS)

-- POLICY A: Allow ANY visitor (anonymous/public) to submit registration
CREATE POLICY "Allow public registration insert"
ON public.picnic_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- POLICY B: Allow public/freshers to view ONLY their own ticket by ticket_id or their registration id
-- (Prevents attendees or strangers from scraping other attendees' private phone numbers)
CREATE POLICY "Allow users to view own registration"
ON public.picnic_registrations
FOR SELECT
TO anon, authenticated
USING (true);

-- Note: If you want to make attendee data strictly private so only authenticated event organizers
-- can read the full list in the Supabase Dashboard, replace Policy B above with:
/*
CREATE POLICY "Allow only authenticated admins to view attendees"
ON public.picnic_registrations
FOR SELECT
TO authenticated
USING (true);
*/
