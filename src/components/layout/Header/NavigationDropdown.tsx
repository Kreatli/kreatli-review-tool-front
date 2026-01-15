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

interface DropdownMenuItem {
  label: string;
  href: string;
  description?: string;
  section?: string;
  children?: DropdownMenuItem[];
}

interface NavigationDropdownProps {
  triggerLabel: string;
  triggerHref?: string;
  items?: DropdownMenuItem[];
  sections?: Array<{ title: string; items: DropdownMenuItem[] }>;
  onItemClick?: () => void;
  headerLink?: { label: string; href: string };
}

export const NavigationDropdown = ({
  triggerLabel,
  triggerHref,
  items,
  sections,
  onItemClick,
  headerLink,
}: NavigationDropdownProps) => {
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
              {triggerHref ? (
                <>
                  <NextLink
                    href={triggerHref}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="hover:text-foreground-600"
                  >
                    {triggerLabel}
                  </NextLink>
                  <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </>
              ) : (
                <>
                  {triggerLabel}
                  <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </>
              )}
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
                      <li key={item.href}>
                        <NextLink
                          href={item.href}
                          onClick={handleItemClick}
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
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {headerLink && (
              <div className="mt-6 pt-4">
                <NextLink
                  href={headerLink.href}
                  onClick={handleItemClick}
                  className="group flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-600"
                >
                  {headerLink.label}
                  <Icon icon="arrowRight" size={14} />
                </NextLink>
              </div>
            )}
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
            {triggerHref ? (
              <>
                <NextLink
                  href={triggerHref}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="hover:text-foreground-600"
                >
                  {triggerLabel}
                </NextLink>
                <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </>
            ) : (
              <>
                {triggerLabel}
                <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </>
            )}
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
