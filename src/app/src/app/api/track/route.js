export async function POST(request) {
  try {
    const evt = await request.json();
    // Stub: in production forward to GA Measurement Protocol or FB Conversions API
    // For now, just log to server console (serverless provider will capture logs)
    console.log('Server-side track event:', evt);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), { status: 400 });
  }
}
