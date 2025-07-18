import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '../../various/Icon';

interface Props {
  name: string;
  description: string;
  price: number;
  isLoading: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  features: string[];
  onClick: () => void;
}

export const Plan = ({ name, price, description, features, isCurrent, isSelected, isLoading, onClick }: Props) => {
  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="text-sm text-primary">{name}</div>
          <div>
            <span className="text-4xl font-semibold">${price}</span>
            {price > 0 && <span className="text-sm text-foreground-500"> /month per user</span>}
          </div>
        </div>

        <div>
          <ul className="flex flex-col gap-0.5">
            {features.map((feature, idx) => (
              <li key={idx}>
                <div className="text-md items-center flex gap-1">
                  <Icon icon="check" size={16} />
                  {feature}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 text-sm text-foreground-500 border-t border-foreground-300 pt-4">{description}</div>
        <Button
          disabled={isCurrent}
          isLoading={isSelected && isLoading}
          color="primary"
          variant={isCurrent ? 'flat' : 'solid'}
          onClick={onClick}
        >
          {isCurrent ? 'Current plan' : `Upgrade to ${name}`}
        </Button>
      </CardBody>
    </Card>
  );
};
