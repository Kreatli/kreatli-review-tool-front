import { Accordion, AccordionItem, Card, CardBody } from '@heroui/react';

export const VIDEO_COMPRESSOR_FAQS = [
  {
    question: 'Is this video compressor really free?',
    answer:
      'You can compress video on this page after you sign in to Kreatli. If your trial or plan is not active, you may be asked to start a trial or choose a plan to continue.',
  },
  {
    question: 'Do you upload my video to Kreatli servers?',
    answer:
      'No. Compression runs locally in your browser using a video encoder. Your file stays on your device.',
  },
  {
    question: 'Will the output file be exactly the target size I enter?',
    answer:
      'Not always. The tool targets a bitrate based on your video duration, but final size varies by content and encoding overhead. If you need a strict limit, try a slightly smaller target size.',
  },
  {
    question: 'What formats are supported?',
    answer:
      'You can export MP4 (H.264) for best compatibility. MOV (H.264) is also available for common editing workflows.',
  },
  {
    question: 'Why does compression take a while?',
    answer:
      'Video compression is compute-intensive. Larger or longer videos take more time and may use more CPU. Keeping your browser tab active can help the process finish.',
  },
];

export function VideoCompressorFAQ() {
  return (
    <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-sans text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground-500">
            Quick answers about compressing video in your browser.
          </p>
        </div>

        <Card shadow="sm" className="border border-foreground-200">
          <CardBody className="p-4 sm:p-6">
            <Accordion variant="splitted" aria-label="Video compressor FAQs" className="gap-2">
              {VIDEO_COMPRESSOR_FAQS.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  title={<span className="text-base font-semibold sm:text-lg">{faq.question}</span>}
                  className="py-2"
                >
                  <div className="text-sm leading-relaxed text-foreground-500 sm:text-base">{faq.answer}</div>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

