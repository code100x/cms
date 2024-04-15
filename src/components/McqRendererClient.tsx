'use client';
import React, { useState } from 'react';

type questiontype = {
  id: number;
  quizId: number;
  answer: string;
  content: string;
  reason: string;
  options: string[];
};

const McqRendererClient = ({ metadata }: { metadata: questiontype[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showReason, setShowReason] = useState(false);
  const handleOptionSelect = (option: string) => {
    setShowReason(true);
    setSelectedOption(option);
  };

  console.log(metadata);

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      alert('Please select an option before proceeding.');
      return;
    }

    if (currentQuestionIndex < metadata.length - 1) {
      setSelectedOption(null);
      setShowReason(false);
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
  };
  console.log(metadata);
  return (
    <div className="max-w-lg mx-auto p-4">
      {showResult ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
          <p className="mb-2">You have completed the quiz.</p>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="mb-4">{metadata[currentQuestionIndex].content}</p>
          <div className="space-y-2">
            {metadata[currentQuestionIndex].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 border rounded-md cursor-pointer ${
                  selectedOption &&
                  option === metadata[currentQuestionIndex]['answer']
                    ? 'bg-green-400'
                    : ''
                } ${
                  selectedOption === option &&
                  selectedOption !== metadata[currentQuestionIndex]['answer']
                    ? 'bg-red-400'
                    : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {currentQuestionIndex < metadata.length - 1
                ? 'Next Question'
                : 'Finish Quiz'}
            </button>
            {showReason && (
              <div className="bg-green-50 dark:bg-green-400 mt-5 p-4">
                {metadata[currentQuestionIndex]['answer']}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default McqRendererClient;
