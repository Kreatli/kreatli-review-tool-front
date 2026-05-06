/* eslint-disable max-len */
import { Accordion, AccordionItem } from '@heroui/react';
import NextLink from 'next/link';
import { Fragment } from 'react';

import { VIDEO_FRAME_EXTRACTOR_FAQ_DEFS } from '../../data/video-frame-extractor-faq-content';

export const VideoFrameExtractorFAQ = () => {
  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-foreground-500">
            Common questions about extracting still frames from video, video-to-frame workflows, downloads, and privacy.
          </p>
        </div>

        <Accordion variant="splitted" aria-label="Video frame extractor FAQs">
          {VIDEO_FRAME_EXTRACTOR_FAQ_DEFS.map((item) => (
            <AccordionItem key={item.key} title={<span className="font-semibold">{item.title}</span>}>
              <div className="space-y-3 text-base text-foreground-500">
                {item.key === 'privacy' ? (
                  <Fragment>
                    <p>{item.answer}</p>
                    <p>
                      <NextLink
                        href="/platform/secure-asset-storage"
                        className="text-primary underline underline-offset-2"
                      >
                        Open secure asset storage in Kreatli
                      </NextLink>
                    </p>
                  </Fragment>
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
          <p className="text-base text-foreground-500">
            If you didn’t find what you were looking for, contact us at{' '}
            <a
              href="mailto:support@kreatli.com"
              className="text-primary underline underline-offset-2"
              aria-label="Contact support via email at support@kreatli.com"
            >
              support@kreatli.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
