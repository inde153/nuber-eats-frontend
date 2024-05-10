import { gql, useMutation } from '@apollo/client';
import { ok } from 'assert';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { emailRegex } from '../common/pattern';
import { Button } from '../components/Button';
import { FormError } from '../components/FormError';
import { CreateAccountMutation, CreateAccountMutationVariables, UserRole } from '../gql/graphql';
const nuberLogo = 'https://www.ubereats.com/_static/8b969d35d373b512664b78f912f19abc.svg';

//그래프QL의 인풋타입을 가져와서 넣음
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export const CreateAccount = () => {
  const {
    register,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const navigate = useNavigate();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      //redirect
      navigate('/login');
    }
  };
  // const onError = (error: ApolloError) => {};
  const [createAccountMutation, { loading, data: createAccountMutationResult }] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION
  );
  // {
  // 이 처럼 왓치로 항상 사용 가능 이렇게 사용하면 onSubmit의 variables를 사용하지 않아도 됨
  // variables: {
  //   loginInput: {
  //     email: watch('email'),
  //     password: watch('password'),
  //   },
  // },
  // onError,
  // });

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-52 mb-10" />
        <h4 className="w-full font-bold text-left text-3xl mb-5">Let's get started</h4>
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
          <select
            {...register('role', {
              required: 'role is required',
            })}
            className="input"
          >
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={loading} actionText={'Create Account'} />
          {createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error} />}
        </form>
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-lime-600 hover:underline">
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
};
