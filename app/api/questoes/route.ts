import { NextResponse } from "next/server"

const questions = [
  {
    id: 1,
    titulo: "Questão de Matemática",
    categoria: "Matemática",
    dificuldade: "Médio",
    enunciado: "Qual é a raiz quadrada de 144?",
    alternativas: ["10", "12", "14", "16"],
    alternativa_correta: 1,
  },
  {
    id: 2,
    titulo: "Questão de Português",
    categoria: "Português",
    dificuldade: "Fácil",
    enunciado: 'Qual é o plural de "café"?',
    alternativas: ["cafés", "cafezinhos", "cafezais", "cafeteria"],
    alternativa_correta: 0,
  },
  {
    id: 3,
    titulo: "Questão de Direito",
    categoria: "Direito",
    dificuldade: "Difícil",
    enunciado: 'O que significa "habeas corpus"?',
    alternativas: ["Que tenhas o corpo", "Que tenhas a mente", "Que tenhas a liberdade", "Que tenhas o direito"],
    alternativa_correta: 0,
  },
]

export async function GET() {
  return NextResponse.json(questions)
}

export async function POST(request: Request) {
  const newQuestion = await request.json()
  newQuestion.id = questions.length + 1
  questions.push(newQuestion)
  return NextResponse.json(newQuestion, { status: 201 })
}

