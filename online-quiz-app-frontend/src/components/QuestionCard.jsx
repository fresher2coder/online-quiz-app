import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Option = styled.div`
  margin: 0.5rem 0;
  padding: 0.75rem;
  border: 1px solid ${({ selected }) => (selected ? "#4caf50" : "#ccc")};
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? "#e8f5e9" : "#fff")};
  cursor: pointer;
`;

const QuestionCard = ({ question, selectedOption, onOptionSelect }) => {
  return (
    <Card>
      <h3>{question.question}</h3>
      {question.options.map((opt, idx) => (
        <Option
          key={idx}
          selected={selectedOption === opt}
          onClick={() => onOptionSelect(question._id, opt)}
        >
          {opt}
        </Option>
      ))}
    </Card>
  );
};

export default QuestionCard;
