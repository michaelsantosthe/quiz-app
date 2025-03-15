import QuestionList from "../components/QuestionList"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Lista de Questões</h2>
        <Link href="/criar-questao" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Criar Nova Questão
        </Link>
      </div>
      <QuestionList />
    </div>
  )
}

