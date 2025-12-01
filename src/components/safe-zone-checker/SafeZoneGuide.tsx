import { Card, CardBody, Accordion, AccordionItem } from '@heroui/react';
import React from 'react';

import { Platform } from './SafeZoneUpload';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  'instagram-reels': 'Instagram Reels',
  'youtube-shorts': 'YouTube Shorts',
};

interface PlatformGuidelines {
  platform: Platform;
  title: string;
  aspectRatio: string;
  safeZone: string;
  margins: {
    top: string;
    bottom: string;
    left: string;
    right: string;
  };
  keyPoints: string[];
  tips: string[];
}

const platformGuidelines: PlatformGuidelines[] = [
  {
    platform: 'tiktok',
    title: 'TikTok',
    aspectRatio: '9:16 (1080x1920)',
    safeZone: '840x1422px (74% of total area)',
    margins: {
      top: '131px (6.83%)',
      bottom: '367px (19.11%)',
      left: '120px (11.11%)',
      right: '120px (11.11%)',
    },
    keyPoints: [
      'Top margin: 131px (6.83%) - avoid placing content in this area',
      'Bottom margin: 367px (19.11%) - largest margin, navigation bar covers this area',
      'Left margin: 120px (11.11%) - keep important content away from left edge',
      'Right margin: 120px (11.11%) - UI elements (buttons, comments, profile) appear here',
      'Safe area: 840px width × 1422px height (74% of total area)',
      'For best results, position important text, logos, and CTAs in the center area',
    ],
    tips: [
      'Focus on keeping essential visuals in the center area',
      'Avoid the top 6.83% and bottom 19.11% where overlays and navigation appear',
      'Keep important text, logos, and CTAs within the safe zone boundaries',
      'Test your content to ensure nothing critical is in the margin areas',
      'Profile information and engagement buttons are on the right side (120px margin)',
    ],
  },
  {
    platform: 'instagram-reels',
    title: 'Instagram Reels',
    aspectRatio: '9:16 (1080x1920)',
    safeZone: '900x1492px (78% of total area)',
    margins: {
      top: '108px (5.63%)',
      bottom: '320px (16.67%)',
      left: '60px (5.56%)',
      right: '120px (11.11%)',
    },
    keyPoints: [
      'Top margin: 108px (5.63%) - navigation bar can cover content here',
      'Bottom margin: 320px (16.67%) - profile, caption, and audio info overlay',
      'Left margin: 60px (5.56%) - smaller left margin, but still avoid edges',
      'Right margin: 120px (11.11%) - interaction buttons (like, comment, share) visible',
      'Safe area: 900px width × 1492px height (78% of total area)',
      'For best results, keep key content within the central safe area',
    ],
    tips: [
      'Keep key content within the central safe area for maximum visibility',
      'Account for the bottom 16.67% overlay when designing captions or text',
      'Right side has larger margin (120px) due to interaction buttons',
      'Test with the overlay visible to ensure nothing important is hidden',
      'Place main subjects and text in the center portion of the frame',
    ],
  },
  {
    platform: 'youtube-shorts',
    title: 'YouTube Shorts',
    aspectRatio: '9:16 (1080x1920)',
    safeZone: '840x960px (50% of total area)',
    margins: {
      top: '288px (15%)',
      bottom: '672px (35%)',
      left: '48px (4.44%)',
      right: '192px (17.78%)',
    },
    keyPoints: [
      'Top margin: 288px (15%) - channel name and subscribe button area',
      'Bottom margin: 672px (35%) - largest margin, video title and engagement buttons',
      'Left margin: 48px (4.44%) - smallest margin, but still avoid edge',
      'Right margin: 192px (17.78%) - channel icon and subscribe button appear here',
      'Safe area: 840px width × 960px height (only 50% of total area)',
      'For optimal clarity, keep your main content centered in the top 50% of the screen',
    ],
    tips: [
      'Keep main content centered in the top 50% of the screen for optimal clarity',
      'Bottom 35% can be covered by video title, description, and engagement buttons',
      'Right side has the largest horizontal margin (192px) due to channel branding',
      'Design with the assumption that bottom third may be completely covered',
      'Ensure text is readable even when bottom overlay appears',
    ],
  },
];

export const SafeZoneGuide = () => {
  return (
    <section className="relative py-16 px-6 backdrop-blur-lg overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Understanding Safe Zones</h2>
          <p className="text-lg text-foreground-500 max-w-3xl mx-auto">
            Learn what safe zones are, why they matter for your content, and how to optimize your videos for each
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardBody className="p-5 sm:p-8 lg:p-12">
              <h3 className="text-xl lg:text-2xl font-bold font-sans mb-4">What is a Safe Zone?</h3>
              <p className="text-foreground-500 text-base lg:text-lg mb-4">
                A safe zone is the area of your video where important content (text, faces, key visuals) should be placed
                to ensure it remains visible and unobstructed by platform UI elements.
              </p>
              <p className="text-foreground-500 text-base lg:text-lg">
                Each social media platform overlays its own interface elements—like buttons, navigation bars, captions,
                and engagement metrics—on top of your content. These elements can cover parts of your video, making
                content placed too close to the edges invisible or hard to read.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-5 sm:p-8 lg:p-12">
              <h3 className="text-xl lg:text-2xl font-bold font-sans mb-4">Why Are Safe Zones Important?</h3>
              <ul className="text-foreground-500 text-base lg:text-lg space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Prevent Content Loss:</strong> Ensure important visuals and text
                    aren't hidden by platform UI elements
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Better User Experience:</strong> Viewers can see and understand
                    your content without UI obstructions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Professional Appearance:</strong> Well-composed content looks more
                    polished and intentional
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Cross-Device Compatibility:</strong> Content works well across
                    different screen sizes and device types
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>
                    <strong className="text-foreground">Higher Engagement:</strong> Clear, unobstructed content performs
                    better and keeps viewers watching
                  </span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>

        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-4xl font-bold font-sans mb-4">Platform-Specific Guidelines</h3>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Each platform has unique UI elements and requirements. Follow these guidelines to optimize your content for
              maximum visibility and impact.
            </p>
          </div>

          <Accordion variant="bordered" selectionMode="multiple" defaultExpandedKeys={['tiktok']}>
            {platformGuidelines.map((guideline) => (
              <AccordionItem
                key={guideline.platform}
                aria-label={`${guideline.title} guidelines`}
                title={
                  <span className="text-lg font-semibold font-sans">{PLATFORM_LABELS[guideline.platform]} Guidelines</span>
                }
              >
                <div className="flex flex-col gap-6 pt-2">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-500 mb-1">Aspect Ratio</h4>
                      <p className="text-foreground">{guideline.aspectRatio}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground-500 mb-1">Safe Zone</h4>
                      <p className="text-foreground">{guideline.safeZone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-foreground-500 mb-2">Margins (Avoid These Areas)</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-foreground-500">Top:</span>{' '}
                        <span className="text-foreground font-medium">{guideline.margins.top}</span>
                      </div>
                      <div>
                        <span className="text-foreground-500">Bottom:</span>{' '}
                        <span className="text-foreground font-medium">{guideline.margins.bottom}</span>
                      </div>
                      <div>
                        <span className="text-foreground-500">Left:</span>{' '}
                        <span className="text-foreground font-medium">{guideline.margins.left}</span>
                      </div>
                      <div>
                        <span className="text-foreground-500">Right:</span>{' '}
                        <span className="text-foreground font-medium">{guideline.margins.right}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold font-sans mb-3">Key Points</h4>
                    <ul className="space-y-2 text-foreground-500 text-base">
                      {guideline.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold font-sans mb-3">Best Practices & Tips</h4>
                    <ul className="space-y-2 text-foreground-500 text-base">
                      {guideline.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Card>
          <CardBody className="p-5 sm:p-8 lg:p-12">
            <h3 className="text-xl lg:text-2xl font-bold font-sans mb-4">General Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-semibold text-foreground mb-3">Content Placement</h4>
                <ul className="space-y-2 text-foreground-500 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Keep main subjects within each platform's specific safe zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Place important text in the center-upper area of the safe zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Avoid all margin areas where UI elements can appear</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Use the rule of thirds for composition within the safe zone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>YouTube Shorts has the smallest safe zone (50%) - be extra careful</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-3">Text & Typography</h4>
                <ul className="space-y-2 text-foreground-500 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Use large, readable fonts (minimum 24px)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Ensure high contrast between text and background</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Keep text brief and impactful</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Test readability with platform overlays visible</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

