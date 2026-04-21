import { addToast, Button, Input, Link } from '@heroui/react';
import { sendGTMEvent } from '@next/third-parties/google';
import { useGoogleLogin } from '@react-oauth/google';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { getAxiosInstance } from '../../../services/config';
import { usePostAuthSignUp, usePostAuthSsoGoogle } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import {
  buildSignInHrefWithReturnTo,
  getSafeReturnToParam,
  getStandaloneToolPostAuthReplaceUrl,
} from '../../../utils/standaloneMarketingToolAuth';
import { Icon } from '../../various/Icon';
import { SignUpThankYouMessage } from './SignUpThankYouMessage';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
};

interface Props {
  sourceType?: 'safe-zone-checker';
  onSuccess?: () => void;
}

export const SignUpForm = ({ sourceType, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const router = useRouter();
  const signInHref = React.useMemo(
    () => buildSignInHrefWithReturnTo(router.pathname, router.asPath),
    [router.pathname, router.asPath],
  );

  const { mutate, isPending, isSuccess } = usePostAuthSignUp();
  const { mutate: ssoSignUp, isPending: isSsoPending } = usePostAuthSsoGoogle();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    const returnTo = getSafeReturnToParam(router.asPath) ?? undefined;
    mutate(
      {
        requestBody: {
          ...data,
          sourceType,
          ...(returnTo ? { returnTo } : {}),
        },
      },
      {
        onSuccess: () => {
          sendGTMEvent({ event: 'sign_up' });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      ssoSignUp(
        { requestBody: { token: response.access_token, sourceType } },
        {
          onSuccess: ({ token, redirectToProjectId, user }) => {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            onSuccess?.();
            sendGTMEvent({ event: 'sign_up' });

            if (redirectToProjectId) {
              router.push(`/project/${redirectToProjectId}/assets`);

              return;
            }

            const stayOnToolUrl = getStandaloneToolPostAuthReplaceUrl(
              router.pathname,
              router.asPath,
              user.subscription.isActive,
            );
            if (stayOnToolUrl !== null) {
              router.replace(stayOnToolUrl);

              return;
            }

            if (!user.subscription.isActive) {
              router.push('/?showPlansModal=true');

              return;
            }

            router.push('/');
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
    return <SignUpThankYouMessage onClick={onSuccess} signInHref={signInHref} />;
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
          <span>Sign up</span>
        </Button>
        <Button variant="bordered" isLoading={isSsoPending} fullWidth onClick={() => googleLogin()}>
          <span className="inline-flex items-center gap-1.5">
            Sign up with <Icon icon="google" size={18} className="shrink-0" />
          </span>
        </Button>
      </div>
      <div className="text-center">
        Already have an account?{' '}
        <Link as={NextLink} href={signInHref} color="foreground" underline="always">
          Sign in
        </Link>
      </div>
    </form>
  );
};
