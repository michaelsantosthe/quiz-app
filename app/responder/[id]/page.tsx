"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Question {
  id: number
  titulo: string
  enunciado: string
  alternativas: string[]
}

export default function AnswerQuestion({ params }: { params: { id: string } }) {
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/questoes/${params.id}`)
      .then((response) => response.json())
      .then((data) => setQuestion(data.data)) // Assumindo que a API retorna um objeto com uma propriedade 'data'
      .catch((error) => console.error("Error fetching question:", error))
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAnswer) return

    try {
      const response = await fetch(`/api/questoes/${params.id}/responder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resposta_usuario: selectedAnswer }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Resposta enviada:", data)
        router.push("/")
      } else {
        console.error("Error submitting answer")
      }
    } catch (error) {
      console.error("Error submitting answer:", error)
    }
  }

  if (!question) {
    return <div>Carregando...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">{question.titulo}</h2>
      <p className="mb-6">{question.enunciado}</p>
      <form onSubmit={handleSubmit}>
        {question.alternativas.map((alternativa, index) => (
          <div key={index} className="mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="answer"
                value={alternativa}
                checked={selectedAnswer === alternativa}
                onChange={() => setSelectedAnswer(alternativa)}
                className="mr-2"
              />
              {String.fromCharCode(65 + index)}. {alternativa}
            </label>
          </div>
        ))}
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push("/")} className="text-blue-600 hover:underline">
            Voltar para a lista
          </button>
          <button
            type="submit"
            disabled={!selectedAnswer}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            Enviar resposta
          </button>
        </div>
      </form>
    </div>
  )
}

