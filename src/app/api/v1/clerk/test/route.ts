export async function POST() {
  return new Response(
    JSON.stringify({
      message: 'Webhook endpoint is working',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

export async function GET() {
  return new Response(
    JSON.stringify({
      message: 'Webhook endpoint is accessible',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
