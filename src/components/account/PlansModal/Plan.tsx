import { Button, Card, CardBody, Chip, Tooltip } from '@heroui/react';

import { Icon } from '../../various/Icon';

interface Props {
  name: string;
  description: string;
  price?: number;
  isTrialAvailable: boolean;
  isLoading: boolean;
  isSelected: boolean;
  isCurrent: boolean;
  isCurrentTrial: boolean;
  features: { label: string; tooltip?: string; hideIcon?: boolean }[];
  onClick: () => void;
}

export const Plan = ({
  name,
  price,
  isTrialAvailable,
  description,
  features,
  isCurrent,
  isCurrentTrial,
  isSelected,
  isLoading,
  onClick,
}: Props) => {
  return (
    <Card className="w-full border-foreground-300 dark:border">
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <Chip size="sm" variant="faded">
              {name}
            </Chip>
            {isCurrent && !isCurrentTrial && (
              <Chip size="sm" variant="flat" color="primary">
                Current plan
              </Chip>
            )}
            {isCurrent && isCurrentTrial && (
              <Chip size="sm" variant="flat" color="primary">
                Current trial
              </Chip>
            )}
          </div>
          {price ? (
            <div className="flex items-end gap-1.5">
              <span className="font-sans text-4xl font-semibold leading-8">${price}</span>
              {price > 0 && (
                <span className="text-xs leading-3 text-foreground-500">
                  {' '}
                  per user <br /> per month
                </span>
              )}
            </div>
          ) : (
            <div className="font-sans text-4xl font-semibold leading-8">Custom</div>
          )}
        </div>
        <div className="pb-2 text-sm text-foreground-500">{description}</div>
        <div className="flex-1">
          <ul className="flex flex-col gap-0.5">
            {features.map((feature, idx) => (
              <li key={idx}>
                <div className="flex items-center gap-1 text-sm">
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
        {price ? (
          <Button
            disabled={isCurrent && !isCurrentTrial}
            isLoading={isSelected && isLoading}
            color="default"
            className={isCurrent && !isCurrentTrial ? '' : 'bg-foreground text-content1'}
            variant={isCurrent && !isCurrentTrial ? 'bordered' : 'solid'}
            onClick={onClick}
          >
            {isCurrent && !isCurrentTrial ? 'Current plan' : isTrialAvailable ? 'Start free trial' : 'Upgrade'}
          </Button>
        ) : (
          <Button
            as="a"
            href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
            target="_blank"
            className="bg-foreground text-content1"
          >
            Book a demo
          </Button>
        )}
      </CardBody>
    </Card>
  );
};
