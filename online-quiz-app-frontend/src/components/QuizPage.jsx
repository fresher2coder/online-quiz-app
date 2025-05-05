import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import SidePanel from "./SidePanel";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Score = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Timer = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textDark};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 2rem;
`;

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (in seconds)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://online-quiz-app-tw82.onrender.com/api/quiz/questions"
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]);

  const handleOptionSelect = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (answers[q._id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);

    try {
      const { name, rollNo, dept } = JSON.parse(
        localStorage.getItem("quiz-user")
      );
      await axios.post(
        "https://online-quiz-app-tw82.onrender.com/api/result/submit",
        {
          name,
          rollNo,
          dept,
          score: calculatedScore,
        }
      );
    } catch (err) {
      console.error("Error submitting result:", err);
    }
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  if (score !== null) {
    return (
      <Container>
        <MainContent>
          <Title>Quiz Completed!</Title>
          <Score>
            <h3>Your Score:</h3>
            <p>
              {score} / {questions.length}
            </p>
          </Score>
          <Button onClick={handleHomeClick}>Go to Homepage</Button>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <SidePanel
        questions={questions}
        currentQIndex={currentQIndex}
        answers={answers}
        onNavigate={setCurrentQIndex}
      />
      <MainContent>
        <ProgressBar current={currentQIndex + 1} total={questions.length} />
        <Timer>
          Time Remaining: {Math.floor(timeLeft / 60)}:
          {("0" + (timeLeft % 60)).slice(-2)}
        </Timer>
        {questions.length > 0 && (
          <QuestionCard
            question={questions[currentQIndex]}
            selectedOption={answers[questions[currentQIndex]._id]}
            onOptionSelect={handleOptionSelect}
          />
        )}
        <NavigationButtons>
          <Button
            onClick={() => setCurrentQIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentQIndex === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentQIndex((prev) =>
                Math.min(prev + 1, questions.length - 1)
              )
            }
            disabled={currentQIndex === questions.length - 1}
          >
            Next
          </Button>
        </NavigationButtons>
        {currentQIndex === questions.length - 1 && (
          <SubmitButton onClick={handleSubmit}>Submit Quiz</SubmitButton>
        )}
      </MainContent>
    </Container>
  );
};

export default QuizPage;
