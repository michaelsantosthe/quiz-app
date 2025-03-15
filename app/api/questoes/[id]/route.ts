import { NextResponse } from "next/server"

const questions = [
  {
    id: 1,
    titulo: "Questão de Matemática",
    categoria: "Matemática",
    dificuldade: "Médio",
    enunciado: "Qual é a raiz quadrada de 144?",
    alternativas: ["10", "12", "14", "16"],
  },
  {
    id: 2,
    titulo: "Questão de Português",
    categoria: "Português",
    dificuldade: "Fácil",
    enunciado: 'Qual é o plural de "café"?',
    alternativas: ["cafés", "cafezinhos", "cafezais", "cafeteria"],
  },
  {
    id: 3,
    titulo: "Questão de Direito",
    categoria: "Direito",
    dificuldade: "Difícil",
    enunciado: 'O que significa "habeas corpus"?',
    alternativas: ["Que tenhas o corpo", "Que tenhas a mente", "Que tenhas a liberdade", "Que tenhas o direito"],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const question = questions.find((q) => q.id === Number.parseInt(params.id))
  if (question) {
    return NextResponse.json(question)
  } else {
    return new NextResponse("Question not found", { status: 404 })
  }
}

