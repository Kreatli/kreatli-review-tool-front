import {
  Button,
  Chip,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import { InvoiceDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { formatPrice } from '../../../utils/formatNumber';
import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { BillingHistoryCard } from './BillingHistoryCard';

const STATUS_MAP: Record<string, string> = {
  paid: 'Paid',
  open: 'Open',
  draft: 'Draft',
};

const STATUS_COLOR_MAP: Record<string, 'success' | 'warning' | 'default'> = {
  paid: 'success',
  open: 'warning',
  draft: 'default',
};

interface Props {
  billingHistory: InvoiceDto[] | undefined;
  isPending: boolean;
}

export const BillingHistoryTable = ({ billingHistory, isPending }: Props) => {
  const isMobile = useIsBreakpoint('max', 768);

  if (isMobile) {
    if (isPending) {
      return (
        <div className="grid gap-2 sm:grid-cols-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-32 rounded-medium" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid gap-2 sm:grid-cols-2">
        {(billingHistory ?? []).map((invoice) => (
          <BillingHistoryCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
    );
  }

  return (
    <Table isStriped>
      <TableHeader>
        <TableColumn>Description</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isPending}
        loadingContent={<Spinner />}
        emptyContent={<EmptyState size="sm" title="Your billing history will appear here" />}
      >
        {(billingHistory ?? []).map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>
              {invoice.lines.map((line) => (
                <div key={line.id}>{line.description}</div>
              ))}
            </TableCell>
            <TableCell>{formatPrice(invoice.amount)}</TableCell>
            <TableCell>
              {invoice.status && (
                <Chip variant="flat" size="sm" color={STATUS_COLOR_MAP[invoice.status] ?? 'default'}>
                  {STATUS_MAP[invoice.status] ?? invoice.status}
                </Chip>
              )}
            </TableCell>
            <TableCell>{formatFullDate(invoice.createdAt)}</TableCell>
            <TableCell>
              {invoice.invoicePdf && (
                <Button as="a" href={invoice.invoicePdf} download size="sm" variant="light" isIconOnly radius="full">
                  <Icon icon="download" size={16} />
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
