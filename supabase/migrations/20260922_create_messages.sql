-- Create the messages table
CREATE TABLE IF NOT EXISTS public.messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert messages
CREATE POLICY "Allow anonymous users to insert messages"
ON public.messages
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read and update messages (for the admin dashboard)
CREATE POLICY "Allow authenticated users to read messages"
ON public.messages
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to update messages"
ON public.messages
FOR UPDATE
TO authenticated
USING (true);
