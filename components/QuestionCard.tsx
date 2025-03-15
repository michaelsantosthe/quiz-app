import Link from "next/link"

interface QuestionCardProps {
  question: {
    id: number
    titulo: string
    categoria: string
    dificuldade: "Fácil" | "Médio" | "Difícil"
  }
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const difficultyColor = {
    Fácil: "bg-green-100 text-green-800",
    Médio: "bg-yellow-100 text-yellow-800",
    Difícil: "bg-red-100 text-red-800",
  }[question.dificuldade]

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">{question.titulo}</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">{question.categoria}</span>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${difficultyColor}`}>{question.dificuldade}</span>
      </div>
      <div className="flex justify-between">
        <Link href={`/questao/${question.id}`} className="text-blue-600 hover:underline">
          Ver detalhes
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

