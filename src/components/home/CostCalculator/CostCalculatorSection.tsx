import { Card, CardBody, cn, Slider, Tooltip } from '@heroui/react';
import { useMemo, useState } from 'react';
import { LogoCheckbox } from './LogoCheckbox';
import { formatPrice } from '../../../utils/formatNumber';
import { Icon } from '../../various/Icon';

export const pricing = {
  'google-drive': [[101, 15]],
  'we-transfer': [
    [25, 20],
    [101, 25],
  ],
  'frame-io': [
    [5, 15],
    [15, 25],
    [101, 50],
  ],
  playbook: [
    [2, 12],
    [101, 20],
  ],
  'click-up': [
    [5, 10],
    [101, 19],
  ],
  asana: [
    [10, 15],
    [101, 32],
  ],
  monday: [
    [5, 13],
    [10, 16],
    [101, 27],
  ],
  trello: [
    [5, 6],
    [50, 13],
    [101, 18],
  ],
  dropbox: [
    [3, 22],
    [10, 16],
    [101, 23],
  ],
  autodesk: [[101, 50]],
  ziflow: [
    [15, 17],
    [25, 20],
    [101, 25],
  ],
  filestage: [
    [5, 10],
    [101, 15],
  ],
};

type Tool =
  | 'google-drive'
  | 'we-transfer'
  | 'frame-io'
  | 'playbook'
  | 'click-up'
  | 'asana'
  | 'monday'
  | 'trello'
  | 'dropbox'
  | 'autodesk'
  | 'ziflow'
  | 'filestage';

export const CostCalculatorSection = () => {
  const [usersCount, setUsersCount] = useState(5);
  const [activeTools, setActiveTools] = useState<Tool[]>(['google-drive', 'asana', 'frame-io']);

  const handleSelectionChange = (tool: Tool) => (isSelected: boolean) => {
    if (isSelected) {
      setActiveTools([...activeTools, tool]);

      return;
    }

    setActiveTools((prev) => prev.filter((activeTool) => activeTool !== tool));
  };

  const activeToolsCost = useMemo(() => {
    return activeTools.reduce((acc, tool) => {
      const price = pricing[tool].find(([users]) => users > usersCount)?.[1];

      if (price) {
        return acc + price * usersCount;
      }

      return acc;
    }, 0);
  }, [usersCount, activeTools]);

  const kreatliCost = useMemo(() => {
    if (usersCount <= 5) {
      return 15 * usersCount;
    }

    return 20 * usersCount;
  }, [usersCount]);

  return (
    <section id="software-cost-calculator" className="backdrop-blur-lg lg:py-32 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12 items-center">
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">Software Cost Calculator</h2>
          <p className="text-lg text-foreground-500 text-center">
            Estimate monthly and annual software spend based on team size and tools
          </p>
        </div>
        <div className="grid md:grid-cols-2 w-full gap-4">
          <div className="flex flex-col gap-4">
            <Card className="dark:border border-foreground-300 w-full">
              <CardBody className="p-4 sm:p-6 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-bold font-sans">Team Size</h3>
                <Slider
                  color="foreground"
                  value={usersCount}
                  onChange={(value) => setUsersCount(value as number)}
                  minValue={1}
                  label="Number of team members"
                  classNames={{
                    label: 'sm:text-md text-foreground-500',
                    value: 'sm:text-md font-bold font-sans tabular-nums',
                  }}
                  size="md"
                  showOutline
                  showTooltip
                />
              </CardBody>
            </Card>
            <Card className="dark:border border-foreground-300 w-full">
              <CardBody className="p-4 sm:p-6 flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-bold font-sans">Tool Stack</h3>
                <div className="flex flex-col gap-2">
                  <h4 className="text-foreground-500">File Storage/Sharing:</h4>
                  <div className="flex flex-wrap gap-2">
                    <LogoCheckbox
                      src="/logos/google-drive.svg"
                      label="Google Drive"
                      isSelected={activeTools.includes('google-drive')}
                      onSelectionChange={handleSelectionChange('google-drive')}
                    />
                    <LogoCheckbox
                      src="/logos/dropbox.svg"
                      label="Dropbox"
                      isSelected={activeTools.includes('dropbox')}
                      onSelectionChange={handleSelectionChange('dropbox')}
                    />
                    <LogoCheckbox
                      src="/logos/we-transfer.svg"
                      label="WeTransfer"
                      isSelected={activeTools.includes('we-transfer')}
                      onSelectionChange={handleSelectionChange('we-transfer')}
                    />
                    <LogoCheckbox
                      src="/logos/playbook.svg"
                      label="Playbook"
                      isSelected={activeTools.includes('playbook')}
                      onSelectionChange={handleSelectionChange('playbook')}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-foreground-500">Project Management:</h4>
                  <div className="flex flex-wrap gap-2">
                    <LogoCheckbox
                      src="/logos/asana.svg"
                      label="Asana"
                      isSelected={activeTools.includes('asana')}
                      onSelectionChange={handleSelectionChange('asana')}
                    />
                    <LogoCheckbox
                      src="/logos/click-up.svg"
                      label="Clickup"
                      isSelected={activeTools.includes('click-up')}
                      onSelectionChange={handleSelectionChange('click-up')}
                    />
                    <LogoCheckbox
                      src="/logos/monday.svg"
                      label="Monday"
                      isSelected={activeTools.includes('monday')}
                      onSelectionChange={handleSelectionChange('monday')}
                    />
                    <LogoCheckbox
                      src="/logos/trello.svg"
                      label="Trello"
                      isSelected={activeTools.includes('trello')}
                      onSelectionChange={handleSelectionChange('trello')}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-foreground-500">Media Review & Approval:</h4>
                  <div className="flex flex-wrap gap-2">
                    <LogoCheckbox
                      src="/logos/frame-io.svg"
                      label="Frame IO"
                      isSelected={activeTools.includes('frame-io')}
                      onSelectionChange={handleSelectionChange('frame-io')}
                    />
                    <LogoCheckbox
                      src="/logos/autodesk.svg"
                      label="Autodesk"
                      isSelected={activeTools.includes('autodesk')}
                      onSelectionChange={handleSelectionChange('autodesk')}
                    />
                    <LogoCheckbox
                      src="/logos/ziflow.svg"
                      label="Ziflow"
                      isSelected={activeTools.includes('ziflow')}
                      onSelectionChange={handleSelectionChange('ziflow')}
                    />
                    <LogoCheckbox
                      src="/logos/filestage.png"
                      label="Filestage"
                      isSelected={activeTools.includes('filestage')}
                      onSelectionChange={handleSelectionChange('filestage')}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="dark:border border-foreground-300">
              <CardBody className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
                <h3 className="text-xl font-bold font-sans text-center">How much you are overpaying</h3>
                <div className="flex sm:flex-row md:flex-col lg:flex-row gap-x-6 gap-y-3 justify-center">
                  <div className="flex flex-col items-center">
                    <div className="text-foreground-500 text-sm sm:text-md">Per month:</div>
                    <div
                      className={cn('text-2xl sm:text-3xl font-bold font-sans', {
                        'text-danger': activeToolsCost - kreatliCost > 0,
                      })}
                    >
                      {activeToolsCost - kreatliCost > 0
                        ? `${formatPrice(activeToolsCost - kreatliCost, { minimumFractionDigits: 0 })}↓`
                        : '$0'}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-foreground-500 text-sm sm:text-md">Per year:</div>
                    <div
                      className={cn('text-2xl sm:text-3xl font-bold font-sans', {
                        'text-danger': activeToolsCost - kreatliCost > 0,
                      })}
                    >
                      {activeToolsCost - kreatliCost > 0
                        ? `${formatPrice((activeToolsCost - kreatliCost) * 12, { minimumFractionDigits: 0 })}↓`
                        : '$0'}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="dark:border border-foreground-300">
                <CardBody className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl flex gap-1 items-center font-bold font-sans">
                    Current Tool Stack
                    <Tooltip
                      className="max-w-xs"
                      content="Estimates use list pricing; actual savings depend on contracts and discounts."
                    >
                      <span className="inline-block">
                        <Icon icon="infoCircle" size="20" />
                      </span>
                    </Tooltip>
                  </h3>
                  <div className="flex md:flex-row lg:flex-col gap-3">
                    <div className="flex flex-col">
                      <div className="text-foreground-500 text-sm sm:text-md">Cost per month:</div>
                      <div className="text-2xl sm:text-3xl font-bold font-sans">
                        {formatPrice(activeToolsCost, { minimumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-foreground-500 text-sm sm:text-md">Cost per year:</div>
                      <div className="text-2xl sm:text-3xl font-bold font-sans">
                        {formatPrice(activeToolsCost * 12, { minimumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <Card className="dark:border border-foreground-300">
                <CardBody className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl font-bold font-sans">Kreatli</h3>
                  <div className="flex md:flex-row lg:flex-col gap-3">
                    <div className="flex flex-col">
                      <div className="text-foreground-500 text-sm sm:text-md">Cost per month:</div>
                      <div className="text-2xl sm:text-3xl font-bold font-sans text-success-600">
                        {formatPrice(kreatliCost, { minimumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-foreground-500 text-sm sm:text-md">Cost per year:</div>
                      <div className="text-2xl sm:text-3xl font-bold font-sans text-success-600">
                        {formatPrice(kreatliCost * 12, { minimumFractionDigits: 0 })}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
