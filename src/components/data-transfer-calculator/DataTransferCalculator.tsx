import { Button, Card, CardBody, NumberInput, Radio, RadioGroup, Select, SelectItem, Tooltip } from '@heroui/react';
import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Icon } from '../various/Icon';
import { calculateTransferTime } from '../../utils/calculateTransferTime';
import { formatTransferTime } from '../../utils/formatTransferTime';
import { DataTransferPresets, Preset } from './DataTransferPresets';

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
  useEffect(() => {
    if (router.isReady && !isInitialized) {
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
    }
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
      
      const newUrl = params.toString() 
        ? `${router.pathname}?${params.toString()}`
        : router.pathname;
      
      router.replace(newUrl, undefined, { shallow: true });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [fileSize, fileSizeUnit, speed, speedUnit, fileCount, transferType, router.isReady, router.pathname, isInitialized]);

  const handleCopyResult = async () => {
    const resultText = `${formattedTime} - ${getPlainLanguageExplanation}`;
    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
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
    } catch (err) {
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

  const transferTimeSeconds = useMemo(() => {
    if (fileSize <= 0 || speed <= 0 || fileCount <= 0) {
      return 0;
    }

    return calculateTransferTime(fileSize, fileSizeUnit, speed, speedUnit, fileCount);
  }, [fileSize, fileSizeUnit, speed, speedUnit, fileCount]);

  const formattedTime = formatTransferTime(transferTimeSeconds);

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

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
      {/* Left side: Calculator and Estimated Transfer Time */}
      <div className="flex w-full flex-col gap-4">
        <Card className="w-full border-foreground-300 dark:border">
          <CardBody className="flex flex-col gap-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-lg font-bold sm:text-xl">Calculate Transfer Time</h3>
              <Tooltip content={shareUrlCopied ? 'Link copied!' : 'Share calculator state'}>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={handleShareUrl}
                  aria-label="Share calculator state via URL"
                >
                  <Icon icon={shareUrlCopied ? 'check' : 'share'} size={18} className="text-foreground-500" />
                </Button>
              </Tooltip>
            </div>

            <div className="flex flex-col gap-3">
              {/* File Size Input */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <NumberInput
                  label="File Size"
                  value={fileSize}
                  onValueChange={handleFileSizeChange}
                  minValue={0}
                  maxValue={MAX_FILE_SIZE}
                  step={0.1}
                  errorMessage={fileSizeError || undefined}
                  isInvalid={!!fileSizeError}
                  classNames={{
                    input: 'text-right text-lg font-semibold',
                    inputWrapper: 'h-10',
                  }}
                  className="flex-1"
                  size="sm"
                />
                <Select
                  selectedKeys={new Set([fileSizeUnit])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    if (selected === 'MB' || selected === 'GB' || selected === 'TB') {
                      setFileSizeUnit(selected);
                    }
                  }}
                  className="w-full sm:w-28"
                  size="sm"
                  classNames={{
                    trigger: 'h-10',
                  }}
                >
                  <SelectItem key="MB">
                    MB
                  </SelectItem>
                  <SelectItem key="GB">
                    GB
                  </SelectItem>
                  <SelectItem key="TB">
                    TB
                  </SelectItem>
                </Select>
              </div>

              {/* Internet Speed Input */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <NumberInput
                  label="Internet Speed"
                  value={speed}
                  onValueChange={handleSpeedChange}
                  minValue={0}
                  maxValue={MAX_SPEED}
                  step={1}
                  errorMessage={speedError || undefined}
                  isInvalid={!!speedError}
                  classNames={{
                    input: 'text-right text-lg font-semibold',
                    inputWrapper: 'h-10',
                  }}
                  className="flex-1"
                  size="sm"
                />
                <Select
                  selectedKeys={new Set([speedUnit])}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    if (selected === 'Mbps' || selected === 'Gbps') {
                      setSpeedUnit(selected);
                    }
                  }}
                  className="w-full sm:w-28"
                  size="sm"
                  classNames={{
                    trigger: 'h-10',
                  }}
                >
                  <SelectItem key="Mbps">
                    Mbps
                  </SelectItem>
                  <SelectItem key="Gbps">
                    Gbps
                  </SelectItem>
                </Select>
              </div>

              {/* Upload/Download Toggle */}
              <RadioGroup
                label="Transfer Type"
                value={transferType}
                onValueChange={(value) => setTransferType(value as 'upload' | 'download')}
                orientation="horizontal"
              >
                <Radio value="upload">Upload</Radio>
                <Radio value="download">Download</Radio>
              </RadioGroup>

              {/* Multiple Files Input */}
              <NumberInput
                label="Number of Files (optional)"
                value={fileCount}
                onValueChange={handleFileCountChange}
                minValue={1}
                maxValue={MAX_FILE_COUNT}
                step={1}
                description="Leave as 1 for a single file"
                errorMessage={fileCountError || undefined}
                isInvalid={!!fileCountError}
                classNames={{
                  input: 'text-right text-lg font-semibold',
                  inputWrapper: 'h-10',
                }}
                size="sm"
              />
            </div>
          </CardBody>
        </Card>

        {/* Results Card */}
        {transferTimeSeconds > 0 && (
          <Card className="w-full border-foreground-300 dark:border bg-foreground-50">
            <CardBody className="flex flex-col gap-3 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-sans text-lg font-bold sm:text-xl">Estimated Transfer Time</h3>
                <Tooltip content={copied ? 'Copied!' : 'Copy result'}>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onPress={handleCopyResult}
                    aria-label="Copy transfer time result to clipboard"
                  >
                    <Icon icon={copied ? 'check' : 'copy'} size={18} className="text-foreground-500" />
                  </Button>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-sans text-2xl font-bold sm:text-3xl text-primary">{formattedTime}</div>
                <p className="text-sm text-foreground-600">{getPlainLanguageExplanation}</p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Right side: Presets */}
      <div className="lg:sticky lg:top-6">
        <DataTransferPresets onPresetSelect={handlePresetSelect} />
      </div>
    </div>
  );
};
