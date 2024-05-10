import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CreateAccount } from '../pages/CreateAccount';
import { Login } from '../pages/Login';
import { NotFound } from '../pages/NotFound';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
