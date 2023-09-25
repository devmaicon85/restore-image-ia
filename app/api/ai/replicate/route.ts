import { NextRequest, NextResponse } from "next/server";

import { cookies } from 'next/headers'
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
interface NextRequestWithImage extends NextRequest {
    imageUrl: string
}

const TOKEN = process.env.REPLICATE_API_TOKEN

const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Token ${TOKEN}`,
}

const version = "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3"

export async function POST(req: NextRequestWithImage) {


    const { imageUrl } = await req.json()

    const supabase = createRouteHandlerClient({ cookies })
    const { data: { session }, error } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ error: 'Not authorizated' }, { status: 401 })
    }

    if (error) {
        return NextResponse.json({ error }, { status: 401 })
    }

    const startRestoreResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST", headers,
        body: JSON.stringify({
            version,
            input: {
                img: imageUrl,
                scale: 2
            }
        }),
    })
    console.log("🚀 ~ file: route.ts:44 ~ POST ~ startRestoreResponse:", startRestoreResponse)

    if (!startRestoreResponse.ok) {

        return NextResponse.json({
            error: startRestoreResponse.statusText
        }, { status: 401 })
    }


    const endPointFinishUrl = (await startRestoreResponse.json()).urls.get;

    return NextResponse.json({ data: endPointFinishUrl }, { status: 200 })

}


export async function PUT(req: NextRequestWithImage) {


    const { urlEndPoint } = await req.json()

    try {
        const finishResponse = await fetch(urlEndPoint, { headers, method: "GET" });
        const response = await finishResponse.json();

        const status = response.status;

        if (status === 'succeeded') {
            const restoredImage: string = response.output;
            const status = response.status;
            return NextResponse.json({ data: restoredImage, status, error: null }, { status: 200 })
        }


        return NextResponse.json({ data: null, status, error: response.error }, { status: 500 })



    } catch (error: any) {
        return NextResponse.json({ data: null, status: "error", error: error.message }, { status: 500 })

    }

}