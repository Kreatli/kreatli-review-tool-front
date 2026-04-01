import { Card, CardBody } from '@heroui/react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { WorkspaceFeature } from './workspaceFeatures';

interface Props {
  features: WorkspaceFeature[];
  activeKeys: Set<string>;
}

export const WorkspacePreview = ({ features, activeKeys }: Props) => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const activeFeatures = features.filter((f) => activeKeys.has(f.key));

  const handlePreviewClick = () => {
    if (!isSignedIn) {
      openSignUpModal();
    }
  };

  return (
    <div className="flex min-h-[160px] flex-1 flex-col overflow-hidden rounded-2xl border border-foreground-200 bg-content1 shadow-lg lg:min-h-0">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-foreground-200 bg-foreground-50 px-4 py-2.5 dark:bg-foreground-100/40">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-danger-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-warning-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-success-400" />
        </div>
        <div className="flex-1 rounded-md bg-foreground-100 px-3 py-1 text-center text-[11px] text-foreground-400 dark:bg-foreground-200/40">
          kreatli.com/projects/spring-campaign
        </div>
      </div>

      {/* Preview content area */}
      <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-foreground-50/40 p-2 dark:bg-foreground-50/5 sm:p-3">
        {activeFeatures.length === 0 ? (
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 py-6 text-center sm:gap-3 sm:py-8">
            <div className="rounded-full bg-foreground-100 p-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-foreground-400">
                <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm text-foreground-400">
              Select features on the left to see how your workspace comes together.
            </p>
          </div>
        ) : (
          <LayoutGroup>
            <motion.div
              layout
              className="grid min-h-0 items-stretch gap-3"
              style={{
                gridTemplateColumns: `repeat(auto-fit, minmax(${activeFeatures.length <= 2 ? '240px' : '220px'}, 1fr))`,
                gridAutoRows: 'minmax(min-content, max-content)',
              }}
            >
              <AnimatePresence mode="popLayout">
                {activeFeatures.map((feature) => {
                  const Component = feature.component;
                  return (
                    <motion.div
                      key={feature.key}
                      className="h-full"
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{
                        layout: { type: 'spring', stiffness: 400, damping: 30 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.2 },
                      }}
                    >
                      <Card
                        isPressable
                        onPress={handlePreviewClick}
                        className="flex h-full w-full border border-foreground-200 shadow-sm transition-shadow hover:shadow-md"
                        aria-label={`${feature.label} preview`}
                      >
                        <CardBody className="flex h-full min-h-0 flex-col p-3">
                          <div className="flex min-h-0 flex-1 flex-col">
                            <Component />
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
      </div>
    </div>
  );
};
