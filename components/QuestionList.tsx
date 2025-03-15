"use client"

import { useState, useEffect } from "react"
import QuestionCard from "./QuestionCard"

interface Question {
  id: number
  titulo: string
  categoria: string
  dificuldade: "Fácil" | "Médio" | "Difícil"
}

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch("/api/questoes")
      .then((response) => response.json())
      .then((data) => {
        console.log("API response:", data) // Log the entire response
        setQuestions(Array.isArray(data) ? data : data.data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching questions:", error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loading ? (
        <p>Carregando questões...</p>
      ) : questions.length > 0 ? (
        questions.map((question) => <QuestionCard key={question.id} question={question} />)
      ) : (
        <p>Nenhuma questão encontrada.</p>
      )}
    </div>
  )
}

