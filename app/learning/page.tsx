"use client";

import React, { useState, useEffect, useRef } from "react";

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const questions = [
    "Does this site functionality work after 3 seconds?",
    "How about now after 6 seconds?",
  ];

  const startVideo = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);

        // Start timer for first question
        timerRef.current = setTimeout(() => {
          videoRef.current?.pause();
          setIsPlaying(false);
          setQuestionIndex(0);
        }, 3000);
      }
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleAnswer = (answer: number) => {
    setUserAnswer(answer);
    if (answer === 1) {
      setIsPlaying(true);
      setWrongAnswer(false);
      videoRef.current?.play();

      // If this was the last question
      if (questionIndex === questions.length - 1) {
        setQuizComplete(true);
        setQuestionIndex(-1); // Hide questions
      } else {
        // Set timer for next question
        timerRef.current = setTimeout(() => {
          videoRef.current?.pause();
          setIsPlaying(false);
          setUserAnswer(null);
          setQuestionIndex((prev) => prev + 1);
        }, 3000);
      }
    } else {
      setIsPlaying(false);
      videoRef.current?.pause();
      setWrongAnswer(true);
      setWrongAnswersCount((prev) => prev + 1);
      window.history.replaceState(
        null,
        "",
        `?wrongAnswers=${wrongAnswersCount + 1}`
      );
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4">
      <div className="mb-4 text-lg font-semibold">
        Wrong Answers: {wrongAnswersCount}
      </div>
      <div className="relative w-full">
        <video
          ref={videoRef}
          className="w-full h-64 bg-black rounded-lg"
          src="/video.mp4"
          playsInline
          onEnded={handleVideoEnd}
          onLoadedMetadata={() => {
            if (isPlaying) {
              videoRef.current?.play();
            }
          }}
        />

        {!hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <button
              onClick={startVideo}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              aria-label="Start Video">
              Start Video
            </button>
          </div>
        )}
      </div>

      {questionIndex >= 0 &&
        questionIndex < questions.length &&
        !quizComplete && (
          <div className="mt-6 w-full">
            <p className="text-lg font-semibold mb-4 text-center">
              {questions[questionIndex]}
            </p>
            <div className="flex flex-col gap-2 max-w-md mx-auto">
              {[1, 2, 3, 4].map((option) => (
                <button
                  key={option}
                  className={`p-3 border rounded-lg transition-all
                  ${
                    userAnswer === option && option !== 1
                      ? "border-red-500 bg-red-50"
                      : userAnswer === option && option === 1
                      ? "border-green-500 bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
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

      {quizComplete && (
        <div className="mt-4 text-center text-green-600 font-medium">
          Quiz complete! Enjoy the rest of the video.
        </div>
      )}
    </div>
  );
};

export default HomePage;
