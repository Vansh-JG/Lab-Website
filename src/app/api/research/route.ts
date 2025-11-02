import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest, ) {
  const token = request.cookies.get('token') ?? "Mayank"

  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token}` },
  })
}