import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@heroui/react';

import { InvoiceDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';
import { formatPrice } from '../../../utils/formatNumber';
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

interface Props {
  invoice: InvoiceDto;
}

export const BillingHistoryCard = ({ invoice }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="text-sm font-semibold">
          {invoice.lines.map((line) => (
            <div key={line.id}>{line.description}</div>
          ))}
        </div>
      </CardHeader>
      <CardBody className="py-0">
        <div className="text-sm">
          Total: <span className="text-foreground-500">{formatPrice(invoice.amount)}</span>
        </div>
        <div className="text-sm">
          Date: <span className="text-foreground-500">{formatFullDate(invoice.createdAt)}</span>
        </div>
        {invoice.status && (
          <div className="text-sm">
            Status:{' '}
            <Chip variant="flat" size="sm" color={STATUS_COLOR_MAP[invoice.status] ?? 'default'}>
              {STATUS_MAP[invoice.status] ?? invoice.status}
            </Chip>
          </div>
        )}
      </CardBody>
      {invoice.invoicePdf && (
        <CardFooter>
          <Button size="sm" variant="flat" as="a" href={invoice.invoicePdf} download>
            <Icon icon="download" size={16} />
            Download invoice
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
