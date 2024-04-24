// pages/api/ocr.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (!req.body) {
        return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const image = body.image;

        const visionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        const requestBody = {
            requests: [
                {
                    image: {
                        content: image
                    },
                    features: [
                        {
                            type: "TEXT_DETECTION"
                        }
                    ]
                }
            ]
        };

        const response = await fetch(visionApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (response.ok) {
            const text = data.responses[0].textAnnotations?.[0]?.description || '';
            return NextResponse.json({ text });
        } else {
            throw new Error(data.error.message);
        }
    } catch (error:any) {
        console.error('Failed to analyze image:', error);
        return NextResponse.json({ error: 'Failed to process image', details: error.message }, { status: 500 });
    }
}

// Optionally, handle other HTTP methods
export function options(req: NextRequest) {
    return new NextResponse(null, { status: 204 }); // No content for OPTIONS preflight requests
}
