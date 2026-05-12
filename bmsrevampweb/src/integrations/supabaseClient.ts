import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweHNiaHNhbW9yaHZuZmVidm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTIyODQsImV4cCI6MjA2NDQ2ODI4NH0.dQGmD8Zo5-PoJj5INy2xM1eUotayKMiGsf5EEkMrB1U";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
