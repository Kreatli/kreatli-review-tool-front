import { addToast, Button, Input } from '@heroui/react';
import { sendGTMEvent } from '@next/third-parties/google';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { usePostAppSummoOauthActivate } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
};

interface Props {
  appSummoLicenseKey: string;
  onSuccess?: () => void;
}

export const AppSummoSignUpForm = ({ appSummoLicenseKey, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { mutate, isPending } = usePostAppSummoOauthActivate();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    mutate(
      { requestBody: data, queryParams: { appSummoLicenseKey } },
      {
        onSuccess: () => {
          sendGTMEvent({ event: 'sign_up' });
          onSuccess?.();
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
          <span>Activate account</span>
        </Button>
      </div>
    </form>
  );
};
