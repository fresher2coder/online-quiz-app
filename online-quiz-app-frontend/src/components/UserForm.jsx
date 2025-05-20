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
  "231FA16001",
  "231FA16002",
  "231FA16004",
  "231FA16005",
  "231FA16007",
  "231FA16008",
  "231FA16009",
  "231FA16011",
  "231FA16013",
  "231FA16014",
  "231FA16015",
  "231FA16016",
  "231FA16017",
  "231FA16018",
  "231FA16019",
  "231FA16020",
  "231FA16021",
  "231FA16022",
  "231FA16024",
  "231FA16025",
  "231FA16026",
  "231FA16027",
  "231FA16028",
  "231FA16029",
  "231FA16030",
  "231FA16031",
  "231FA16033",
  "231FA16034",
  "231FA16035",
  "231FA16036",
  "231FA16037",
  "231FA16038",
  "231FA16040",
  "231FA16041",
  "231FA16042",
  "231FA16043",
  "231FA16044",
  "231FA16045",
  "231FA16046",
  "231FA16047",
  "231FA16048",
  "231FA16049",
  "231FA16050",
  "231FA16051",
  "231FA16052",
  "231FA16053",
  "231FA16054",
  "241LA16001",
  "241LA16002",
  "241LA16003",
  "241LA16004",
  "231FA16036",
  "231FA02001",
  "231FA02002",
  "231FA02003",
  "231FA02004",
  "231FA02005",
  "231FA02006",
  "241LA02001",
  "241LA02002",
  "241LA02003",
  "241LA02004",
  "241LA02005",
  "241LA02008",
  "231FA03001",
  "231FA03002",
  "231FA03003",
  "231FA03005",
  "231FA03006",
  "231FA03007",
  "231FA03009",
  "231FA03011",
  "231FA03012",
  "231FA03013",
  "231FA03014",
  "231FA03015",
  "231FA03016",
  "231FA03017",
  "231FA03018",
  "231FA03019",
  "231FA03020",
  "231FA03021",
  "231FA03022",
  "241LA03001",
  "241LA03002",
  "241LA03003",
  "241LA03004",
  "241LA03005",
  "241LA03006",
  "241LA03007",
  "241LA03008",
  "241LA03010",
  "241LA03009",
  "231FA06001",
  "231FA06002",
  "231FA06003",
  "231FA06004",
  "231FA06005",
  "231FA06007",
  "231FA06008",
  "231FA06009",
  "231FA06011",
  "231FA06012",
  "231FA06013",
  "231FA06015",
  "231FA06016",
  "231FA06018",
  "231FA06019",
  "231FA06021",
  "231FA06022",
  "231FA06023",
  "231FA06024",
  "231FA06025",
  "231FA06026",
  "231FA06027",
  "231FA06029",
  "231FA06030",
  "231FA06032",
  "231FA06033",
  "231FA06034",
  "231FA06035",
  "231FA06036",
  "231FA06037",
  "231FA06038",
  "231FA06039",
  "231FA06040",
  "231FA06041",
  "231FA06042",
  "231FA06043",
  "241LA06001",
  "241LA06002",
  "241LA06003",
  "241LA06004",
  "241LA06005",
  "241LA06006",
  "241LA06008",
  "241LA06009",
  "241LA06010",
  "241LA06011",
  "241LA06012",
  "241LA06013",
  "241LA06014",
  "241LA06015",
  "241LA06016",
  "241LA06017",
  "241LA22001",
  "241LA22002",
  "241LA22003",
  "241LA22004",
  "241LA22005",
];

const UserForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", rollNo: "", dept: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim().toUpperCase() });
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
            <option value="BME">BME</option>
            <option value="TT">TT</option>
            <option value="EEE">EEE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="CHEM">CHEM</option>
          </Select>
          <Button type="submit">Start Quiz</Button>
        </form>
      </FormCard>
    </Container>
  );
};

export default UserForm;
