import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from '../apollo';
import { MeQuery } from '../gql/graphql';

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
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};
