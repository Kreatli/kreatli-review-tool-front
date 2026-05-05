import Innertube, { Platform, UniversalCache } from 'youtubei.js';

let evalShimInstalled = false;
let clientPromise: Promise<Innertube> | null = null;

/**
 * youtubei.js requires a JS evaluator for deciphering streaming URLs on Node.
 * @see https://ytjs.dev/guide/getting-started.html#providing-a-custom-javascript-interpreter
 *
 * Persisted UniversalCache frequently led to stale player blobs and googlevideo 403s;
 * a non-persistent cache still avoids re-downloading the player within process lifetime via temp dirs.
 */
function ensureEvalShim() {
  if (evalShimInstalled) return;
  evalShimInstalled = true;
  Platform.shim.eval = async (data) =>
    // BuildScriptResult.output ends with code that returns { sig?, n? } for the decipher step.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    new Function(data.output)() as Record<string, unknown>;
}

export function getYouTubeInnerTube(): Promise<Innertube> {
  ensureEvalShim();
  if (!clientPromise) {
    clientPromise = Innertube.create({
      cache: new UniversalCache(false),
      retrieve_player: true,
      enable_session_cache: false,
    });
  }
  return clientPromise;
}
