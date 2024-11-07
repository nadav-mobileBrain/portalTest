"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface GameState {
  correctAnswers: number;
  wrongAnswers: number;
  currentQuestion: number;
}

interface Question {
  correctAnswer: string;
  // add other question properties you need
}

const questions: Question[] = [
  // Add your questions here
  { correctAnswer: "answer1" },
  { correctAnswer: "answer2" },
];

const HomePage = () => {
  const router = useRouter();
  const [gameState, setGameState] = useState<GameState>({
    correctAnswers: 0,
    wrongAnswers: 0,
    currentQuestion: 0,
  });

  useEffect(() => {
    router.push("/auth");
  }, [router]);

  const handleAnswer = (selectedAnswer: string) => {
    const isCorrect =
      selectedAnswer === questions[gameState.currentQuestion].correctAnswer;

    setGameState((prev) => ({
      ...prev,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !isCorrect ? prev.wrongAnswers + 1 : prev.wrongAnswers,
      currentQuestion: prev.currentQuestion + 1,
    }));
  };

  return (
    <div>
      <div className="flex gap-4 text-lg font-semibold">
        <p>Correct: {gameState.correctAnswers}</p>
        <p>Wrong: {gameState.wrongAnswers}</p>
      </div>
    </div>
  );
};

export default HomePage;
