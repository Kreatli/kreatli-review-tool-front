/**
 * Network efficiency factor accounting for protocol overhead, TCP/IP overhead, and network congestion.
 * Real-world transfer speeds are typically 85% of theoretical maximums.
 */
const NETWORK_EFFICIENCY = 0.85;

/**
 * Maximum safe values to prevent calculation errors and overflow
 */
const MAX_FILE_SIZE = 1e15; // 1 petabyte (very large but safe)
const MAX_SPEED = 1e12; // 1 Tbps (extremely fast but safe)
const MAX_FILE_COUNT = 1e6; // 1 million files (very large but safe)

/**
 * Calculates the time required to transfer files based on file size and internet speed.
 * Accounts for network overhead (85% efficiency).
 *
 * @param fileSize - The size of the file(s)
 * @param fileSizeUnit - Unit of file size (MB, GB, or TB)
 * @param speed - Internet connection speed
 * @param speedUnit - Unit of speed (Mbps or Gbps)
 * @param fileCount - Number of files to transfer (default: 1)
 * @returns Time in seconds required for the transfer, or 0 if inputs are invalid
 */
export function calculateTransferTime(
  fileSize: number,
  fileSizeUnit: 'MB' | 'GB' | 'TB',
  speed: number,
  speedUnit: 'Mbps' | 'Gbps',
  fileCount: number = 1
): number {
  // Validate inputs: check for NaN, Infinity, negative values, and extremely large values
  if (
    !Number.isFinite(fileSize) ||
    !Number.isFinite(speed) ||
    !Number.isFinite(fileCount) ||
    fileSize <= 0 ||
    speed <= 0 ||
    fileCount <= 0 ||
    fileSize > MAX_FILE_SIZE ||
    speed > MAX_SPEED ||
    fileCount > MAX_FILE_COUNT
  ) {
    return 0;
  }

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

  // Guard against division by zero
  if (speedInBitsPerSecond === 0 || fileSizeInBits === 0) {
    return 0;
  }

  // Calculate time for one file (in seconds)
  const timeForOneFile = fileSizeInBits / speedInBitsPerSecond;

  // Apply network efficiency factor
  // This accounts for protocol overhead, TCP/IP overhead, etc.
  const timeWithOverhead = timeForOneFile / NETWORK_EFFICIENCY;

  // Multiply by number of files
  const totalTime = timeWithOverhead * fileCount;

  // Return 0 if result is invalid (NaN, Infinity, or negative)
  return Number.isFinite(totalTime) && totalTime >= 0 ? totalTime : 0;
}
