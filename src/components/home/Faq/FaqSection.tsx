import { Accordion, AccordionItem } from '@heroui/react';

const faq = [
  {
    question: 'What exactly is Kreatli?',
    answer:
      'Kreatli is an All-in-One collaboration platform for Creative Teams. It brings all your projects, communication, and files into one organized space, helping you manage your workflow with features like intuitive file organization, live collaboration tools, and powerful storage solutions.',
  },
  {
    question: 'How does Kreatli organize my files?',
    answer:
      'Kreatli allows you to arrange files by project, status, size, and type (e.g., video files, documents, images, etc.) so you can quickly find what you need. You can also filter them based on their relevance to a specific project, making file management effortless.',
  },
  {
    question: 'What is the File Review Tool, and how does it work?',
    answer:
      "File Review Tool is Kreatli's real-time file review and collaboration feature. It allows you to provide feedback, add comments, and make revisions on files like videos, images, and documents. Users can collaborate without the need for back-and-forth email exchanges or external tools. Your team stays in sync, speeding up the review process and making collaboration seamless.",
  },
  {
    question: 'Is there a limit to how many projects I can manage with Kreatli?',
    answer:
      'Yes, there are limits to how many projects you can manage with Kreatli, depending on the pricing plan you choose:\n\n- Free Plan: You can manage 2 projects with up to 2 users.\n- Pro Plan: This plan allows you to manage up to 10 projects and supports up to 5 users.\n- Advanced Plan: With this plan, you have unlimited projects and users.\n\nFor teams or organizations with specific needs, a Custom Plan is available, which allows for tailored project management capabilities.',
  },
  {
    question: 'Can multiple team members work on the same project in Kreatli?',
    answer:
      'Yes, Kreatli allows for collaborative workspaces. You can invite team members, clients, and contractors to work on the same project. Each person has access to the same tools depending on their access levels - files, chat, review tool, and project activities - so everyone stays on the same page.',
  },
  {
    question: 'Can I upgrade or downgrade my plan at any time?',
    answer: 'Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: "What happens if I exceed my plan's limits?",
    answer:
      "You'll receive a notification when you're approaching your plan's limits. If you exceed them, you can upgrade your plan or purchase additional resources.",
  },
  {
    question: 'Can I try Kreatli for free?',
    answer:
      'Yes! Kreatli Free Plan gives you full access to all features, so you can experience how it simplifies your workflow and collaboration.',
  },
  {
    question: "What's the difference between Kreatli and other project management tools?",
    answer:
      'Kreatli is purpose-built for content creators, creative teams and digital agencies. Unlike generic project management tools, it includes integrated file review tool for media, real-time commenting, and structured project folders tailored for content production. It reduces tool-switching and streamlines the creative process from planning to final delivery.',
  },
];

export const FaqSection = () => {
  return (
    <section id="faq" className="backdrop-blur-lg lg:py-32 py-16 px-6 flex flex-col gap-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-8 w-full">
        <h2 className="text-3xl sm:text-5xl font-bold font-sans text-center">Frequently Asked Questions</h2>
        <Accordion variant="splitted">
          {faq.map((item) => (
            <AccordionItem key={item.question} title={<span className="font-semibold">{item.question}</span>}>
              <span className="whitespace-pre-wrap text-foreground-500">{item.answer}</span>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="max-w-3xl mx-auto flex flex-col gap-4 text-center items-center">
        <h3 className="text-xl font-sans font-bold">Still Have Questions?</h3>
        <p>
          If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
          <a href="mailto:support@kreatli.com" className="underline underline-offset-2">
            support@kreatli.com
          </a>{' '}
          for more detailed answers.
        </p>
      </div>
    </section>
  );
};
