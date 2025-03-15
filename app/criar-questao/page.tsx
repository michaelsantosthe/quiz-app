"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function CreateQuestion() {
  const router = useRouter()
  const [question, setQuestion] = useState({
    titulo: "",
    categoria: "",
    dificuldade: "Fácil",
    enunciado: "",
    alternativas: ["", "", "", ""],
    alternativa_correta: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setQuestion((prev) => ({ ...prev, [name]: value }))
  }

  const handleAlternativaChange = (index: number, value: string) => {
    setQuestion((prev) => ({
      ...prev,
      alternativas: prev.alternativas.map((alt, i) => (i === index ? value : alt)),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/questoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(question),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Questão criada:", data)
        router.push("/")
      } else {
        console.error("Error creating question")
      }
    } catch (error) {
      console.error("Error creating question:", error)
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Criar Nova Questão</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={question.titulo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={question.categoria}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dificuldade" className="block text-sm font-medium text-gray-700">
            Dificuldade
          </label>
          <select
            id="dificuldade"
            name="dificuldade"
            value={question.dificuldade}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option>Fácil</option>
            <option>Médio</option>
            <option>Difícil</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="enunciado" className="block text-sm font-medium text-gray-700">
            Enunciado
          </label>
          <textarea
            id="enunciado"
            name="enunciado"
            value={question.enunciado}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>
        {question.alternativas.map((alternativa, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`alternativa-${index}`} className="block text-sm font-medium text-gray-700">
              Alternativa {String.fromCharCode(65 + index)}
            </label>
            <input
              type="text"
              id={`alternativa-${index}`}
              value={alternativa}
              onChange={(e) => handleAlternativaChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        ))}
        <div className="mb-4">
          <label htmlFor="alternativa_correta" className="block text-sm font-medium text-gray-700">
            Alternativa Correta
          </label>
          <select
            id="alternativa_correta"
            name="alternativa_correta"
            value={question.alternativa_correta}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {question.alternativas.map((_, index) => (
              <option key={index} value={index}>
                {String.fromCharCode(65 + index)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Criar Questão
          </button>
        </div>
      </form>
    </div>
  )
}

