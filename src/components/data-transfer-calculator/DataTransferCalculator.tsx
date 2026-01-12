import { Button, Card, CardBody, NumberInput, Radio, RadioGroup, Select, SelectItem } from '@heroui/react';
import { useMemo, useState } from 'react';

import { calculateTransferTime } from '../../utils/calculateTransferTime';
import { formatTransferTime } from '../../utils/formatTransferTime';
import { DataTransferPresets, Preset } from './DataTransferPresets';

export const DataTransferCalculator = () => {
  const [fileSize, setFileSize] = useState<number>(10);
  const [fileSizeUnit, setFileSizeUnit] = useState<'MB' | 'GB' | 'TB'>('GB');
  const [speed, setSpeed] = useState<number>(100);
  const [speedUnit, setSpeedUnit] = useState<'Mbps' | 'Gbps'>('Mbps');
  const [transferType, setTransferType] = useState<'upload' | 'download'>('upload');
  const [fileCount, setFileCount] = useState<number>(1);

  const handlePresetSelect = (preset: Preset) => {
    setFileSize(preset.fileSize);
    setFileSizeUnit(preset.fileSizeUnit);
  };

  const transferTimeSeconds = useMemo(() => {
    if (fileSize <= 0 || speed <= 0 || fileCount <= 0) {
      return 0;
    }

    return calculateTransferTime(fileSize, fileSizeUnit, speed, speedUnit, fileCount);
  }, [fileSize, fileSizeUnit, speed, speedUnit, fileCount]);

  const formattedTime = formatTransferTime(transferTimeSeconds);

  const getPlainLanguageExplanation = () => {
    if (transferTimeSeconds === 0) {
      return 'Enter file size and internet speed to calculate transfer time.';
    }

    const fileSizeText = `${fileSize}${fileSizeUnit}`;
    const speedText = `${speed} ${speedUnit}`;
    const action = transferType === 'upload' ? 'Uploading' : 'Downloading';
    const fileText = fileCount === 1 ? 'file' : 'files';

    return `${action} ${fileCount > 1 ? `${fileCount} ` : ''}${fileSizeText} ${fileText} on a ${speedText} connection will take approximately ${formattedTime}.`;
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <DataTransferPresets onPresetSelect={handlePresetSelect} />

      <Card className="w-full border-foreground-300 dark:border">
        <CardBody className="flex flex-col gap-6 p-4 sm:p-6">
          <h3 className="font-sans text-xl font-bold sm:text-2xl">Calculate Transfer Time</h3>

          <div className="flex flex-col gap-4">
            {/* File Size Input */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <NumberInput
                label="File Size"
                value={fileSize}
                onValueChange={(value) => setFileSize(value || 0)}
                minValue={0}
                step={0.1}
                classNames={{
                  input: 'text-right',
                }}
                className="flex-1"
                size="md"
              />
              <Select
                selectedKeys={new Set([fileSizeUnit])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as 'MB' | 'GB' | 'TB';
                  if (selected) setFileSizeUnit(selected);
                }}
                className="w-full sm:w-32"
                size="md"
              >
                <SelectItem key="MB" value="MB">
                  MB
                </SelectItem>
                <SelectItem key="GB" value="GB">
                  GB
                </SelectItem>
                <SelectItem key="TB" value="TB">
                  TB
                </SelectItem>
              </Select>
            </div>

            {/* Internet Speed Input */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <NumberInput
                label="Internet Speed"
                value={speed}
                onValueChange={(value) => setSpeed(value || 0)}
                minValue={0}
                step={1}
                classNames={{
                  input: 'text-right',
                }}
                className="flex-1"
                size="md"
              />
              <Select
                selectedKeys={new Set([speedUnit])}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as 'Mbps' | 'Gbps';
                  if (selected) setSpeedUnit(selected);
                }}
                className="w-full sm:w-32"
                size="md"
              >
                <SelectItem key="Mbps" value="Mbps">
                  Mbps
                </SelectItem>
                <SelectItem key="Gbps" value="Gbps">
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
              onValueChange={(value) => setFileCount(value || 1)}
              minValue={1}
              step={1}
              description="Leave as 1 for a single file"
              classNames={{
                input: 'text-right',
              }}
              size="md"
            />
          </div>
        </CardBody>
      </Card>

      {/* Results Card */}
      {transferTimeSeconds > 0 && (
        <Card className="w-full border-foreground-300 dark:border bg-foreground-50">
          <CardBody className="flex flex-col gap-4 p-4 sm:p-6">
            <h3 className="font-sans text-xl font-bold sm:text-2xl">Estimated Transfer Time</h3>
            <div className="flex flex-col gap-2">
              <div className="font-sans text-3xl font-bold sm:text-4xl text-primary">{formattedTime}</div>
              <p className="text-base text-foreground-600">{getPlainLanguageExplanation()}</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
