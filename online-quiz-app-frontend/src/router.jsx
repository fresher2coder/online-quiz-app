import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";
import UserForm from "./components/UserForm";

import QuizPage from "./components/QuizPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
