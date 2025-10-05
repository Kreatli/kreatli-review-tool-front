import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';
import { Icon } from '../../various/Icon';

interface Props {
  name: string;
  description: string;
  price: number;
  isLoading: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  features: { label: string; tooltip?: string; hideIcon?: boolean }[];
  onClick: () => void;
}

export const Plan = ({ name, price, description, features, isCurrent, isSelected, isLoading, onClick }: Props) => {
  return (
    <Card className="w-full dark:border border-foreground-300">
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Chip size="sm" variant="faded">
            {name}
          </Chip>
          <div className="flex items-end gap-1.5">
            <span className="text-4xl font-sans leading-8 font-semibold">${price}</span>
            {price > 0 && (
              <span className="text-xs text-foreground-500 leading-3">
                {' '}
                per user <br /> per month
              </span>
            )}
          </div>
        </div>
        <div className="text-sm text-foreground-500 pb-2">{description}</div>
        <div className="flex-1">
          <ul className="flex flex-col gap-0.5">
            {features.map((feature, idx) => (
              <li key={idx}>
                <div className="text-sm items-center flex gap-1">
                  {!feature.hideIcon && <Icon icon="check" size={16} />}
                  {feature.label}
                  {feature.tooltip && (
                    <Tooltip content={feature.tooltip} className="max-w-sm">
                      <div>
                        <Icon icon="infoCircle" size={16} className="text-foreground-400" />
                      </div>
                    </Tooltip>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Button
          disabled={isCurrent}
          isLoading={isSelected && isLoading}
          color="default"
          className={isCurrent ? '' : 'bg-foreground text-content1'}
          variant={isCurrent ? 'bordered' : 'solid'}
          onClick={onClick}
        >
          {isCurrent ? 'Current plan' : `Upgrade to ${name}`}
        </Button>
      </CardBody>
    </Card>
  );
};
