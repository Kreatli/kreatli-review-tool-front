import { Input, Popover, PopoverContent, PopoverTrigger, Spinner } from '@heroui/react';
import React, { PropsWithChildren, useCallback, useRef } from 'react';
import { AssetDto } from '../../../services/types';
import { getAssets } from '../../../services/services';
import { useDebounceCallback } from '../../../hooks/useDebounceCallback';
import { AssetPickerItem } from './AssetPickerItem';

interface Props {
  projectId: string;
  skipIds?: string[];
  onSelect: (asset: AssetDto) => void;
}

export const AssetPicker = ({ projectId, skipIds = [], children, onSelect }: PropsWithChildren<Props>) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [offset, setOffset] = React.useState(0);
  const [assets, setAssets] = React.useState<AssetDto[]>([]);
  const [assetsCount, setAssetsCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const isFetching = React.useRef(false);

  React.useEffect(() => {
    const loadInitialAssets = async () => {
      isFetching.current = true;

      setIsLoading(true);
      isFetching.current = true;

      const data = await getAssets({ projectId, limit: 50, offset: 0, query: '', skipIds });
      setAssetsCount(data.fileCount);
      setAssets(data.files);
      setIsLoading(false);
      isFetching.current = false;
    };

    loadInitialAssets();
  }, []);

  const loadAssets = async (offset: number, search: string) => {
    isFetching.current = true;

    if (offset === 0) {
      setIsLoading(true);
    }

    const data = await getAssets({ projectId, limit: 50, offset, query: search, skipIds });

    setAssetsCount(data.fileCount);

    if (offset === 0) {
      setAssets(data.files);
    } else {
      setAssets((prev) => [...prev, ...data.files]);
    }

    isFetching.current = false;
    setIsLoading(false);
  };

  const debouncedSearchAssets = useDebounceCallback((search: string) => {
    loadAssets(offset, search);
  }, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearchAssets(e.target.value);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsVisible(isOpen);

    if (isOpen) {
      setSearch('');
      setOffset(0);
      loadAssets(0, '');
    }
  };

  const handleAssetSelect = (asset: AssetDto) => {
    onSelect(asset);
    setIsVisible(false);
  };

  const handleLoadMore = useCallback(() => {
    if (isFetching.current) return;

    setOffset(offset + 50);
    loadAssets(offset + 50, search);
  }, [offset, search]);

  const spinnerRef = useCallback(
    (node: HTMLDivElement) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node && assetsCount > assets.length) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              handleLoadMore();
            }
          },
          {
            threshold: 0.1,
          },
        );

        observerRef.current.observe(node);
      }
    },
    [assets.length, assetsCount, handleLoadMore],
  );

  return (
    <Popover placement="top-start" onOpenChange={handleOpenChange} isOpen={isVisible}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-1">
        <div className="h-96 overflow-auto max-w-full w-[500px]">
          <div className="p-2 sticky top-0 z-30">
            <Input placeholder="Search..." value={search} onChange={handleSearchChange} size="sm" />
          </div>
          {assets.length > 0 && !isLoading && (
            <div className="flex flex-col p-2">
              {assets.map((asset) => (
                <AssetPickerItem key={asset.id} asset={asset} onClick={() => handleAssetSelect(asset)} />
              ))}
              {assetsCount > assets.length && (
                <div ref={spinnerRef} className="flex justify-center p-2">
                  <Spinner size="sm" color="default" />
                </div>
              )}
            </div>
          )}
          {assets.length === 0 && !isLoading && (
            <div className="text-foreground-500 text-center p-2">No assets found</div>
          )}
          {isLoading && (
            <div className="flex items-center justify-center p-2">
              <Spinner color="default" />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
