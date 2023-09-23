import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {


    const res = NextResponse.next()

    try {
        const supabase = createMiddlewareClient({ req, res })

        const { data, error } = await supabase.auth.getSession()
        console.log("🚀 ~ file: middleware.ts:15 ~ middleware ~ data:", data.session?.user.id)

    } catch (error) {
        console.log("🚀 ~ file: middleware.ts:17 ~ middleware ~ error:", error)
    }


    return res;
}