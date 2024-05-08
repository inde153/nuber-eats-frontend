import React from 'react';

export const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log in</h3>
        <form className="flex flex-col my-5 px-5">
          <input
            placeholder="Email"
            className="bg-gray-100 shadow-inner focus:outline-none mb-3 border focus:border-green-600 py-3 px-5 rounded-lg"
          />
          <input placeholder="Password" className="bg-gray-100 shadow-inner focus:outline-none border focus:border-green-600 py-3 px-5 rounded-lg" />
          <button className="hover:opacity-90 focus:outline-none py-3 px-5 bg-gray-800 text-white text-lg mt-3 rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
};
