import { ApolloError, gql, useMutation } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../common/constants';
import { emailRegex } from '../common/pattern';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { LoginMutation, LoginMutationVariables } from '../gql/graphql';
const nuberLogo = 'https://www.ubereats.com/_static/8b969d35d373b512664b78f912f19abc.svg';

//그래프QL의 인풋타입을 가져와서 넣음
const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  // const onError = (error: ApolloError) => {};
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN_MUTATION, {
    // 이 처럼 왓치로 항상 사용 가능 이렇게 사용하면 onSubmit의 variables를 사용하지 않아도 됨
    // variables: {
    //   loginInput: {
    //     email: watch('email'),
    //     password: watch('password'),
    //   },
    // },
    onCompleted,
    // onError,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-bold text-left text-3xl mb-5">Welcome back</h4>
        <form className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', { required: 'Email is required', pattern: { value: emailRegex, message: 'Please enter a valid email' } })}
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be more than 8 chars.' },
            })}
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          <Button canClick={isValid} loading={loading} actionText={'Login'} />
          {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
        </form>
        <div>
          New to Nuber?{' '}
          <Link to="/signup" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
