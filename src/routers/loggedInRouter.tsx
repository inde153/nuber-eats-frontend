import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Restaurants } from '../pages/client/Restaurants';
import { Header } from '../components/Header';
import { useMe } from '../hooks/useMe';

const ClientRoutes = () => (
  <>
    <Route path="/" element={<Restaurants />} />
  </>
);

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  console.log(data);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-bold text-lg tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>{data.me.role === 'Client' && <Route path="/" element={<Restaurants />} />}</Routes>
    </Router>
  );
};
