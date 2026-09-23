-- Drop the trigger on public.messages
DROP TRIGGER IF EXISTS contact_form_email_trigger ON public.messages;

-- Drop the function
DROP FUNCTION IF EXISTS public.notify_contact_form();

-- Note: In Supabase, Database Webhooks are implemented via triggers and functions using pg_net.
-- Dropping the trigger and function effectively removes the webhook connection.
