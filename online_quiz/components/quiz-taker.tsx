"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QUIZZES } from "@/lib/quiz-data"
import type { QuizResult } from "@/app/page"

interface QuizTakerProps {
  quizId: string
  onComplete: (result: QuizResult) => void
  onCancel: () => void
}

export default function QuizTaker({ quizId, onComplete, onCancel }: QuizTakerProps) {
  const [quiz, setQuiz] = useState<any | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const foundQuiz = QUIZZES.find((q) => q.id === quizId)
    setQuiz(foundQuiz)
    setTimeRemaining((foundQuiz?.duration || 15) * 60)
  }, [quizId])

  useEffect(() => {
    if (!quiz) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [quiz])

  if (!quiz) return null

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const isAnswered = currentQuestionIndex in selectedAnswers

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitQuiz = () => {
    let score = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++
      }
    })

    const result: QuizResult = {
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      answers: selectedAnswers,
      timeTaken: Math.floor((Date.now() - startTime) / 1000),
    }
    onComplete(result)
  }

  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  return (
    <div className="space-y-6">
      <Card className="quiz-card bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-card-foreground">{quiz.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${timeRemaining < 60 ? "text-red-500" : "text-primary"}`}>
              {formatTime(timeRemaining)}
            </div>
            <p className="text-sm text-muted-foreground">Time remaining</p>
          </div>
        </div>
        <div className="mt-4 bg-border rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </Card>

      <Card className="quiz-card space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground mb-6">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className="option-button"
                data-selected={selectedAnswers[currentQuestionIndex] === index}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center">
                    {selectedAnswers[currentQuestionIndex] === index && (
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-between pt-6 border-t border-border">
          <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
            ← Previous
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={onCancel}
              variant="outline"
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
            >
              Exit Quiz
            </Button>
            {isLastQuestion ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Next →
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
