import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const studentIds = [
  "311822104001",
  "311822104002",
  "311822104004",
  "311822104005",
  "311822104006",
  "311822104007",
  "311822104008",
  "311822104009",
  "311822104010",
  "311822104011",
  "311822104013",
  "311822104014",
  "311822104015",
  "311822104016",
  "311822104017",
  "311822104018",
  "311822104019",
  "311822104020",
  "311822104021",
  "311822104022",
  "311822104023",
  "311822104024",
  "311822104025",
  "311822104026",
  "311822104027",
  "311822104028",
  "311822104029",
  "311822104030",
  "311822104032",
  "311822104033",
  "311822104034",
  "311822104035",
  "311822104036",
  "311822104037",
  "311822104038",
  "311822104039",
  "311822104040",
  "311822104041",
  "311822104042",
  "311822104043",
  "311822104044",
  "311822104045",
  "311822104046",
  "311822104047",
  "311822104048",
  "311822104049",
  "311822104050",
  "311822104051",
  "311822104052",
  "311822104053",
  "311822104054",
  "311822104055",
  "311822104056",
  "311822104301",
  "311822104302",
  "311822104303",
  "311822104304",
  "311822104305",
  "311822104306",
];

const UserForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", rollNo: "", dept: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, rollNo, dept } = form;

    // Basic client-side validation
    if (!name || !rollNo || !dept) {
      setError("All fields are required.");
      return;
    }

    if (!studentIds.includes(rollNo)) {
      setError("Invalid Roll Number.");
      return;
    }

    try {
      // Check for duplicate roll number
      const res = await axios.post(
        "https://online-quiz-app-tw82.onrender.com/api/user/check-roll",
        {
          rollNo,
        }
      );

      if (res.data.exists) {
        setError("Roll number already exists.");
        return;
      }

      // Register the user
      await axios.post(
        "https://online-quiz-app-tw82.onrender.com/api/user/register",
        {
          name,
          rollNo,
          dept,
        }
      );

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
            placeholder="Roll Number"
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
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
          </Select>
          <Button type="submit">Start Quiz</Button>
        </form>
      </FormCard>
    </Container>
  );
};

export default UserForm;
