import React from 'react';
import { useForm } from 'react-hook-form';

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log(getValues());
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-5 pb-7 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Log In</h3>
        <form className="grid gap-3 mt-5 px-5" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email', { required: 'Email is required' })} placeholder="Email" className="input" />
          {errors.email?.message && <span className="text-medium text-red-500">{errors.email?.message}</span>}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be more than 8 chars.' },
            })}
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && <span className="text-medium text-red-500">{errors.password?.message}</span>}
          <button className="mt-3 btn">LogIn</button>
        </form>
      </div>
    </div>
  );
};
