"use client"

import { useState } from "react"
import QuizSelector from "@/components/quiz-selector"
import QuizTaker from "@/components/quiz-taker"
import ResultsScreen from "@/components/results-screen"

export type QuizState = "selector" | "taking" | "results"

export interface QuizResult {
  quizId: string
  score: number
  totalQuestions: number
  answers: Record<number, number>
  timeTaken: number
}

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("selector")
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const handleStartQuiz = (quizId: string) => {
    setSelectedQuizId(quizId)
    setQuizState("taking")
  }

  const handleCompleteQuiz = (result: QuizResult) => {
    setQuizResult(result)
    setQuizState("results")
  }

  const handleReturnHome = () => {
    setQuizState("selector")
    setSelectedQuizId(null)
    setQuizResult(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {quizState === "selector" && <QuizSelector onSelectQuiz={handleStartQuiz} />}
        {quizState === "taking" && selectedQuizId && (
          <QuizTaker quizId={selectedQuizId} onComplete={handleCompleteQuiz} onCancel={handleReturnHome} />
        )}
        {quizState === "results" && quizResult && <ResultsScreen result={quizResult} onReturnHome={handleReturnHome} />}
      </div>
    </main>
  )
}
