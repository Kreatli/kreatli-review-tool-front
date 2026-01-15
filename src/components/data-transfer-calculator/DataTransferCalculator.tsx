import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  NumberInput,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tooltip,
} from '@heroui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { calculateTransferTime } from '../../utils/calculateTransferTime';
import { formatTransferTime } from '../../utils/formatTransferTime';
import { Icon } from '../various/Icon';
import { DataTransferPresets, Preset } from './DataTransferPresets';
import { SpeedPreset, SpeedPresets } from './SpeedPresets';

// Maximum safe values for validation
const MAX_FILE_SIZE = 10000; // 10TB in GB (or equivalent)
const MAX_SPEED = 1000; // 1 Tbps (or equivalent)
const MAX_FILE_COUNT = 100000; // 100k files

const validateNumber = (value: number | null | undefined, max: number, min: number = 0): number => {
  if (value === null || value === undefined) {
    return min;
  }
  if (!Number.isFinite(value) || isNaN(value)) {
    return min;
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

export const DataTransferCalculator = () => {
  const [fileSize, setFileSize] = useState<number>(10);
  const [fileSizeUnit, setFileSizeUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<'Mbps' | 'Gbps'>('Mbps');
  const [transferType, setTransferType] = useState<'upload' | 'download'>('upload');
  const [fileCount, setFileCount] = useState<number>(1);
  const [fileSizeError, setFileSizeError] = useState<string>('');
  const [speedError, setSpeedError] = useState<string>('');
  const [fileCountError, setFileCountError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shareUrlCopied, setShareUrlCopied] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const router = useRouter();

  // Read URL parameters on mount (only once)
  // This effect intentionally reads URL params and updates state - necessary for URL-based initialization
  useEffect(() => {
    if (!router.isReady || isInitialized) return;

    const { fs, fsu, sp, spu, tc, ft } = router.query;

    if (fs && typeof fs === 'string') {
      const fileSizeValue = parseFloat(fs);
      if (!isNaN(fileSizeValue) && fileSizeValue > 0 && fileSizeValue <= MAX_FILE_SIZE) {
        setFileSize(fileSizeValue);
      }
    }

    if (fsu && typeof fsu === 'string' && (fsu === 'MB' || fsu === 'GB' || fsu === 'TB')) {
      setFileSizeUnit(fsu);
    }

    if (sp && typeof sp === 'string') {
      const speedValue = parseFloat(sp);
      if (!isNaN(speedValue) && speedValue > 0 && speedValue <= MAX_SPEED) {
        setSpeed(speedValue);
      }
    }

    if (spu && typeof spu === 'string' && (spu === 'Mbps' || spu === 'Gbps')) {
      setSpeedUnit(spu);
    }

    if (tc && typeof tc === 'string') {
      const fileCountValue = parseInt(tc, 10);
      if (!isNaN(fileCountValue) && fileCountValue >= 1 && fileCountValue <= MAX_FILE_COUNT) {
        setFileCount(fileCountValue);
      }
    }

    if (ft && typeof ft === 'string' && (ft === 'upload' || ft === 'download')) {
      setTransferType(ft);
    }

    setIsInitialized(true);
  }, [router.isReady, router.query, isInitialized]);

  // Update URL parameters when state changes (debounced, only after initialization)
  useEffect(() => {
    if (!router.isReady || !isInitialized) return;

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      if (fileSize > 0) params.set('fs', fileSize.toString());
      if (fileSizeUnit) params.set('fsu', fileSizeUnit);
      if (speed > 0) params.set('sp', speed.toString());
      if (speedUnit) params.set('spu', speedUnit);
      if (fileCount > 1) params.set('tc', fileCount.toString());
      if (transferType !== 'upload') params.set('ft', transferType);

      const newUrl = params.toString() ? `${router.pathname}?${params.toString()}` : router.pathname;

      router.replace(newUrl, undefined, { shallow: true });
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fileSize,
    fileSizeUnit,
    speed,
    speedUnit,
    fileCount,
    transferType,
    router.isReady,
    router.pathname,
    isInitialized,
  ]);

  // Calculate transfer time and related values
  const transferTimeSeconds = useMemo(() => {
    if (fileSize <= 0 || speed <= 0 || fileCount <= 0) {
      return 0;
    }

    return calculateTransferTime(fileSize, fileSizeUnit, speed, speedUnit, fileCount);
  }, [fileSize, fileSizeUnit, speed, speedUnit, fileCount]);

  const formattedTime = useMemo(() => formatTransferTime(transferTimeSeconds), [transferTimeSeconds]);

  const getPlainLanguageExplanation = useMemo(() => {
    if (transferTimeSeconds === 0) {
      return 'Enter file size and internet speed to calculate transfer time.';
    }

    const fileSizeText = `${fileSize}${fileSizeUnit}`;
    const speedText = `${speed} ${speedUnit}`;
    const action = transferType === 'upload' ? 'Uploading' : 'Downloading';
    const fileText = fileCount === 1 ? 'file' : 'files';
    return `${action} ${fileCount > 1 ? `${fileCount} ` : ''}${fileSizeText} ${fileText} on a ${speedText} connection will take approximately ${formattedTime}.`;
  }, [transferTimeSeconds, fileSize, fileSizeUnit, speed, speedUnit, transferType, fileCount, formattedTime]);

  // Calculate effective transfer rate for display
  const effectiveTransferRate = useMemo(() => {
    if (fileSize <= 0 || speed <= 0 || transferTimeSeconds <= 0) {
      return { value: 0, unit: 'MB/s' };
    }

    // Convert file size to MB
    const fileSizeInMB = (() => {
      switch (fileSizeUnit) {
        case 'MB':
          return fileSize;
        case 'GB':
          return fileSize * 1024;
        case 'TB':
          return fileSize * 1024 * 1024;
        default:
          return 0;
      }
    })();

    const totalSizeInMB = fileSizeInMB * fileCount;
    const rateInMBps = totalSizeInMB / transferTimeSeconds;

    if (rateInMBps >= 1024) {
      return { value: Math.round((rateInMBps / 1024) * 10) / 10, unit: 'GB/s' };
    }
    return { value: Math.round(rateInMBps * 10) / 10, unit: 'MB/s' };
  }, [fileSize, fileSizeUnit, fileCount, speed, transferTimeSeconds]);

  // Event handlers
  const handleCopyResult = async () => {
    const resultText = `${formattedTime} - ${getPlainLanguageExplanation}`;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = resultText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShareUrl = async () => {
    const params = new URLSearchParams();
    if (fileSize > 0) params.set('fs', fileSize.toString());
    if (fileSizeUnit) params.set('fsu', fileSizeUnit);
    if (speed > 0) params.set('sp', speed.toString());
    if (speedUnit) params.set('spu', speedUnit);
    if (fileCount > 1) params.set('tc', fileCount.toString());
    if (transferType !== 'upload') params.set('ft', transferType);

    const shareUrl = `${window.location.origin}${router.pathname}${params.toString() ? `?${params.toString()}` : ''}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareUrlCopied(true);
      setTimeout(() => setShareUrlCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShareUrlCopied(true);
        setTimeout(() => setShareUrlCopied(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy URL:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const handlePresetSelect = (preset: Preset) => {
    setFileSize(preset.fileSize);
    setFileSizeUnit(preset.fileSizeUnit);
    setFileSizeError('');
  };

  const handleFileSizeChange = (value: number | null) => {
    const validated = validateNumber(value, MAX_FILE_SIZE, 0);
    setFileSize(validated);

    if (value !== null && value !== undefined) {
      if (!Number.isFinite(value) || isNaN(value)) {
        setFileSizeError('Please enter a valid number');
      } else if (value < 0) {
        setFileSizeError('File size must be greater than 0');
      } else if (value > MAX_FILE_SIZE) {
        setFileSizeError(`File size must be less than ${MAX_FILE_SIZE}${fileSizeUnit}`);
      } else {
        setFileSizeError('');
      }
    } else {
      setFileSizeError('');
    }
  };

  const handleSpeedChange = (value: number | null) => {
    const validated = validateNumber(value, MAX_SPEED, 0);
    setSpeed(validated);

    if (value !== null && value !== undefined) {
      if (!Number.isFinite(value) || isNaN(value)) {
        setSpeedError('Please enter a valid number');
      } else if (value < 0) {
        setSpeedError('Speed must be greater than 0');
      } else if (value > MAX_SPEED) {
        setSpeedError(`Speed must be less than ${MAX_SPEED} ${speedUnit}`);
      } else {
        setSpeedError('');
      }
    } else {
      setSpeedError('');
    }
  };

  const handleFileCountChange = (value: number | null) => {
    const validated = validateNumber(value, MAX_FILE_COUNT, 1);
    setFileCount(validated);

    if (value !== null && value !== undefined) {
      if (!Number.isFinite(value) || isNaN(value)) {
        setFileCountError('Please enter a valid number');
      } else if (value < 1) {
        setFileCountError('File count must be at least 1');
      } else if (value > MAX_FILE_COUNT) {
        setFileCountError(`File count must be less than ${MAX_FILE_COUNT.toLocaleString()}`);
      } else {
        setFileCountError('');
      }
    } else {
      setFileCountError('');
    }
  };

  const handleSpeedPresetSelect = (preset: SpeedPreset) => {
    setSpeed(preset.speed);
    setSpeedUnit(preset.speedUnit);
    setSpeedError('');
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
        {/* Left side: Calculator */}
        <div className="flex w-full min-w-0 flex-col gap-6">
          <Card className="w-full border-foreground-200 shadow-sm">
            <CardBody className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon icon="monitorPlay" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold sm:text-2xl">Calculate Transfer Time</h3>
                </div>
                <Tooltip content={shareUrlCopied ? 'Link copied!' : 'Share calculator state'}>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={handleShareUrl}
                    aria-label="Share calculator state via URL"
                    className="text-foreground-500 hover:text-foreground-700"
                  >
                    <Icon icon={shareUrlCopied ? 'check' : 'share'} size={20} />
                  </Button>
                </Tooltip>
              </div>

              <Divider />

              <div className="flex flex-col gap-5">
                {/* File Size Input */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="file" size={18} className="flex-shrink-0 text-foreground-400" />
                    <label className="text-sm font-semibold text-foreground-700">File Size</label>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <NumberInput
                      value={fileSize}
                      onValueChange={handleFileSizeChange}
                      minValue={0}
                      maxValue={MAX_FILE_SIZE}
                      step={0.1}
                      errorMessage={fileSizeError || undefined}
                      isInvalid={!!fileSizeError}
                      placeholder="Enter file size"
                      aria-label="File size input"
                      classNames={{
                        input: 'text-right text-lg font-semibold',
                        inputWrapper: 'h-12 border-foreground-200',
                        label: 'hidden',
                      }}
                      className="min-w-0 flex-1"
                      size="lg"
                      startContent={<Icon icon="file" size={18} className="flex-shrink-0 text-foreground-400" />}
                    />
                    <Select
                      selectedKeys={new Set([fileSizeUnit])}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        if (selected === 'MB' || selected === 'GB' || selected === 'TB') {
                          setFileSizeUnit(selected);
                        }
                      }}
                      className="w-full flex-shrink-0 sm:w-32"
                      size="lg"
                      aria-label="File size unit"
                      classNames={{
                        trigger: 'h-12 border-foreground-200',
                      }}
                    >
                      <SelectItem key="MB">MB</SelectItem>
                      <SelectItem key="GB">GB</SelectItem>
                      <SelectItem key="TB">TB</SelectItem>
                    </Select>
                  </div>
                  <Tooltip content="Total size of all files you want to transfer">
                    <p className="flex items-center gap-1 text-xs text-foreground-500">
                      <Icon icon="info" size={14} className="flex-shrink-0" />
                      Total size of all files combined
                    </p>
                  </Tooltip>
                </div>

                {/* Internet Speed Input */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="monitorPlay" size={18} className="flex-shrink-0 text-foreground-400" />
                    <label className="text-sm font-semibold text-foreground-700">Internet Speed</label>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <NumberInput
                      value={speed}
                      onValueChange={handleSpeedChange}
                      minValue={0}
                      maxValue={MAX_SPEED}
                      step={1}
                      errorMessage={speedError || undefined}
                      isInvalid={!!speedError}
                      placeholder="Enter speed"
                      aria-label="Internet speed input"
                      classNames={{
                        input: 'text-right text-lg font-semibold',
                        inputWrapper: 'h-12 border-foreground-200',
                        label: 'hidden',
                      }}
                      className="min-w-0 flex-1"
                      size="lg"
                      startContent={<Icon icon="monitorPlay" size={18} className="flex-shrink-0 text-foreground-400" />}
                    />
                    <Select
                      selectedKeys={new Set([speedUnit])}
                      onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        if (selected === 'Mbps' || selected === 'Gbps') {
                          setSpeedUnit(selected);
                        }
                      }}
                      className="w-full flex-shrink-0 sm:w-32"
                      size="lg"
                      aria-label="Speed unit"
                      classNames={{
                        trigger: 'h-12 border-foreground-200',
                      }}
                    >
                      <SelectItem key="Mbps">Mbps</SelectItem>
                      <SelectItem key="Gbps">Gbps</SelectItem>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Tooltip content="Your actual upload or download speed (check with your ISP or use speedtest.net)">
                      <p className="flex items-center gap-1 text-xs text-foreground-500">
                        <Icon icon="info" size={14} className="flex-shrink-0" />
                        Your connection speed (upload for uploads, download for downloads)
                      </p>
                    </Tooltip>
                    <SpeedPresets onPresetSelect={handleSpeedPresetSelect} />
                  </div>
                </div>

                <Divider className="my-2" />

                {/* Upload/Download Toggle */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={transferType === 'upload' ? 'upload' : 'download'}
                      size={18}
                      className="text-foreground-400"
                    />
                    <label className="text-sm font-semibold text-foreground-700">Transfer Type</label>
                  </div>
                  <RadioGroup
                    value={transferType}
                    onValueChange={(value) => setTransferType(value as 'upload' | 'download')}
                    orientation="horizontal"
                    classNames={{
                      wrapper: 'gap-4',
                    }}
                  >
                    <Radio value="upload" classNames={{ label: 'font-medium' }}>
                      <div className="flex items-center gap-2">
                        <Icon icon="upload" size={16} className="text-foreground-500" />
                        Upload
                      </div>
                    </Radio>
                    <Radio value="download" classNames={{ label: 'font-medium' }}>
                      <div className="flex items-center gap-2">
                        <Icon icon="download" size={16} className="text-foreground-500" />
                        Download
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>

                {/* Multiple Files Input */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="folder" size={18} className="text-foreground-400" />
                    <label className="text-sm font-semibold text-foreground-700">Number of Files</label>
                    <Chip size="sm" variant="flat" className="text-xs">
                      Optional
                    </Chip>
                  </div>
                  <NumberInput
                    value={fileCount}
                    onValueChange={handleFileCountChange}
                    minValue={1}
                    maxValue={MAX_FILE_COUNT}
                    step={1}
                    errorMessage={fileCountError || undefined}
                    isInvalid={!!fileCountError}
                    placeholder="1"
                    classNames={{
                      input: 'text-right text-lg font-semibold',
                      inputWrapper: 'h-12 border-foreground-200',
                      label: 'hidden',
                    }}
                    size="lg"
                    startContent={<Icon icon="folder" size={18} className="text-foreground-400" />}
                  />
                  <Tooltip content="If transferring multiple files of the same size, enter the count here">
                    <p className="flex items-center gap-1 text-xs text-foreground-500">
                      <Icon icon="info" size={14} />
                      Leave as 1 for a single file or if files have different sizes
                    </p>
                  </Tooltip>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right side: Presets */}
        <div className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:w-[280px] lg:overflow-y-auto">
          <div className="flex flex-col gap-6">
            <DataTransferPresets onPresetSelect={handlePresetSelect} />
          </div>
        </div>
      </div>

      {/* Results Card - Centered */}
      {transferTimeSeconds > 0 && (
        <div className="flex w-full justify-center">
          <Card className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg duration-300">
            <CardBody className="flex flex-col gap-5 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/20 p-2">
                    <Icon icon="time" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-xl font-bold sm:text-2xl">Estimated Transfer Time</h3>
                </div>
                <Tooltip content={copied ? 'Copied!' : 'Copy result'}>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={handleCopyResult}
                    aria-label="Copy transfer time result to clipboard"
                    className="text-foreground-600 hover:text-primary"
                  >
                    <Icon icon={copied ? 'check' : 'copy'} size={20} />
                  </Button>
                </Tooltip>
              </div>

              <Divider />

              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex flex-wrap items-baseline justify-center gap-3">
                  <div className="break-words font-sans text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
                    {formattedTime}
                  </div>
                  <Chip size="sm" variant="flat" color="primary" className="flex-shrink-0 text-xs">
                    {transferType === 'upload' ? 'Upload' : 'Download'}
                  </Chip>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-foreground-700 sm:text-base">
                  {getPlainLanguageExplanation}
                </p>

                <div className="grid w-full max-w-xl grid-cols-1 gap-3 pt-2 sm:grid-cols-2 sm:gap-4">
                  <div className="rounded-lg border border-foreground-200 bg-foreground-50 p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Icon icon="arrowRight" size={18} className="text-foreground-500" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-foreground-600">
                        Effective Rate
                      </span>
                    </div>
                    <div className="text-center text-2xl font-bold text-foreground-900">
                      {effectiveTransferRate.value > 0
                        ? `${effectiveTransferRate.value} ${effectiveTransferRate.unit}`
                        : '—'}
                    </div>
                  </div>

                  <div className="rounded-lg border border-foreground-200 bg-foreground-50 p-4">
                    <div className="mb-2 flex items-center justify-center gap-2">
                      <Icon icon="file" size={18} className="text-foreground-500" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-foreground-600">
                        Total Size
                      </span>
                    </div>
                    <div className="text-center text-2xl font-bold text-foreground-900">
                      {fileCount > 1 ? `${fileCount} × ` : ''}
                      {fileSize}
                      {fileSizeUnit}
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
