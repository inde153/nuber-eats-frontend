import React from 'react';
import { isLoggedInVar } from '../apollo';

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  };

  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={() => isLoggedInVar(true)}>Click to login</button>
    </div>
  );
};
