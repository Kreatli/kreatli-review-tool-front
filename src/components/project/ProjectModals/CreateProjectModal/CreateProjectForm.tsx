import { addToast, Button, Input, Link, Textarea } from '@heroui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { usePostProject } from '../../../../services/hooks';
import { getErrorMessage } from '../../../../utils/getErrorMessage';
import { Icon } from '../../../various/Icon';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../../services/services';
import { useSession } from '../../../../hooks/useSession';

const DEFAULT_VALUES = {
  name: '',
  description: '',
  members: [] as { email: string }[],
};

export const CreateProjectForm = () => {
  const router = useRouter();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: DEFAULT_VALUES });
  const { fields, append, remove } = useFieldArray({ control, name: 'members' });

  const [isAddingMembers, setIsAddingMembers] = React.useState(false);
  const { mutate, isPending } = usePostProject();
  const queryClient = useQueryClient();
  const { user } = useSession();

  const onSubmit = ({ members, ...data }: typeof DEFAULT_VALUES) => {
    mutate(
      { requestBody: { ...data, members: members.map(({ email }) => email) } },
      {
        onSuccess: (response) => {
          router.push(`/project/${response.id}`);
          queryClient.invalidateQueries({ queryKey: [getUser.key] });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleAddMembersClick = () => {
    setIsAddingMembers(true);
    append({ email: '' });
  };

  const handleAddMore = () => {
    append({ email: '' });
  };

  const handleRemove = (index: number) => () => {
    remove(index);

    if (fields.length === 1) {
      setIsAddingMembers(false);
    }
  };

  const shouldShowAddMore =
    user?.subscription.plan === 'advanced' || fields.length < (user?.subscription.limits.usersCount.max ?? 0) - 1;

  return (
    <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        placeholder="My project"
        variant="faded"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      {fields.length > 0 && (
        <div className="flex flex-col gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="relative flex items-center gap-2">
              <Input
                label="Member email"
                placeholder="member@email.com"
                variant="faded"
                isInvalid={!!errors.members?.[index]?.email}
                errorMessage={errors.members?.[index]?.email?.message}
                {...register(`members.${index}.email`, VALIDATION_RULES.EMAIL)}
              />
              <Button
                isIconOnly
                radius="full"
                className="absolute right-2 top-3 text-foreground hover:text-danger"
                variant="light"
                color="danger"
                size="sm"
                onClick={handleRemove(index)}
              >
                <Icon icon="trash" size={18} />
              </Button>
            </div>
          ))}
          {shouldShowAddMore && (
            <>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                as="button"
                type="button"
                color="foreground"
                className="w-fit gap-1"
                size="sm"
                onClick={handleAddMore}
              >
                <Icon icon="plus" size={14} />
                Add more
              </Link>
            </>
          )}
        </div>
      )}
      {!isAddingMembers && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          as="button"
          type="button"
          color="foreground"
          className="w-fit gap-1"
          size="sm"
          onClick={handleAddMembersClick}
        >
          <Icon icon="plus" size={14} />
          Add project members
        </Link>
      )}
      <Button type="submit" isLoading={isPending} className="ml-auto w-fit bg-foreground text-content1">
        Create
      </Button>
    </form>
  );
};
