"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QUIZZES } from "@/lib/quiz-data"

interface QuizSelectorProps {
  onSelectQuiz: (quizId: string) => void
}

export default function QuizSelector({ onSelectQuiz }: QuizSelectorProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          QuizMaster
        </h1>
        <p className="text-lg text-muted-foreground">Test your knowledge with our interactive quizzes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {QUIZZES.map((quiz) => (
          <Card key={quiz.id} className="quiz-card flex flex-col">
            <div className="flex-1 space-y-3">
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {quiz.category}
              </div>
              <h2 className="text-xl font-bold text-card-foreground">{quiz.title}</h2>
              <p className="text-sm text-muted-foreground">{quiz.description}</p>
              <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                <span>📋 {quiz.questions.length} questions</span>
                <span>⏱️ ~{quiz.duration} min</span>
              </div>
            </div>
            <Button
              onClick={() => onSelectQuiz(quiz.id)}
              className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Quiz
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
