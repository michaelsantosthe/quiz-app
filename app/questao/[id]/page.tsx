"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface Question {
  id: number
  titulo: string
  categoria: string
  dificuldade: "Fácil" | "Médio" | "Difícil"
  enunciado: string
}

export default function QuestionDetails({ params }: { params: { id: string } }) {
  const [question, setQuestion] = useState<Question | null>(null)

  useEffect(() => {
    fetch(`/api/questoes/${params.id}`)
      .then((response) => response.json())
      .then((data) => setQuestion(data))
      .catch((error) => console.error("Error fetching question details:", error))
  }, [params.id])

  if (!question) {
    return <div>Carregando...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{question.titulo}</h2>
      <div className="mb-4">
        <span className="font-bold">Categoria:</span> {question.categoria}
      </div>
      <div className="mb-4">
        <span className="font-bold">Dificuldade:</span> {question.dificuldade}
      </div>
      <div className="mb-6">
        <span className="font-bold">Enunciado:</span>
        <p className="mt-2">{question.enunciado}</p>
      </div>
      <div className="flex justify-between">
        <Link href="/" className="text-blue-600 hover:underline">
          Voltar para a lista
        </Link>
        <Link
          href={`/responder/${question.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Responder
        </Link>
      </div>
    </div>
  )
}

