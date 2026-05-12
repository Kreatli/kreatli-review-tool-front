import type { FFmpeg } from '@ffmpeg/ffmpeg';

let instance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

/**
 * ffmpeg.wasm `load()` downloads and compiles a large WASM bundle. Creating a new FFmpeg()
 * per export repeats that work. This module keeps one instance for the tab session so repeat
 * exports are fast; call from a useEffect to preload while the user tweaks crop.
 */
export async function getSharedResizeVideoFfmpeg(): Promise<FFmpeg> {
  if (instance) return instance;
  if (!loadPromise) {
    loadPromise = (async () => {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const ffmpeg = new FFmpeg();
      await ffmpeg.load();
      instance = ffmpeg;
      return ffmpeg;
    })().catch((err) => {
      loadPromise = null;
      instance = null;
      throw err;
    });
  }
  return loadPromise;
}
