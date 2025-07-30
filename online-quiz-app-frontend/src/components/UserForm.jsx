import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import studentIds from "../data/studentIds"; // adjust path based on your folder structure

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormCard = styled.div`
  background: white;
  padding: 2.9rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.textDark};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.black};
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.textDark};
    color: white;
  }
`;

const Error = styled.p`
  color: red;
  margin-bottom: 1rem;
  text-align: center;
`;

const UserForm = () => {
  const baseURL = import.meta.env.VITE_BASE_REST_API;

  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", rollNo: "", dept: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim().toUpperCase() });
  };

  const handleStart = () => {
    const now = new Date();
    const currentHour = now.getHours(); // 24-hour format
    const currentMin = now.getMinutes();

    // Allowed: 3:15 PM to 3:45 PM
    if (currentHour === 15 && currentMin >= 15 && currentMin <= 45) {
      return true;
    } else if (currentHour < 15 || (currentHour === 15 && currentMin < 15)) {
      alert("The test has not yet started. Please come back later.");
      return false;
    } else {
      alert("The test is over. Better luck next time.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❗ Only continue if the time is valid
    const canStart = handleStart();
    // if (!canStart) return;

    const { name, rollNo, dept } = form;

    // Basic client-side validation
    if (!name || !rollNo || !dept) {
      setError("All fields are required.");
      return;
    }

    if (!studentIds.includes(rollNo.trim().toUpperCase())) {
      setError("Invalid Unique Number.");
      return;
    }

    try {
      console.log(`${baseURL}/user/check-roll`);
      // Check for duplicate roll number
      const res = await axios.post(`${baseURL}/user/check-roll`, {
        rollNo,
      });

      if (res.data.exists) {
        setError("Roll number already exists.");
        return;
      }

      // Register the user
      await axios.post(`${baseURL}/user/register`, {
        name,
        rollNo,
        dept,
      });

      // Store the user details in localStorage
      localStorage.setItem("quiz-user", JSON.stringify({ name, rollNo, dept }));

      // Clear error and navigate to quiz
      setError("");
      navigate("/quiz", { state: { name, rollNo, dept } });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>Enter Your Details</Title>
        {error && <Error>{error}</Error>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="rollNo"
            placeholder="Unique Number"
            value={form.rollNo}
            onChange={handleChange}
            required
          />
          <Select
            name="dept"
            value={form.dept}
            onChange={handleChange}
            required
          >
            <option value="">Select dept</option>
            <option value="AIDA">AIDA</option>
            <option value="AIML">AIML</option>
            <option value="MEDENG">MEDENG</option>
            <option value="CYBSEC">CYBSEC</option>
            <option value="BSC-AIDA">BSC-AIDA</option>
            <option value="BSC-DS">BSC-DS</option>
          </Select>
          <Button type="submit">Start Quiz</Button>
        </form>
      </FormCard>
    </Container>
  );
};

export default UserForm;
