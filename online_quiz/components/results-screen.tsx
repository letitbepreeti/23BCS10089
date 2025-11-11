"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QUIZZES } from "@/lib/quiz-data"
import type { QuizResult } from "@/app/page"

interface ResultsScreenProps {
  result: QuizResult
  onReturnHome: () => void
}

export default function ResultsScreen({ result, onReturnHome }: ResultsScreenProps) {
  const quiz = QUIZZES.find((q) => q.id === result.quizId)
  const percentage = Math.round((result.score / result.totalQuestions) * 100)
  const timeTakenMinutes = Math.floor(result.timeTaken / 60)
  const timeTakenSeconds = result.timeTaken % 60

  if (!quiz) return null

  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! Outstanding performance!"
    if (percentage >= 80) return "Excellent! Very well done!"
    if (percentage >= 60) return "Good job! You passed the quiz!"
    if (percentage >= 40) return "Not bad! Keep practicing!"
    return "Keep learning! Try again soon!"
  }

  const getPerformanceColor = () => {
    if (percentage >= 80) return "from-green-500 to-emerald-500"
    if (percentage >= 60) return "from-blue-500 to-cyan-500"
    if (percentage >= 40) return "from-orange-500 to-yellow-500"
    return "from-red-500 to-rose-500"
  }

  return (
    <div className="space-y-8">
      <Card className={`quiz-card bg-gradient-to-r ${getPerformanceColor()} text-white`}>
        <div className="text-center space-y-4">
          <div className="text-6xl font-bold">{percentage}%</div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{getPerformanceMessage()}</h2>
            <p className="text-white/90">
              You answered {result.score} out of {result.totalQuestions} questions correctly
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="quiz-card text-center">
          <div className="text-3xl font-bold text-primary">{result.score}</div>
          <p className="text-sm text-muted-foreground mt-1">Correct Answers</p>
        </Card>
        <Card className="quiz-card text-center">
          <div className="text-3xl font-bold text-accent">{result.totalQuestions - result.score}</div>
          <p className="text-sm text-muted-foreground mt-1">Incorrect Answers</p>
        </Card>
        <Card className="quiz-card text-center">
          <div className="text-3xl font-bold text-primary">
            {timeTakenMinutes}:{timeTakenSeconds.toString().padStart(2, "0")}
          </div>
          <p className="text-sm text-muted-foreground mt-1">Time Taken</p>
        </Card>
      </div>

      <Card className="quiz-card space-y-4">
        <h3 className="text-xl font-bold text-card-foreground">Quiz Review</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {quiz.questions.map((question, index) => {
            const userAnswer = result.answers[index]
            const isCorrect = userAnswer === question.correctAnswer
            return (
              <div
                key={index}
                className={`p-3 rounded-lg border-l-4 ${
                  isCorrect
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : "border-red-500 bg-red-50 dark:bg-red-950"
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg font-bold mt-1">{isCorrect ? "✓" : "✗"}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-card-foreground">
                      Q{index + 1}: {question.question}
                    </p>
                    <p className="text-sm mt-1">
                      <span
                        className={isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
                      >
                        Your answer: {question.options[userAnswer]}
                      </span>
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="flex gap-4 justify-center pt-4">
        <Button onClick={onReturnHome} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Return to Quizzes
        </Button>
      </div>
    </div>
  )
}
