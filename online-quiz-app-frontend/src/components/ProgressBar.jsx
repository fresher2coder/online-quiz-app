import React from "react";
import styled from "styled-components";

const BarContainer = styled.div`
  width: 100%;
  background-color: #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Bar = styled.div`
  width: ${({ progress }) => progress}%;
  background-color: #2196f3;
  height: 10px;
  border-radius: 8px;
`;

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <BarContainer>
      <Bar progress={progress} />
    </BarContainer>
  );
};

export default ProgressBar;
