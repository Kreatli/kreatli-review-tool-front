import { addToast, Button, Switch } from '@heroui/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { usePutUserSettings } from '../../../services/hooks';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

interface FormData {
  shareableLinkDownloadDisabled: boolean;
  shareableLinkHeaderHidden: boolean;
}

interface Props {
  shareableLinkDownloadDisabled: boolean;
  shareableLinkHeaderHidden: boolean;
}

export const ShareableLinksForm = (props: Props) => {
  const { mutate, isPending } = usePutUserSettings();

  const formMethods = useForm({
    defaultValues: {
      shareableLinkDownloadDisabled: props.shareableLinkDownloadDisabled ?? false,
      shareableLinkHeaderHidden: props.shareableLinkHeaderHidden ?? false,
    },
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = formMethods;

  const onSubmit = (data: FormData) => {
    if (!isDirty) {
      return;
    }

    mutate(
      {
        requestBody: {
          shareableLinkDownloadDisabled: data.shareableLinkDownloadDisabled,
          shareableLinkHeaderHidden: data.shareableLinkHeaderHidden,
        },
      },
      {
        onSuccess: () => {
          reset({
            shareableLinkDownloadDisabled: data.shareableLinkDownloadDisabled,
            shareableLinkHeaderHidden: data.shareableLinkHeaderHidden,
          });
          addToast({
            title: 'Shareable links preferences were successfully updated',
            color: 'success',
            variant: 'flat',
          });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div>
      <div className="text-lg font-semibold">Shareable links</div>
      <p className="mb-3 text-foreground-500">These preferences apply to all shareable links on projects you own.</p>
      <FormProvider {...formMethods}>
        <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="shareableLinkDownloadDisabled"
            render={({ field }) => (
              <Switch isSelected={field.value} size="sm" onValueChange={field.onChange}>
                <span className="flex flex-col gap-0">
                  <span className="font-medium">Disable download on shareable links</span>
                  <span className="text-foreground-500">
                    People who open shareable links on your projects cannot download files.
                  </span>
                </span>
              </Switch>
            )}
          />
          <Controller
            name="shareableLinkHeaderHidden"
            render={({ field }) => (
              <Switch isSelected={field.value} size="sm" onValueChange={field.onChange}>
                <span className="flex flex-col gap-0">
                  <span className="font-medium">Hide Kreatli navigation on shareable links</span>
                  <span className="text-foreground-500">
                    Shareable links on your projects will not show the Kreatli site navigation.
                  </span>
                </span>
              </Switch>
            )}
          />
          <div className="flex justify-end gap-2">
            {isDirty && (
              <Button variant="flat" isDisabled={isPending} onClick={handleReset}>
                <Icon icon="update" size={18} />
                Reset
              </Button>
            )}
            <Button type="submit" isLoading={isPending} className="bg-foreground text-content1">
              Save changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
