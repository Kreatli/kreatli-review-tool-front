import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';

import { useGetUserBillingHistory } from '../../../services/hooks';
import { formatFullDate } from '../../../utils/dates';
import { formatPrice } from '../../../utils/formatNumber';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';

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

export const BillingHistory = () => {
  const { data: billingHistory, isPending } = useGetUserBillingHistory();

  return (
    <div className="rounded-medium border-foreground-300 p-4 px-5 shadow-small dark:border">
      <div>
        <div className="text-xl font-semibold">Billing history</div>
        <div className="text-foreground-500">View your billing history here.</div>
      </div>
      <div className="mt-6">
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
            {/* @ts-expect-error - Invoice is not typed */}
            {billingHistory?.map((invoice) => (
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
                    <Button
                      as="a"
                      href={invoice.invoicePdf}
                      download
                      size="sm"
                      variant="light"
                      isIconOnly
                      radius="full"
                    >
                      <Icon icon="download" size={16} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
