import { addToast, Button, Input, Link } from '@heroui/react';
import { useGoogleLogin } from '@react-oauth/google';
import NextLink from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { getAxiosInstance } from '../../../services/config';
import { usePostAuthSignUp, usePostAuthSsoGoogle } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';
import { SignUpThankYouMessage } from './SignUpThankYouMessage';
import { sendGTMEvent } from '@next/third-parties/google';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
};

interface Props {
  onSuccess?: () => void;
}

export const SignUpForm = ({ onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const router = useRouter();

  const { mutate, isPending, isSuccess } = usePostAuthSignUp();
  const { mutate: ssoSignUp, isPending: isSsoPending } = usePostAuthSsoGoogle();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    mutate(
      { requestBody: data },
      {
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      ssoSignUp(
        { requestBody: { token: response.access_token } },
        {
          onSuccess: ({ token }) => {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            onSuccess?.();

            router.push('/');
            sendGTMEvent({ event: 'sign_up' });
          },
          onError: (error) => {
            addToast({
              title: getErrorMessage(error),
              color: 'danger',
              variant: 'flat',
            });
          },
        },
      );
    },
    onError: () => {
      addToast({
        title: 'Failed to sign up with Google. Please try again later.',
        color: 'danger',
        variant: 'flat',
      });
    },
  });

  if (isSuccess) {
    return <SignUpThankYouMessage onClick={onSuccess} />;
  }

  return (
    <form noValidate className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="John Doe"
          variant="faded"
          isInvalid={!!errors.name}
          labelPlacement="outside"
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}
        />
        <Input
          label="Email"
          placeholder="example@mail.com"
          variant="faded"
          labelPlacement="outside"
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
          errorMessage={errors.password?.message}
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          Sign up
        </Button>
        <Button variant="bordered" isLoading={isSsoPending} fullWidth onClick={() => googleLogin()}>
          Sign up with <Icon icon="google" size={18} />
        </Button>
      </div>
      <div className="text-center">
        Already have an account?{' '}
        <Link as={NextLink} href="/sign-in" color="foreground" underline="always">
          Sign in
        </Link>
      </div>
    </form>
  );
};
