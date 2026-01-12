/**
 * Calculates the time required to transfer files based on file size and internet speed.
 * Accounts for network overhead (85% efficiency).
 *
 * @param fileSize - The size of the file(s)
 * @param fileSizeUnit - Unit of file size (MB, GB, or TB)
 * @param speed - Internet connection speed
 * @param speedUnit - Unit of speed (Mbps or Gbps)
 * @param fileCount - Number of files to transfer (default: 1)
 * @returns Time in seconds required for the transfer
 */
export function calculateTransferTime(
  fileSize: number,
  fileSizeUnit: 'MB' | 'GB' | 'TB',
  speed: number,
  speedUnit: 'Mbps' | 'Gbps',
  fileCount: number = 1
): number {
  // Convert file size to bits
  const fileSizeInBits = (() => {
    const bytes = (() => {
      switch (fileSizeUnit) {
        case 'MB':
          return fileSize * 1024 * 1024;
        case 'GB':
          return fileSize * 1024 * 1024 * 1024;
        case 'TB':
          return fileSize * 1024 * 1024 * 1024 * 1024;
        default:
          return 0;
      }
    })();
    return bytes * 8; // Convert bytes to bits
  })();

  // Convert speed to bits per second
  const speedInBitsPerSecond = (() => {
    switch (speedUnit) {
      case 'Mbps':
        return speed * 1_000_000; // 1 Mbps = 1,000,000 bits per second
      case 'Gbps':
        return speed * 1_000_000_000; // 1 Gbps = 1,000,000,000 bits per second
      default:
        return 0;
    }
  })();

  // Calculate time for one file (in seconds)
  const timeForOneFile = fileSizeInBits / speedInBitsPerSecond;

  // Apply network efficiency factor (85% = 0.85)
  // This accounts for protocol overhead, TCP/IP overhead, etc.
  const timeWithOverhead = timeForOneFile / 0.85;

  // Multiply by number of files
  return timeWithOverhead * fileCount;
}
