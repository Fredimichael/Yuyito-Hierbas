import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase no está configurado en las variables de entorno",
      },
      { status: 500 }
    );
  }

  try {
    const supabase = createClient(url, anonKey);

    // Consulta ultraliviana para registrar actividad y mantener la base de datos despierta
    const { data, error } = await supabase
      .from("categories")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "ok",
      database: "active",
      message: "Base de datos Supabase verificada y mantenida activa con éxito",
      timestamp: new Date().toISOString(),
      record_found: Boolean(data && data.length > 0),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message: err?.message || "Error inesperado al conectar a Supabase",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
