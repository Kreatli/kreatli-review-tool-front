'use client';

import { addToast, Button, Card, CardBody, cn, Input } from '@heroui/react';
import React, { useCallback, useMemo, useState } from 'react';

import { useFreeToolsInactiveGate } from '../../contexts/FreeToolsInactiveGateContext';
import { useSession } from '../../hooks/useSession';
import { useSignUpModalVisibility } from '../../hooks/useSignUpModalVisibility';
import { decodeHtmlEntities } from '../../utils/decodeHtmlEntities';
import { downloadFromUrl } from '../../utils/download';
import { Icon } from '../various/Icon';

type ResolveResponse =
  | {
      ok: true;
      source: 'embedded' | 'opengraph';
      videoUrl: string;
      hdVideoUrl?: string;
      thumbnailUrl?: string;
      title?: string;
      author?: string;
      watermarked: boolean;
    }
  | { ok: false; code: string; message: string };

const EXAMPLE_URL = 'https://www.facebook.com/reel/1234567890123456/';

function isProbablyFacebookReelUrl(input: string) {
  try {
    const url = new URL(input);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
    const allowedHost =
      host === 'facebook.com' ||
      host === 'www.facebook.com' ||
      host === 'm.facebook.com' ||
      host === 'fb.watch';
    if (!allowedHost) return false;

    const path = url.pathname.toLowerCase();
    if (host === 'fb.watch') return path.length > 1;
    if (path.startsWith('/reel/')) return true;
    if (path.startsWith('/watch')) return Boolean(url.searchParams.get('v'));
    return /\/videos\/\d+/.test(path);
  } catch {
    return false;
  }
}

function safeFileName(input: string) {
  const base = input.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
  return base || 'facebook_reel';
}

export function FacebookReelDownloaderTool() {
  const { isInactiveLocked, openInactivePlanModal } = useFreeToolsInactiveGate();
  const { isSignedIn } = useSession();
  const { openSignUpModal } = useSignUpModalVisibility();
  const [url, setUrl] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'downloading'>('idle');
  const [result, setResult] = useState<Extract<ResolveResponse, { ok: true }> | null>(null);

  const canSubmit = useMemo(
    () => url.trim().length > 0 && isProbablyFacebookReelUrl(url.trim()) && status !== 'loading',
    [status, url],
  );

  const resolve = useCallback(async () => {
    const input = url.trim();
    if (!isProbablyFacebookReelUrl(input)) {
      addToast({ title: 'Please paste a valid Facebook Reel/video link.', color: 'danger', variant: 'flat' });
      return;
    }

    setStatus('loading');
    setResult(null);
    try {
      const res = await fetch('/api/facebook/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input }),
      });
      const data = (await res.json()) as ResolveResponse;
      if (!data.ok) {
        addToast({ title: data.message || 'Could not resolve this Facebook link.', color: 'danger', variant: 'flat' });
        setStatus('idle');
        return;
      }
      setResult(data);
      setStatus('ready');
      addToast({
        title:
          data.source === 'opengraph'
            ? 'Link resolved from page preview metadata. Quality may vary.'
            : 'Link resolved. Ready to download.',
        color: data.source === 'opengraph' ? 'warning' : 'success',
        variant: 'flat',
      });
    } catch (e) {
      console.error('Facebook resolve request failed:', e);
      addToast({ title: 'Something went wrong resolving that link. Try again.', color: 'danger', variant: 'flat' });
      setStatus('idle');
    }
  }, [url]);

  const download = useCallback(async () => {
    if (!isSignedIn) {
      openSignUpModal();
      return;
    }
    if (isInactiveLocked) {
      openInactivePlanModal();
      return;
    }
    if (!result) return;

    const chosen = result.hdVideoUrl ?? result.videoUrl;
    const name = safeFileName(decodeHtmlEntities(result.title || 'facebook_reel'));
    setStatus('downloading');
    try {
      const res = await fetch('/api/facebook/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: chosen, name }),
      });

      if (!res.ok) {
        let message = 'Download failed. Please try again.';
        try {
          const data = (await res.json()) as unknown;
          if (
            data &&
            typeof data === 'object' &&
            'message' in data &&
            typeof (data as { message: unknown }).message === 'string'
          ) {
            message = (data as { message: string }).message;
          }
        } catch {
          // ignore
        }
        addToast({ title: message, color: 'danger', variant: 'flat' });
        setStatus('ready');
        return;
      }

      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      downloadFromUrl(objectUrl, `${name}.mp4`);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
      setStatus('ready');
    } catch (e) {
      console.error('Facebook download request failed:', e);
      addToast({ title: 'Download failed. Please try again.', color: 'danger', variant: 'flat' });
      setStatus('ready');
    }
  }, [isInactiveLocked, isSignedIn, openInactivePlanModal, openSignUpModal, result]);

  return (
    <Card shadow="sm" className="border border-foreground-200">
      <CardBody className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Icon icon="facebook" size={18} className="text-foreground-500" />
            <h3 className="font-sans text-base font-semibold">Facebook Reel downloader</h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex-1">
              <Input
                label="Facebook Reel link"
                value={url}
                onValueChange={setUrl}
                placeholder={EXAMPLE_URL}
                description="Paste a public Facebook Reel/video link (facebook.com/reel/..., /watch?v=..., or fb.watch/...)."
                isDisabled={status === 'loading' || status === 'downloading'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canSubmit && status !== 'downloading') {
                    e.preventDefault();
                    resolve();
                  }
                }}
              />
            </div>
            <Button
              color="primary"
              className={cn(
                'h-10 bg-foreground px-4 font-semibold text-content1 sm:min-w-[130px]',
                status === 'loading' && 'opacity-90',
              )}
              onPress={resolve}
              isLoading={status === 'loading'}
              isDisabled={!canSubmit || status === 'downloading'}
              startContent={!status.includes('loading') ? <Icon icon="search" size={16} /> : undefined}
            >
              Find video
            </Button>
          </div>

          {result && (
            <div className="grid gap-4 md:grid-cols-[180px_1fr]">
              <div className="overflow-hidden rounded-xl border border-foreground-200 bg-black/5">
                {result.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={result.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                ) : result.videoUrl ? (
                  <video
                    src={result.hdVideoUrl ?? result.videoUrl}
                    className="h-full w-full object-cover"
                    controls
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <div className="flex h-[120px] items-center justify-center text-sm text-foreground-500">Preview</div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-sm text-foreground-700">
                  <div className="font-semibold">{decodeHtmlEntities(result.title || 'Facebook Reel')}</div>
                  <div className="text-foreground-500">
                    {result.source === 'opengraph'
                      ? 'Resolved from page metadata; quality may vary.'
                      : 'Video URL extracted from page HTML.'}{' '}
                    · Source: {result.source}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    color="primary"
                    className="bg-foreground font-semibold text-content1"
                    onPress={download}
                    isLoading={status === 'downloading'}
                    isDisabled={status === 'downloading'}
                    startContent={<Icon icon="download" size={16} />}
                  >
                    Download
                  </Button>
                  <Button
                    variant="bordered"
                    onPress={() => {
                      setUrl('');
                      setResult(null);
                      setStatus('idle');
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
