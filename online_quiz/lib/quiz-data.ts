export interface Question {
  question: string
  options: string[]
  correctAnswer: number
}

export interface Quiz {
  id: string
  title: string
  description: string
  category: string
  duration: number
  questions: Question[]
}

export const QUIZZES: Quiz[] = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your knowledge on diverse topics",
    category: "General",
    duration: 10,
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1,
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1,
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
      },
      {
        question: "In what year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "science-quiz",
    title: "Science Fundamentals",
    description: "Challenge yourself with science questions",
    category: "Science",
    duration: 12,
    questions: [
      {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
      },
      {
        question: "What is the speed of light?",
        options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
        correctAnswer: 0,
      },
      {
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
      },
      {
        question: "What is the most abundant gas in the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Argon"],
        correctAnswer: 1,
      },
      {
        question: "What is the pH of pure water at 25°C?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "history-quiz",
    title: "World History",
    description: "Explore historical events and figures",
    category: "History",
    duration: 11,
    questions: [
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "John Adams", "James Madison"],
        correctAnswer: 1,
      },
      {
        question: "In which year did the Titanic sink?",
        options: ["1911", "1912", "1913", "1914"],
        correctAnswer: 1,
      },
      {
        question: "What ancient wonder is located in Egypt?",
        options: ["Hanging Gardens", "Great Pyramid of Giza", "Colossus of Rhodes", "Lighthouse of Alexandria"],
        correctAnswer: 1,
      },
      {
        question: "Which empire built Machu Picchu?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correctAnswer: 2,
      },
      {
        question: "In what year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correctAnswer: 2,
      },
    ],
  },
]
