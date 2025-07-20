import { Alert, Button, Progress } from '@heroui/react';
import { AddonDto, UserDto } from '../../../services/types';
import { PlansModal } from '../PlansModal';
import { useState } from 'react';
import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';
import { UpdateAddonModal } from './UpdateAddonModal';
import { CancelSubscriptionModal } from './CancelSubscriptionModal';
import { CancelAddonModal } from './CancelAddonModal';
import { AddAddonModal } from './AddAddonModal';

interface Props {
  user: UserDto;
}

export const Subscription = ({ user }: Props) => {
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [isUpdateAddonModalOpen, setIsUpdateAddonModalOpen] = useState(false);
  const [activeAddon, setActiveAddon] = useState<AddonDto | null>(null);
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false);
  const [isCancelAddonModalOpen, setIsCancelAddonModalOpen] = useState(false);
  const [isAddAddonModalOpen, setIsAddAddonModalOpen] = useState(false);

  const { usersCount, projectsCount, storage } = user.subscription.limits;

  return (
    <div className="shadow-small rounded-medium dark:border border-foreground-300 px-5 p-4">
      <div className="mb-4">
        <div className="text-xl font-semibold">Subscription</div>
        <div className="text-foreground-500">Manage your subscription here.</div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex flex-col">
            <div className="text-lg">
              Current plan: <span className="font-semibold">{user.subscription.planName}</span>
            </div>
            <div className="text-foreground-500 text-sm">${user.subscription.price} per user monthly</div>
          </div>
          <div className="flex items-center gap-2">
            {user.subscription.plan !== 'free' && (
              <Button variant="light" color="danger" onClick={() => setIsCancelSubscriptionModalOpen(true)}>
                Cancel subscription
              </Button>
            )}
            {user.subscription.plan !== 'advanced' && (
              <Button className="bg-foreground text-content1" onClick={() => setIsPlansModalOpen(true)}>
                Upgrade plan
              </Button>
            )}
          </div>
        </div>
        {user.subscription.plan !== 'advanced' && (
          <>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center justify-between">
                <div className="text-sm">Active users</div>
                <div className="text-sm text-foreground-500">
                  {usersCount.used}/{usersCount.max}
                </div>
              </div>
              <Progress value={(usersCount.used / usersCount.max) * 100} size="sm" color="default" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center justify-between">
                <div className="text-sm">Projects</div>
                <div className="text-sm text-foreground-500">
                  {projectsCount.used}/{projectsCount.max}
                </div>
              </div>
              <Progress value={(projectsCount.used / projectsCount.max) * 100} size="sm" color="default" />
            </div>
          </>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center justify-between">
            <div className="text-sm">
              Storage{' '}
              {user.subscription.plan === 'free' && <span className="text-foreground-500">(Total upload*)</span>}
            </div>
            <div className="text-sm text-foreground-500">
              {formatBytes(storage.used)}/{formatBytes(storage.max)}
            </div>
          </div>
          <Progress value={(storage.used / storage.max) * 100} size="sm" color="default" />
        </div>
      </div>
      {user.subscription.plan === 'free' && (
        <Alert
          color="primary"
          description="*Total upload tracks the cumulative size of all files a user has uploaded, even if some are later deleted. This means deleted files still count toward the user's upload limit."
        />
      )}
      {user.subscription.plan !== 'free' && (
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center justify-between">
            <div className="text-lg">Add-ons</div>
          </div>
          <div className="flex flex-col gap-1">
            {user.subscription.addons.map((addon) => (
              <div className="flex gap-2 items-center justify-between">
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
              <Button className="self-start text-content1 bg-foreground" onClick={() => setIsAddAddonModalOpen(true)}>
                Add 100GB for $5
              </Button>
            )}
          </div>
        </div>
      )}
      <PlansModal user={user} isOpen={isPlansModalOpen} onClose={() => setIsPlansModalOpen(false)} />
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
