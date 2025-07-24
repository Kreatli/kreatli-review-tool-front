import { addToast, Button, Input } from '@heroui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { getAxiosInstance } from '../../../services/config';
import { usePostAuthNewPassword } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const DEFAULT_VALUES = {
  password: '',
  passwordRepeat: '',
};

interface Props {
  token: string;
  onSuccess: () => void;
}

export const NewPasswordForm = ({ token, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { mutate: setNewPassword, isPending } = usePostAuthNewPassword();

  const onSubmit = ({ password }: typeof DEFAULT_VALUES) => {
    setNewPassword(
      { requestBody: { token, password } },
      {
        onSuccess: (response) => {
          addToast({ title: 'New password set successfully', color: 'success', variant: 'flat' });
          localStorage.setItem('token', response.token);
          getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${response.token}`;
          onSuccess();
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
          label="Password"
          placeholder=" "
          variant="faded"
          labelPlacement="outside"
          type="password"
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
        <Input
          label="Repeat password"
          placeholder=" "
          variant="faded"
          labelPlacement="outside"
          type="password"
          errorMessage={errors.passwordRepeat?.message}
          isInvalid={!!errors.passwordRepeat}
          {...register('passwordRepeat', {
            validate: (passwordRepeat, { password }) => passwordRepeat === password || 'Passwords do not match',
          })}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          Set new password
        </Button>
      </div>
    </form>
  );
};
