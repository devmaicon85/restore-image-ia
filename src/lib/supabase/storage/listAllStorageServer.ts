"use_server"

import { SUPABASE_BUCKET } from "@/util/constants";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";


export async function listAllStorageServer(path: string) {


    const supabase = createServerComponentClient({ cookies });


    const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list(path, {
            limit: 10,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
        });



    return { data, error }

}