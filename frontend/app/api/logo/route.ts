import { NextRequest, NextResponse } from 'next/server';

// Cache headers — logos rarely change, cache for 7 days
const CACHE_SECONDS = 60 * 60 * 24 * 7;

async function tryFetch(url: string): Promise<Response | null> {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; EliteAbroadCounselling/1.0)',
            },
            signal: AbortSignal.timeout(5000),
        });
        if (!res.ok) return null;
        const ct = res.headers.get('content-type') || '';
        // Reject HTML pages (404 error pages served as HTML)
        if (ct.includes('text/html')) return null;
        // Reject tiny files (less than 200 bytes = probably an error)
        const buf = await res.arrayBuffer();
        if (buf.byteLength < 200) return null;
        // Re-wrap with buffered body
        return new Response(buf, {
            headers: { 'content-type': ct },
        });
    } catch {
        return null;
    }
}

export async function GET(req: NextRequest) {
    const domain = req.nextUrl.searchParams.get('domain');
    if (!domain) {
        return NextResponse.json({ error: 'domain required' }, { status: 400 });
    }

    // Whitelist: only allow edu/ac domains to prevent abuse
    const clean = domain.replace(/[^a-zA-Z0-9.\-]/g, '');

    // Priority list of logo sources
    const sources = [
        `https://logo.clearbit.com/${clean}`,
        `https://www.google.com/s2/favicons?sz=128&domain_url=https://${clean}`,
    ];

    for (const url of sources) {
        const res = await tryFetch(url);
        if (res) {
            const buf = await res.arrayBuffer();
            const ct = res.headers.get('content-type') || 'image/png';
            return new NextResponse(buf, {
                headers: {
                    'Content-Type': ct,
                    'Cache-Control': `public, max-age=${CACHE_SECONDS}, stale-while-revalidate=86400`,
                    'Access-Control-Allow-Origin': '*',
                },
            });
        }
    }

    // Nothing worked — return 404
    return NextResponse.json({ error: 'logo not found' }, { status: 404 });
}
