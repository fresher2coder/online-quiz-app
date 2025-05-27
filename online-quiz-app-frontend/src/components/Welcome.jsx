import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container with gradient background
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background},
    ${({ theme }) => theme.colors.primary}
  );
`;

// Center card
const Card = styled.div`
  background: white;
  padding: 3rem 4rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
  max-width: 480px;
  width: 100%;
`;

// Title
const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 1rem;
`;

// Subtitle
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 2rem;
`;

// Button
const StartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textDark};
    color: ${({ theme }) => theme.colors.background};
  }
`;

function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    const now = new Date();
    const currentHour = now.getHours(); // returns hour in 24-hour format

    // Check if current time is between 3 PM (15) and before 4 PM (16)
    console.log(currentHour);
    if (currentHour === 9) {
      navigate("/form");
    } else {
      alert(
        "The quiz is only available between 9 AM and 10 AM. Please come back later."
      );
    }
  };

  return (
    <Container>
      <Card>
        <Title>Welcome to the Quiz</Title>
        <Subtitle>Test your knowledge with 40 MCQs in 40 minutes!</Subtitle>
        <StartButton onClick={handleStart}>Start Quiz</StartButton>
      </Card>
    </Container>
  );
}

export default Welcome;
