// This file is temporarily disabled for deployment
// We'll re-enable authentication after deployment is successful

export function GET() {
  return new Response(JSON.stringify({ message: "Auth service temporarily unavailable" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function POST() {
  return new Response(JSON.stringify({ message: "Auth service temporarily unavailable" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
} 