import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@heroui/react';
import NextLink from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../../various/Icon';

const ExpandableMenuItem = ({ item, onItemClick }: { item: DropdownMenuItem; onItemClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (item.children && item.children.length > 0) {
    return (
      <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="flex items-center">
          <NextLink
            href={item.href}
            onClick={onItemClick}
            className="group -mx-2 flex w-full items-center justify-between rounded px-2 py-2 transition-colors hover:text-primary sm:py-2.5 md:py-3"
          >
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-semibold leading-tight text-foreground group-hover:text-primary sm:text-base">
                {item.label}
              </span>
              {item.description && (
                <span className="mt-0.5 text-xs leading-relaxed text-foreground-500 sm:mt-1 sm:text-sm">
                  {item.description}
                </span>
              )}
            </div>
            <Icon icon="arrowRight" size={14} className="ml-2 transition-transform" />
          </NextLink>
          {isHovered && (
            <div
              className="absolute left-full top-0 z-50 ml-2 min-w-[240px] rounded-lg border border-foreground-200 bg-background shadow-lg dark:border-foreground-700"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <ul className="p-2">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NextLink
                      href={child.href}
                      onClick={onItemClick}
                      className="group -mx-2 flex w-full items-start rounded px-2 py-2 text-sm transition-colors hover:text-primary"
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="text-xs font-medium leading-tight text-foreground group-hover:text-primary sm:text-sm">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="mt-0.5 text-xs leading-relaxed text-foreground-500">
                            {child.description}
                          </span>
                        )}
                      </div>
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </li>
    );
  }

  return (
    <li>
      <NextLink
        href={item.href}
        onClick={onItemClick}
        className="group -mx-2 flex w-full items-start rounded px-2 py-2 transition-colors hover:text-primary sm:py-2.5 md:py-3"
      >
        <div className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold leading-tight text-foreground group-hover:text-primary sm:text-base">
            {item.label}
          </span>
          {item.description && (
            <span className="mt-0.5 text-xs leading-relaxed text-foreground-500 sm:mt-1 sm:text-sm">
              {item.description}
            </span>
          )}
        </div>
      </NextLink>
    </li>
  );
};

interface DropdownMenuItem {
  label: string;
  href: string;
  description?: string;
  section?: string;
  children?: DropdownMenuItem[];
}

interface NavigationDropdownProps {
  triggerLabel: string;
  items?: DropdownMenuItem[];
  sections?: Array<{ title: string; items: DropdownMenuItem[] }>;
  onItemClick?: () => void;
}

export const NavigationDropdown = ({ triggerLabel, items, sections, onItemClick }: NavigationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // If sections are provided, render two-column layout with Popover
  if (sections && sections.length > 0) {
    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          placement="bottom-start"
          shouldCloseOnBlur={false}
          showArrow={false}
        >
          <PopoverTrigger>
            <button
              type="button"
              className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground-600"
            >
              {triggerLabel}
              <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[280px] max-w-[calc(100vw-2rem)] p-6 sm:min-w-[320px] sm:max-w-[600px]">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {sections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={
                    sectionIndex > 0
                      ? 'border-t border-foreground-200 pt-6 dark:border-foreground-700 sm:pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0'
                      : ''
                  }
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                    {section.title}
                  </h4>
                  <ul>
                    {section.items.map((item) => (
                      <ExpandableMenuItem key={item.href} item={item} onItemClick={handleItemClick} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Default single-column layout with DropdownMenu
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
      <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom-start" shouldCloseOnBlur={false}>
        <DropdownTrigger>
          <button
            type="button"
            className="flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground-600"
          >
            {triggerLabel}
            <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label={triggerLabel} className="min-w-[320px]">
          {items.map((item) => (
            <DropdownItem
              key={item.href}
              as={NextLink}
              href={item.href}
              onClick={handleItemClick}
              textValue={item.label}
              className="py-3"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold">{item.label}</span>
                {item.description && <span className="mt-1 text-sm text-foreground-500">{item.description}</span>}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
