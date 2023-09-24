"use server"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



export async function getSessionAuthServer() {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getSession();

    return { data, error }
}
