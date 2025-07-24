import { addToast, Button, Input, Link } from '@heroui/react';
import { useGoogleLogin } from '@react-oauth/google';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { getAxiosInstance } from '../../../services/config';
import { usePostAuthSignIn, usePostAuthSsoGoogle } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

interface Props {
  email?: string;
  showLinks?: boolean;
  onSuccess: () => void;
}

export const SignInForm = ({ email, showLinks = true, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { ...DEFAULT_VALUES, email: email ?? DEFAULT_VALUES.email },
    mode: 'onTouched',
  });

  const { mutate: signIn, isPending } = usePostAuthSignIn();
  const { mutate: ssoSignIn } = usePostAuthSsoGoogle();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    signIn(
      { requestBody: data },
      {
        onSuccess: ({ token }) => {
          localStorage.setItem('token', token);
          getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
          onSuccess();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      ssoSignIn(
        { requestBody: { token: response.access_token } },
        {
          onSuccess: ({ token }) => {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            onSuccess();
          },
          onError: (error) => {
            addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
          },
        },
      );
    },
    onError: () => {
      addToast({
        title: 'Failed to sign in with Google. Please try again later.',
        color: 'danger',
        variant: 'flat',
      });
    },
  });

  return (
    <form noValidate className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          placeholder="example@mail.com"
          variant="faded"
          labelPlacement="outside"
          isReadOnly={!!email}
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <Input
          label="Password"
          placeholder=" "
          variant="faded"
          labelPlacement="outside"
          type="password"
          isInvalid={!!errors.password}
          {...register('password', VALIDATION_RULES.REQUIRED)}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          Sign in
        </Button>
        <Button type="button" variant="bordered" fullWidth onClick={() => googleLogin()}>
          Sign in with <Icon icon="google" size={18} />
        </Button>
      </div>
      {showLinks && (
        <div className="flex flex-col gap-2">
          <div className="text-center">
            Don&apos;t have an account?{' '}
            <Link as={NextLink} href="/sign-up" color="foreground" underline="always">
              Sign up
            </Link>
          </div>
          <div className="text-center text-foreground-500">
            Forgot password?{' '}
            <Link as={NextLink} href="/reset-password" className="text-foreground-500" underline="always">
              Reset it
            </Link>
          </div>
        </div>
      )}
    </form>
  );
};
