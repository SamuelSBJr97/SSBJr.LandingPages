export async function POST(request) {
  try {
    const body = await request.json();
    // Expected body: { analytics: boolean, marketing: boolean, functional: boolean }
    const cookieValue = encodeURIComponent(JSON.stringify({ ...body, timestamp: new Date().toISOString() }));

    // Set secure cookie (note: Secure requires HTTPS in production)
    const headers = new Headers();
    headers.append('Set-Cookie', `ssbjr_cookie_consent=${cookieValue}; Path=/; Max-Age=${60 * 60 * 24 * 365}; HttpOnly; SameSite=Lax`);

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 400 });
  }
}
