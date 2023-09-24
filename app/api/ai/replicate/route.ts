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


    const endPointFinishUrl = (await startRestoreResponse.json()).urls.get;


    while (true) {
        console.log('Pooling imagem from replicate...')
        await new Promise(resolve => setTimeout(resolve, 10000))

        const finishResponse = await fetch(endPointFinishUrl, { headers });

        const response = await finishResponse.json();

        if (response.status === 'succeeded') {
            const restoredImage = response.output;
            return NextResponse.json({ data: restoredImage }, { status: 200 })
        }

        if (response.status === 'failed') {
            const error = response.error;
            return NextResponse.json({ error }, { status: 401 })
        }
    }

} 