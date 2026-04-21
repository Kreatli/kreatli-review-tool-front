import { Card, CardBody } from '@heroui/react';

import { Icon, type IconType } from '../various/Icon';

export function VideoCompressorGuide() {
  return (
    <section className="relative overflow-hidden px-6 py-12">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-3xl">How to compress a video</h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-foreground-500">
            Reduce file size for faster sharing, uploads, and client deliveries—without installing software.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: '1) Upload your video',
              description: 'Drop an MP4/MOV/WebM file into the tool. Processing runs locally on your device.',
              icon: 'addVideo' as IconType,
            },
            {
              title: '2) Set a target size',
              description: 'Enter the output size you want (MB). The tool estimates bitrate from video duration.',
              icon: 'edit' as IconType,
            },
            {
              title: '3) Compress and download',
              description: 'Click “Compress video” and your download starts automatically when it finishes.',
              icon: 'download' as IconType,
            },
          ].map((step) => (
            <Card key={step.title} shadow="sm" className="border border-foreground-200">
              <CardBody className="flex flex-col gap-3 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon icon={step.icon} size={18} className="text-primary" />
                  </div>
                  <h3 className="font-sans text-base font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground-500">{step.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl">
          <Card shadow="sm" className="border border-foreground-200">
            <CardBody className="p-6">
              <h3 className="mb-2 font-sans text-base font-semibold">Tips for hitting smaller sizes</h3>
              <ul className="space-y-2 text-sm text-foreground-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground-400" />
                  <span>
                    If your output is still too big, reduce the target size a bit more and run it again.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground-400" />
                  <span>
                    Longer videos need higher bitrates to look good—expect diminishing returns at very small targets.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground-400" />
                  <span>
                    For the smallest files, consider trimming or resizing first, then compressing.
                  </span>
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

