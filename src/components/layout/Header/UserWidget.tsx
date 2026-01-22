import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { useSession } from '../../../hooks/useSession';

export const UserWidget = () => {
  const { user, signOut } = useSession();

  if (!user) {
    return null;
  }

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={user.avatar?.url ?? ''}
          size="sm"
          isBordered
          className="ml-2 cursor-pointer"
          fallback={
            <div className="select-none text-lg text-foreground-500">{user.name.slice(0, 1).toUpperCase()}</div>
          }
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" className="w-52">
        <DropdownItem as={NextLink} href="/account" key="account">
          General information
        </DropdownItem>
        <DropdownItem as={NextLink} href="/account/settings" key="settings">
          Settings
        </DropdownItem>
        <DropdownItem as={NextLink} href="/account/subscription" key="subscription">
          Subscription
        </DropdownItem>
        <DropdownItem as={NextLink} showDivider href="/account/billing-history" key="billing-history">
          Billing history
        </DropdownItem>
        <DropdownItem as={NextLink} href="/free-tools" key="free-tools">
          Free tools
        </DropdownItem>
        <DropdownItem key="log-out" onClick={handleLogoutClick}>
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
