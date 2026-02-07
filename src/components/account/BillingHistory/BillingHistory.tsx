import { useGetUserBillingHistory } from '../../../services/hooks';
import { BillingHistoryTable } from './BillingHistoryTable';

export const BillingHistory = () => {
  const { data: billingHistory, isPending } = useGetUserBillingHistory();

  return (
    <div className="md:rounded-medium md:border-foreground-300 md:p-4 md:px-5 md:shadow-small md:dark:border">
      <div>
        <div className="text-xl font-semibold">Billing history</div>
        <div className="text-foreground-500">View your billing history here.</div>
      </div>
      <div className="mt-6">
        <BillingHistoryTable billingHistory={billingHistory} isPending={isPending} />
      </div>
    </div>
  );
};
