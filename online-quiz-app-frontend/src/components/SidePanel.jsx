import React from "react";
import styled from "styled-components";

const Panel = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.colors.sidebar};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const QuestionButton = styled.button`
  margin: 0.25rem 0;
  padding: 0.5rem;
  background-color: ${({ isActive, isAnswered }) =>
    isActive ? "#2196f3" : isAnswered ? "#4caf50" : "#f0f0f0"};
  color: ${({ isActive, isAnswered }) =>
    isActive || isAnswered ? "#fff" : "#000"};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const SidePanel = ({ questions, currentQIndex, answers, onNavigate }) => {
  return (
    <Panel>
      {questions.map((q, idx) => (
        <QuestionButton
          key={q._id}
          isActive={idx === currentQIndex}
          isAnswered={answers[q._id]}
          onClick={() => onNavigate(idx)}
        >
          Question {idx + 1}
        </QuestionButton>
      ))}
    </Panel>
  );
};

export default SidePanel;
