import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
export async function GET(request: NextRequest) {

    const requestUrl = new URL(request.url);

    const code = requestUrl.searchParams.get('code');

    try {
        if (code) {
            const supabase = createRouteHandlerClient({ cookies })
            const data = await supabase.auth.exchangeCodeForSession(code);
        }

    } catch (error) {
        console.log("🚀 ~ file: Auth_Callback line:17 ~ GET ~ error:", error)

    }

    return NextResponse.redirect(requestUrl.origin);
}