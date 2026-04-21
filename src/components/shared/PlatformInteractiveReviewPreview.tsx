import { FreeToolsEntitlementSection } from './FreeToolsEntitlementSection';
import { InteractiveReviewToolPreview } from './InteractiveReviewToolPreview';

type PlatformInteractiveReviewPreviewProps = {
  variant?: 'video' | 'pdf' | 'image';
};

/**
 * Platform marketing pages: same entitlement + inactive context as /free-tools
 * so signed-in users without an active trial/plan hit the plans modal on interact.
 */
export function PlatformInteractiveReviewPreview({ variant = 'video' }: PlatformInteractiveReviewPreviewProps) {
  return (
    <FreeToolsEntitlementSection>
      <InteractiveReviewToolPreview variant={variant} />
    </FreeToolsEntitlementSection>
  );
}
