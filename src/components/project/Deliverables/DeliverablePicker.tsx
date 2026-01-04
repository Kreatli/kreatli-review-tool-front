import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
  ScrollShadow,
} from '@heroui/react';
import { Icon } from '../../various/Icon';
import { DeliverableDto } from '../../../services/types';
import { Http } from '../../../services/httpRequest';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';

interface Props {
  projectId: string;
  skipIds?: string[];
  onSelect: (deliverable: DeliverableDto) => void;
  children: React.ReactNode;
}

export const DeliverablePicker = ({ projectId, skipIds = [], children, onSelect }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [deliverables, setDeliverables] = useState<DeliverableDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  useEffect(() => {
    const loadInitialDeliverables = async () => {
      if (!projectId) {
        setIsLoading(false);
        return;
      }

      isFetching.current = true;
      setIsLoading(true);

      try {
        const response = await Http.getRequest(
          `/project/${projectId}/deliverables`,
          undefined,
          undefined,
          undefined,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          },
        );
        
        console.log('DeliverablePicker - API response:', response);
        
        if (response && Array.isArray(response)) {
          const allDeliverables = response as DeliverableDto[];
          const filteredDeliverables = allDeliverables.filter((deliverable) => !skipIds.includes(deliverable.id));
          console.log('DeliverablePicker - Filtered deliverables:', filteredDeliverables);
          setDeliverables(filteredDeliverables);
        } else {
          console.warn('DeliverablePicker - Unexpected response format:', response);
          setDeliverables([]);
        }
      } catch (error) {
        console.error('Failed to load deliverables:', error);
        setDeliverables([]);
      } finally {
        setIsLoading(false);
        isFetching.current = false;
      }
    };

    if (isVisible && projectId) {
      loadInitialDeliverables();
    } else if (!isVisible) {
      // Reset when modal closes
      setDeliverables([]);
      setSearch('');
      setIsLoading(false);
    }
  }, [isVisible, projectId, skipIds]);

  const debouncedSearch = useDebounceCallback((searchTerm: string) => {
    if (isFetching.current || !projectId) return;

    isFetching.current = true;
    setIsLoading(true);

    Http.getRequest(
      `/project/${projectId}/deliverables`,
      undefined,
      undefined,
      undefined,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )
      .then((response) => {
        if (response && Array.isArray(response)) {
          const allDeliverables = response as DeliverableDto[];
          let filteredDeliverables = allDeliverables.filter((deliverable) => !skipIds.includes(deliverable.id));
          
          if (searchTerm.trim()) {
            filteredDeliverables = filteredDeliverables.filter((deliverable) =>
              deliverable.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          
          setDeliverables(filteredDeliverables);
        } else {
          setDeliverables([]);
        }
      })
      .catch((error) => {
        console.error('Failed to search deliverables:', error);
        setDeliverables([]);
      })
      .finally(() => {
        setIsLoading(false);
        isFetching.current = false;
      });
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsVisible(isOpen);
    if (isOpen) {
      setSearch('');
    }
  };

  const handleDeliverableSelect = (deliverable: DeliverableDto) => {
    onSelect(deliverable);
    setIsVisible(false);
    setSearch('');
  };

  const handleOpenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(true);
  };

  // Clone children to add onClick that opens modal
  const childrenWithHandler = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        ...(children as React.ReactElement).props,
        onClick: (e: React.MouseEvent) => {
          // Call original onClick if it exists
          const originalOnClick = (children as React.ReactElement).props?.onClick;
          if (typeof originalOnClick === 'function') {
            originalOnClick(e);
          }
          // Always open modal
          setIsVisible(true);
        },
      } as any)
    : children;

  return (
    <>
      <span onClick={handleOpenClick} style={{ display: 'inline-block' }}>
        {childrenWithHandler}
      </span>
      <Modal isOpen={isVisible} onClose={() => handleOpenChange(false)} size="2xl" scrollBehavior="inside">
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">Select Deliverable</ModalHeader>
          <ModalBody className="gap-4">
            <Input
              placeholder="Search deliverables..."
              value={search}
              onChange={handleSearchChange}
              startContent={<Icon icon="search" size={18} className="text-foreground-400" />}
              classNames={{
                input: 'text-sm',
                inputWrapper: 'h-10',
              }}
            />
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner size="lg" />
              </div>
            ) : deliverables.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-default-100 flex items-center justify-center mb-4">
                  <Icon icon="file" size={32} className="text-foreground-400" />
                </div>
                <p className="text-sm font-medium text-foreground-600 mb-1">No deliverables found</p>
                <p className="text-xs text-foreground-500">
                  {search ? 'Try a different search term' : 'No deliverables available in this project'}
                </p>
              </div>
            ) : (
              <ScrollShadow className="max-h-[400px]">
                <div className="flex flex-col gap-2">
                  {deliverables.map((deliverable) => (
                    <button
                      key={deliverable.id}
                      type="button"
                      onClick={() => handleDeliverableSelect(deliverable)}
                      className="flex items-center gap-3 rounded-lg border border-default-200 bg-background p-3 text-left hover:border-primary hover:bg-primary-50 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground-900 truncate">{deliverable.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {deliverable.status && (
                            <span className="text-xs text-foreground-500">
                              {deliverable.status}
                            </span>
                          )}
                          {deliverable.dueDate && (
                            <>
                              <span className="text-xs text-foreground-300">•</span>
                              <span className="text-xs text-foreground-500">
                                {new Date(deliverable.dueDate).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <Icon icon="arrowRight" size={16} className="text-foreground-400 shrink-0" />
                    </button>
                  ))}
                </div>
              </ScrollShadow>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

