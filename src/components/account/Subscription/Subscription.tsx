import { Button, Progress } from '@heroui/react';
import { useState } from 'react';

import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { AddonDto, UserDto } from '../../../services/types';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { AddAddonModal } from './AddAddonModal';
import { CancelAddonModal } from './CancelAddonModal';
import { CancelSubscriptionModal } from './CancelSubscriptionModal';
import { UpdateAddonModal } from './UpdateAddonModal';

interface Props {
  user: UserDto;
}

export const Subscription = ({ user }: Props) => {
  const [isUpdateAddonModalOpen, setIsUpdateAddonModalOpen] = useState(false);
  const [activeAddon, setActiveAddon] = useState<AddonDto | null>(null);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
  const [isCancelAddonModalOpen, setIsCancelAddonModalOpen] = useState(false);
  const [isAddAddonModalOpen, setIsAddAddonModalOpen] = useState(false);

  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

  const { usersCount, storage } = user.subscription.limits;

  return (
    <div className="md:rounded-medium md:border-foreground-300 md:p-4 md:px-5 md:shadow-small md:dark:border">
      <div className="mb-4">
        <div className="text-xl font-semibold">Subscription</div>
        <div className="text-foreground-500">Manage your subscription here.</div>
      </div>
      {user.subscription.plan ? (
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div className="flex flex-col">
              <div className="text-lg">
                Current plan:{' '}
                <span className="font-semibold">
                  {user.subscription.planName}
                  {user.subscription.isTrial && ' (free trial)'}
                  {!user.subscription.isActive && ' (inactive)'}
                </span>
              </div>
              {user.subscription.price > 0 && (
                <div className="text-sm text-foreground-500">${user.subscription.price} per user monthly</div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {user.subscription.isActive && !user.subscription.isTrial && (
                <Button variant="flat" color="danger" onClick={() => setIsCancelSubscriptionModalOpen(true)}>
                  Cancel subscription
                </Button>
              )}
              <Button className="bg-foreground text-content1" onClick={() => setIsPlansModalVisible(true)}>
                Upgrade
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm">Active users</div>
              <div className="text-sm text-foreground-500">
                {usersCount.used}/{usersCount.max}
              </div>
            </div>
            <Progress value={(usersCount.used / usersCount.max) * 100} size="sm" color="default" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm">Storage</div>
              <div className="text-sm text-foreground-500">
                {formatBytes(storage.used)}/{formatBytes(storage.max)}
              </div>
            </div>
            <Progress value={(storage.used / storage.max) * 100} size="sm" color="default" />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <Button className="bg-foreground text-content1" onClick={() => setIsPlansModalVisible(true)}>
            {user.subscription.hasUsedTrial ? 'Select a plan' : 'Start free trial'}
          </Button>
        </div>
      )}
      {user.subscription.isActive && !user.subscription.isTrial && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="text-lg">Add-ons</div>
          </div>
          <div className="flex flex-col gap-1">
            {user.subscription.addons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between gap-2">
                <div className="text-sm">
                  {addon.count} x {formatBytes(addon.value)}
                  <span className="text-foreground-500"> (${addon.price * addon.count} monthly)</span>
                </div>
                <div className="flex gap-px">
                  <Button
                    size="sm"
                    isIconOnly
                    radius="full"
                    variant="light"
                    color="default"
                    onClick={() => {
                      setActiveAddon(addon);
                      setIsUpdateAddonModalOpen(true);
                    }}
                  >
                    <Icon icon="edit" size={18} />
                  </Button>
                  <Button
                    size="sm"
                    isIconOnly
                    radius="full"
                    variant="light"
                    color="danger"
                    onClick={() => {
                      setActiveAddon(addon);
                      setIsCancelAddonModalOpen(true);
                    }}
                  >
                    <Icon icon="trash" size={18} />
                  </Button>
                </div>
              </div>
            ))}
            {user.subscription.addons.length === 0 && (
              <Button className="self-start bg-foreground text-content1" onClick={() => setIsAddAddonModalOpen(true)}>
                Add 100GB for $3
              </Button>
            )}
          </div>
        </div>
      )}
      <UpdateAddonModal
        addon={activeAddon}
        isOpen={isUpdateAddonModalOpen}
        onClose={() => setIsUpdateAddonModalOpen(false)}
      />
      <CancelSubscriptionModal
        isOpen={isCancelSubscriptionModalOpen}
        onClose={() => setIsCancelSubscriptionModalOpen(false)}
      />
      <CancelAddonModal
        addon={activeAddon}
        isOpen={isCancelAddonModalOpen}
        onClose={() => setIsCancelAddonModalOpen(false)}
      />
      <AddAddonModal isOpen={isAddAddonModalOpen} onClose={() => setIsAddAddonModalOpen(false)} />
    </div>
  );
};
