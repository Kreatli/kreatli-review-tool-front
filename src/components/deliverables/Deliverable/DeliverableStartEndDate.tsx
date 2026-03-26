import { DateRangePicker } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import { useController } from 'react-hook-form';

interface FormData {
  startDate: string;
  endDate: string;
}

interface Props {
  autoFocus?: boolean;
  isOpen?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const DeliverableStartEndDate = ({
  autoFocus,
  isOpen,
  size,
  label = 'Start and end date',
  onOpenChange,
}: Props) => {
  const { field: startDateField, fieldState: startDateFieldState } = useController<FormData>({
    name: 'startDate',
    rules: { required: true },
  });
  const { field: endDateField, fieldState: endDateFieldState } = useController<FormData>({
    name: 'endDate',
    rules: { required: true },
  });

  const startIsoDate = startDateField.value ? new Date(startDateField.value).toISOString().split('T')[0] : undefined;
  const endIsoDate = endDateField.value ? new Date(endDateField.value).toISOString().split('T')[0] : undefined;

  return (
    <DateRangePicker
      label={label}
      isOpen={isOpen}
      autoFocus={autoFocus}
      size={size}
      value={
        startIsoDate && endIsoDate
          ? { start: parseDate(startIsoDate), end: parseDate(endIsoDate) }
          : null
      }
      isInvalid={!!startDateFieldState.error || !!endDateFieldState.error}
      selectorButtonPlacement="start"
      visibleMonths={2}
      onChange={(dateRange) => {
        startDateField.onChange(dateRange?.start.toDate('UTC'));
        endDateField.onChange(dateRange?.end.toDate('UTC'));
      }}
      onOpenChange={onOpenChange}
    />
  );
};
