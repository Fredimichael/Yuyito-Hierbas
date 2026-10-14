import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || "";

// Validar que la URL sea realmente una URL HTTP o HTTPS válida
function isValidHttpUrl(string: string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  isValidHttpUrl(supabaseUrl) &&
  !supabaseUrl.includes("tu-proyecto") &&
  !supabaseUrl.includes("placeholder")
);

function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn("Error inicializando cliente de Supabase:", err);
    return null;
  }
}

// Cliente de Supabase seguro para el frontend
export const supabase = getSupabaseClient();
