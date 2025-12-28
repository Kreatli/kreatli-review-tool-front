import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import NextLink from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../../various/Icon';

interface DropdownMenuItem {
  label: string;
  href: string;
  description?: string;
  section?: string;
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
              className="text-foreground hover:text-foreground-600 transition-colors font-medium flex items-center gap-1"
            >
              {triggerLabel}
              <Icon icon="chevronDown" size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-6 w-full max-w-[calc(100vw-2rem)] sm:max-w-[600px] min-w-[280px] sm:min-w-[320px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sections.map((section, sectionIndex) => (
                <div
                  key={section.title}
                  className={
                    sectionIndex > 0
                      ? 'pt-6 sm:pt-8 md:pt-0 md:pl-10 md:border-l border-t md:border-t-0 border-foreground-200 dark:border-foreground-700'
                      : ''
                  }
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <NextLink
                          href={item.href}
                          onClick={handleItemClick}
                          className="flex items-start group hover:text-primary transition-colors py-2 sm:py-2.5 md:py-3 -mx-2 px-2 rounded w-full"
                        >
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary leading-tight">
                              {item.label}
                            </span>
                            {item.description && (
                              <span className="text-xs sm:text-sm text-foreground-500 mt-0.5 sm:mt-1 leading-relaxed">
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
            className="text-foreground hover:text-foreground-600 transition-colors font-medium flex items-center gap-1"
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
                <span className="font-semibold text-base">{item.label}</span>
                {item.description && <span className="text-sm text-foreground-500 mt-1">{item.description}</span>}
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
