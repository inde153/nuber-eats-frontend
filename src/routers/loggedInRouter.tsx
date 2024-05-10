import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { MeQuery } from '../gql/graphql';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Restaurants } from '../pages/client/Restaurants';

const ClientRoutes = () => (
  <>
    <Route path="/" element={<Restaurants />} />
  </>
);

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`;

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<MeQuery>(ME_QUERY);

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
      // <Routes>{data.me.role === 'Client' && <ClientRoutes />}</Routes>
    </Router>
  );
};
