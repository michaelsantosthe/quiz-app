import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { resposta_usuario } = await request.json()

  // Here you would typically save the user's answer to a database
  console.log(`User answered question ${params.id} with: ${resposta_usuario}`)

  return NextResponse.json({ message: "Answer submitted successfully" })
}

