import { addToast, Button, Input } from '@heroui/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { getAxiosInstance } from '../../../services/config';
import { usePostAuthSignUpInvitation } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  email: string;
  token: string;
  onSuccess: () => void;
}

export const InvitationSignUpForm = ({ email, token, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const { mutate, isPending } = usePostAuthSignUpInvitation();

  const onSubmit = (data: { name: string; password: string }) => {
    mutate(
      { requestBody: { ...data, token } },
      {
        onSuccess: (res) => {
          localStorage.setItem('token', res.token);
          getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${res.token}`;
          onSuccess();
        },
        onError: (error) => {
          const errorMessage =
            'response' in error && error.response?.data?.isLinkExpired
              ? 'The link has expired. Please contact the project owner to get a new link.'
              : getErrorMessage(error);

          addToast({ title: errorMessage, color: 'danger', variant: 'flat' });
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
          value={email}
          isReadOnly
        />
        <Input
          label="Name"
          placeholder="John Doe"
          variant="faded"
          isInvalid={!!errors.name}
          labelPlacement="outside"
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}
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
      <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
        Sign up and join
      </Button>
    </form>
  );
};
