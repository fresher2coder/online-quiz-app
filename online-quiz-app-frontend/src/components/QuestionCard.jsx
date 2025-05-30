// import React from "react";
// import styled from "styled-components";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

// const Card = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 12px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Option = styled.div`
//   margin: 0.5rem 0;
//   padding: 0.75rem;
//   border: 1px solid ${({ selected }) => (selected ? "#4caf50" : "#ccc")};
//   border-radius: 8px;
//   background-color: ${({ selected }) => (selected ? "#e8f5e9" : "#fff")};
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;

//   &:hover {
//     background-color: #f1f1f1;
//   }
// `;

// const QuestionText = styled.div`
//   margin-bottom: 1rem;
//   font-size: 1.1rem;
//   white-space: pre-wrap;
// `;

// const QuestionCard = ({ question, selectedOption, onOptionSelect }) => {
//   // Check if the question looks like code (e.g., contains newline and indentation)
//   const isCodeQuestion =
//     question.question.includes("\n") || question.question.includes("    ");

//   return (
//     <Card>
//       <QuestionText>
//         {isCodeQuestion ? (
//           <SyntaxHighlighter language="python" style={solarizedlight}>
//             {question.question}
//           </SyntaxHighlighter>
//         ) : (
//           question.question
//         )}
//       </QuestionText>

//       {question.options.map((opt, idx) => (
//         <Option
//           key={idx}
//           selected={selectedOption === opt}
//           onClick={() => onOptionSelect(question._id, opt)}
//         >
//           {opt}
//         </Option>
//       ))}
//     </Card>
//   );
// };

// export default QuestionCard;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

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
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const QuestionText = styled.div`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  white-space: pre-wrap;
`;

// Utility to shuffle array
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const QuestionCard = ({ question, selectedOption, onOptionSelect }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    // Shuffle only once when the component mounts or question._id changes
    setShuffledOptions(shuffleArray(question.options));
  }, [question._id]);

  const isCodeQuestion =
    question.question.includes("\n") || question.question.includes("    ");

  return (
    <Card>
      <QuestionText>
        {isCodeQuestion ? (
          <SyntaxHighlighter language="python" style={solarizedlight}>
            {question.question}
          </SyntaxHighlighter>
        ) : (
          question.question
        )}
      </QuestionText>

      {shuffledOptions.map((opt, idx) => (
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
