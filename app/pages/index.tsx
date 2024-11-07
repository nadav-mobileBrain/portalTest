import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  const questions = ["Does this site functionality work?", "How about now?"];

  const handleAnswer = (answer: number) => {
    setUserAnswer(answer);
    if (answer === 1) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (questionIndex < questions.length) {
        setIsPlaying(false);
        setQuestionIndex((prev) => prev + 1);
      }
    }, 3000); // Pause after 3 seconds

    return () => clearTimeout(timer);
  }, [isPlaying, questionIndex]);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <iframe
        className="w-full h-64"
        src="https://www.youtube.com/embed/HaA2hBxiz24?autoplay=1&mute=1"
        title="YouTube Video"
        allow="autoplay; encrypted-media"
        frameBorder="0"
      />
      {!isPlaying && questionIndex < questions.length && (
        <div className="mt-4">
          <p>{questions[questionIndex]}</p>
          <div className="flex flex-col">
            {[1, 2, 3, 4].map((option) => (
              <button
                key={option}
                className="p-2 border rounded mt-2"
                onClick={() => handleAnswer(option)}
                aria-label={`Answer option ${option}`}>
                {option === 1
                  ? "Yes"
                  : option === 2
                  ? "No"
                  : option === 3
                  ? "Don't know"
                  : "Not so much"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
