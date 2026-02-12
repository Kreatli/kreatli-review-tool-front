import { addToast, Button, Input, Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { usePostAuthResetPassword } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const DEFAULT_VALUES = {
  email: '',
};

export const ResetPasswordForm = () => {
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { mutate: resetPassword, isPending } = usePostAuthResetPassword();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    resetPassword(
      { requestBody: data },
      {
        onSuccess: () => {
          reset();
          addToast({ title: 'Check your email for a link to reset your password.', color: 'success', variant: 'flat' });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <form noValidate className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          <span>Reset password</span>
        </Button>
      </div>
      <div className="text-center">
        <Link as={NextLink} href="/sign-in" color="foreground" underline="always">
          Sign in
        </Link>
      </div>
    </form>
  );
};
