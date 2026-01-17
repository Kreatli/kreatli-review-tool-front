import { Accordion, AccordionItem, Button, Card, CardBody, Chip } from '@heroui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { CompareFeaturePreview } from '../../../components/home/Features/CompareFeaturePreview';
import { ProjectFeaturePreview } from '../../../components/home/Features/ProjectFeaturePreview';
import { ReviewToolPreview } from '../../../components/home/Features/ReviewToolPreview';
import { FooterSection } from '../../../components/home/Footer/FooterSection';
import { Header } from '../../../components/layout/Header';
import { Decorations } from '../../../components/layout/Storyblok/Decorations';
import { RelatedResourcesSection } from '../../../components/shared/RelatedResourcesSection';
import { getRelatedResources } from '../../../data/related-resources';
import { Icon, IconType } from '../../../components/various/Icon';
import { useSession } from '../../../hooks/useSession';

const data = {
  title: 'Video Production & Animation Studios',
  description:
    'Frame-accurate feedback, version control, and collaboration for video production teams. Ship more content with less chaos.',
  painPoints: [
    'Feedback scattered across email, messages, and comments',
    'Version confusion causing rework',
    'Sharing large video files is slow and unreliable',
    'Coordinating with editors and team members',
    'Managing complex multi-phase production projects',
    'Coordinating feedback from directors, producers, and clients',
  ],
  benefits: [
    'Frame-accurate feedback directly on your videos',
    '50% faster approvals via no-signup links',
    'Organize all projects in one central workspace',
    'Share secure review links without signups',
    'Track all revisions and feedback history',
    'Advanced version control and comparison tools',
    'Professional approval workflows',
  ],
  workflowSteps: [
    {
      step: 1,
      title: 'Project Setup & Organization',
      icon: 'folder',
      description:
        'Set up video production workspace in minutes. Organize projects, scenes, and assets in one central place.',
      timeToComplete: '3-5 minutes',
      saves: '2+ hours per project',
      processBreakdown: [
        'Create project workspace (e.g., "Documentary - Final Cut" or "Animated Short - Episode 1")',
        'Upload large video files (15GB+ supported) or connect cloud storage',
        'Organize by sequence, scene, or production phase',
      ],
      challengesAddressed: [
        'Projects scattered across multiple platforms',
        'Version confusion between drafts and finals',
        'Time wasted searching for files',
      ],
      realWorldExample: {
        scenario:
          'Instead of managing videos in Dropbox, feedback in Frame.io, and briefs in email, create one Kreatli project. Your team, directors, and clients access the same workspace with all assets organized by scene or sequence.',
        tags: ['Project Organization', 'Large File Upload', 'Scene Management', 'Multi-Project Workspace'],
      },
    },
    {
      step: 2,
      title: 'Team & Client Collaboration',
      icon: 'userPlus',
      description:
        'Invite team members and share no-signup review links with clients. Directors, producers, and clients review without creating accounts.',
      timeToComplete: '1-3 minutes',
      saves: '30+ minutes per stakeholder',
      processBreakdown: [
        'Add team members (editors, animators) with permissions',
        'Generate secure, password-protected review links for clients',
        'Share links—clients start reviewing immediately, no signup required',
      ],
      challengesAddressed: [
        'Client signup delays slowing approvals by 2-3 days',
        'Managing permissions across multiple tools',
        'Security concerns with unsecured file sharing',
      ],
      realWorldExample: {
        scenario:
          'Generate one password-protected review link for a 30-minute documentary. Share via email—director, producer, and client all click and review immediately. Approvals happen in 2 hours instead of 3 days.',
        tags: ['No-Signup Client Links', 'Role-Based Access', 'Secure Sharing', 'Multi-Stakeholder Review'],
      },
    },
    {
      step: 3,
      title: 'Frame-Accurate Review & Feedback',
      icon: 'paint',
      description:
        'Collect precise feedback with frame-accurate comments. Pin feedback to exact timestamps—editors know exactly where to make changes.',
      timeToComplete: 'Ongoing',
      saves: '50% fewer revision cycles',
      processBreakdown: [
        'Reviewers click on specific video frames to comment',
        'Comments link to exact timestamp (e.g., "00:12:30" or "frame 1,234-1,236")',
        'Assign tasks and track revision status',
      ],
      challengesAddressed: [
        '"Which frame?" confusion causing multiple revisions',
        'Feedback lost in email threads or Slack',
        'Vague comments requiring clarification',
      ],
      realWorldExample: {
        scenario:
          'Director clicks frame at 00:12:30: "Add transition here." Editor sees exactly which frame with feedback permanently linked. For animation: "Extend frames 1,234-1,236"—animator knows precise timing. Task assigned and resolved in the same thread.',
        tags: ['Frame-Accurate Comments', 'Timestamp Linking', 'Task Assignment', 'Revision Tracking'],
      },
    },
    {
      step: 4,
      title: 'Version Control & Delivery',
      icon: 'checkCircle',
      description:
        'Compare versions side-by-side, maintain complete history, and deliver final assets securely. One-click revert to previous versions.',
      timeToComplete: '5-10 minutes',
      saves: 'Hours of version management time',
      processBreakdown: [
        'Compare video versions side-by-side to spot changes',
        'Maintain complete version history with one-click revert',
        'Export final assets and share password-protected delivery links',
      ],
      challengesAddressed: [
        'Version confusion causing rework',
        'Hours to locate "previous versions"',
        'Unclear which version is final',
      ],
      realWorldExample: {
        scenario:
          'Client requests revert to v2 after reviewing v5. Compare versions side-by-side instantly, revert with one click. Export final 15GB video, share password-protected delivery link. Client asks for "version 3" months later—find it instantly in project history, deliver in minutes.',
        tags: ['Version Comparison', 'One-Click Revert', 'Secure Delivery', 'Complete History'],
      },
    },
  ],
  useCases: [
    'Post-production houses managing film/TV projects',
    'Video production companies handling client work',
    'Animation studios coordinating complex projects',
    'Client approval workflows for sponsored content',
    'Collaboration with freelance video editors',
    'Organizing multiple YouTube series or channels',
  ],
  keyFeatures: [
    {
      icon: 'paint',
      title: 'Frame-Accurate Video Review',
      description:
        'Pin comments to exact frames and timestamps. Example: "Change at 00:12:30"—editor knows exactly where. Reduces revision cycles by 50%.',
    },
    {
      icon: 'compare',
      title: 'Version Comparison',
      description:
        'Compare different video versions side-by-side to spot changes instantly. See exactly what changed between revisions and provide precise feedback.',
    },
    {
      icon: 'upload',
      title: 'Large Video File Support',
      description:
        'Upload and share large video files securely without file size limitations. No more WeTransfer or compressed previews—share full-quality videos directly.',
    },
  ],
  metaDescription:
    'Video project management platform for production and animation studios. Frame-accurate video review, version control, large file sharing, and collaboration tools for video production teams. Streamline post-production workflows, client approvals, and multi-stakeholder collaboration. Replace Frame.io, WeTransfer, and email threads with one unified platform.',
  faqs: [
    {
      question: 'How does frame-accurate video review work in Kreatli?',
      answer:
        'Frame-accurate review allows reviewers to click on any specific frame in a video to add comments that are permanently linked to that moment in the timeline. When a reviewer says "change the color at 00:02:15" or "add transition between frames 1,234-1,236," creators know exactly where to make changes. This precision reduces revision cycles by 50% because feedback is clear and actionable from the start. Comments are timestamped and frame-indexed, so editors can jump directly to the exact moment in their editing software. This eliminates the back-and-forth of "which frame?" questions and speeds up the entire post-production process.',
    },
    {
      question: 'Can I share large video files with clients and collaborators without file size limits?',
      answer:
        "Yes! Kreatli supports large video file uploads and sharing without file size limitations. You can upload and share full-quality videos directly with clients and collaborators through secure review links—no compression, no quality loss. Whether you're working with 4K footage, 8K masters, or 15GB+ documentary files, Kreatli handles them seamlessly. No need for WeTransfer, compressed previews, or external file sharing services. All files are stored securely with enterprise-grade encryption and accessible through the platform. Clients can review full-quality videos in their browser without downloading anything.",
    },
    {
      question:
        'How does Kreatli help coordinate feedback from multiple stakeholders like directors, producers, and clients?',
      answer:
        "Kreatli centralizes all feedback in one place, organized by asset and project. Directors, producers, editors, and clients can all provide feedback through the same platform simultaneously, and all comments are tracked and visible to the team. Asset-linked conversations ensure feedback stays with files, eliminating lost comments in email threads or messaging apps. You can see at a glance what needs attention and ensure nothing gets missed. Each stakeholder's feedback is clearly labeled, so you know who said what and when. The platform supports multi-stakeholder approval workflows, so you can track which reviewers have approved and which still need to provide feedback.",
    },
    {
      question: 'Can I compare different versions of videos side-by-side to see what changed?',
      answer:
        "Yes! Kreatli's version comparison feature allows you to view different video versions side-by-side to spot changes instantly. This makes it easy to see what changed between revisions and provide precise feedback on adjustments. Complete version history is maintained, so you can always revert to previous versions when needed. The side-by-side comparison highlights differences frame-by-frame, making it perfect for catching subtle changes in color grading, timing adjustments, or visual effects. This feature is especially valuable when clients request reverts or when you need to compare multiple edit iterations.",
    },
    {
      question: 'How does Kreatli help animation studios manage complex projects with hundreds of scenes?',
      answer:
        "Kreatli provides project organization that keeps all animation assets, storyboards, reference materials, and video files organized in one workspace. You can organize projects by episode, scene, sequence, or client, making it easy to track what's in production, what needs review, and what's been approved. Frame-accurate feedback is particularly valuable for animation where precise timing and visual details are critical. For animation studios working on series with 50+ scenes, Kreatli's project structure lets you see the status of every scene at a glance. You can filter by approval status, assign tasks to specific animators, and maintain complete version history for each scene. This eliminates the chaos of managing hundreds of files across multiple platforms.",
    },
    {
      question: 'How does Kreatli compare to Frame.io for video production workflows?',
      answer:
        'Kreatli offers similar frame-accurate review capabilities as Frame.io but with key advantages: no-signup client links that reduce approval delays from days to hours, unlimited projects and team members at competitive pricing, and a unified platform that replaces multiple tools. While Frame.io focuses primarily on video review, Kreatli provides comprehensive project management, asset organization, and collaboration features in one platform. Kreatli also supports larger file sizes without compression and offers more flexible pricing for growing studios. Many video production teams switch from Frame.io to Kreatli to reduce costs by 40-70% while gaining better project organization and faster client approvals.',
    },
    {
      question: 'Can clients review videos without creating an account or downloading software?',
      answer:
        "Absolutely! Kreatli's no-signup review links let clients review videos, add frame-accurate comments, and approve deliverables without creating accounts or downloading any software. Simply generate a password-protected review link and share it via email. Clients click the link and immediately start reviewing in their browser—no signups, no downloads, no delays. This reduces approval delays from 3-5 days to hours because clients can start reviewing immediately instead of waiting for account setup emails and password resets. The review interface is intuitive and works on any device, so clients can review on their phone, tablet, or computer.",
    },
    {
      question: 'What security features does Kreatli offer for sensitive video projects?',
      answer:
        'Kreatli provides enterprise-grade security for sensitive video projects. Password-protected links with customizable expiration dates ensure client access is time-limited. Access controls let you set permissions by role—editors get full access, clients get review-only access. Complete audit trails track who viewed what and when. All data is encrypted in transit and at rest, meeting enterprise security requirements. For highly sensitive projects, you can enable additional security features like IP restrictions, download controls, and watermarking. This makes Kreatli suitable for pre-release film reviews, confidential client work, and proprietary animation projects.',
    },
    {
      question: 'How long does it take to set up a new video production project in Kreatli?',
      answer:
        'Setting up a new video production project takes 3-5 minutes. Create the project workspace, upload video files or connect cloud storage, organize by scene or sequence, and set permissions. Your team and clients can start collaborating immediately. Most video production teams find they save 2+ hours per project compared to setting up projects across multiple tools like Frame.io, Dropbox, and email threads. Since everything happens in one place with clear organization from day one, you eliminate the time spent coordinating between platforms and explaining file structures to clients.',
    },
    {
      question: 'Can I connect existing cloud storage like Google Drive or Dropbox to Kreatli projects?',
      answer:
        "Yes! Kreatli integrates with Google Drive and Dropbox, so you can connect existing video asset folders without re-uploading files. Connect a client's asset library or production folder, and all files sync to your Kreatli project. Your team can continue using familiar cloud storage while leveraging Kreatli's review, approval, and collaboration features. This makes onboarding new projects faster since you don't need to migrate existing file structures. Files stay in sync, so any updates in your cloud storage automatically appear in Kreatli, and vice versa.",
    },
    {
      question: 'How does Kreatli handle version control for video projects with multiple revisions?',
      answer:
        'Kreatli maintains complete version history for every video file. Every time you upload a new version, it\'s automatically tracked and linked to previous versions. You can compare any two versions side-by-side to see exactly what changed, revert to previous versions with one click, and see the full revision timeline. All versions maintain their feedback history, so you can see what comments were made on which version. This eliminates version confusion—you\'ll never wonder "which version did the client approve?" or "where is version 3?" Everything is organized and searchable, making it easy to find and restore previous versions even months after a project is completed.',
    },
    {
      question: 'What file formats does Kreatli support for video uploads?',
      answer:
        "Kreatli supports all major video formats including MP4, MOV, AVI, MKV, ProRes, DNxHD, and more. The platform handles everything from compressed delivery formats to high-resolution master files. Videos are processed for streaming while maintaining original file quality for download. Whether you're working with H.264 compressed files for quick reviews or uncompressed ProRes masters for final delivery, Kreatli handles them all. The platform automatically generates streaming previews so reviewers can watch videos immediately without waiting for large downloads, while original files remain available for download when needed.",
    },
    {
      question: 'How does Kreatli help with animation production pipelines and scene management?',
      answer:
        'Kreatli is designed for animation production pipelines where you need to manage hundreds of scenes across multiple episodes or projects. Organize scenes by sequence, episode, or production phase. Each scene maintains its own version history and feedback thread. The dashboard shows scene status at a glance—which scenes are in progress, which need review, and which are approved. Frame-accurate feedback is essential for animation where timing is critical—directors can specify exact frame ranges like "extend frames 1,234-1,236" and animators know precisely what to adjust. This level of precision reduces revision cycles and keeps complex animation projects on schedule.',
    },
    {
      question: 'Can I export final videos and generate delivery reports for clients?',
      answer:
        'Yes! Kreatli lets you export final approved videos and generate comprehensive delivery reports. Export files maintain their original quality and format. Delivery reports include approval history, version information, and all feedback documentation. You can share password-protected delivery links with clients, ensuring secure handoff of final assets. Access logs track when clients download files, providing complete delivery documentation. This is perfect for post-production houses and animation studios that need to maintain professional delivery standards and documentation for client records.',
    },
    {
      question: 'How does Kreatli help reduce revision cycles and speed up video approvals?',
      answer:
        'Kreatli reduces revision cycles by 50% through frame-accurate feedback that eliminates ambiguity. When feedback is pinned to exact timestamps, editors know precisely where to make changes—no guessing, no clarification emails. No-signup review links reduce approval delays from 3-5 days to hours because clients can start reviewing immediately. All feedback is centralized and asset-linked, so nothing gets lost in email threads. Version comparison makes it easy to see what changed, reducing confusion about which version is current. These features combined typically cut total project timelines by 20-30% while improving quality through clearer communication.',
    },
    {
      question: 'What happens to video projects after they are completed and delivered?',
      answer:
        'Completed video projects are archived with complete history preserved. All versions, feedback, approvals, and final assets remain accessible indefinitely. When a client asks for "version 3 of the Q4 campaign video" months later, you can find it instantly in the archived project with all its approval history. Export final assets, generate delivery reports, and maintain a complete archive—no more searching through old emails or file folders. This is especially valuable for video production companies and animation studios that work with repeat clients who may request previous versions or reference old projects for new work.',
    },
  ],
};

export default function VideoProductionAnimationStudiosPage() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli for {data.title} | Video Production Platform for Video Production & Animation</title>
        <meta name="description" content={data.metaDescription} />
        <meta
          name="keywords"
          content="video production software, animation studio tools, video review platform, frame-accurate feedback, video collaboration platform, post-production workflow, video project management, animation production pipeline"
        />
        <link rel="canonical" href="https://kreatli.com/solutions/industry/video-production-animation-studios" />
        <meta property="og:url" content="https://kreatli.com/solutions/industry/video-production-animation-studios" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:image" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:secure_url" content="https://kreatli.com/og-image.png" />
        <meta property="og:image:alt" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Kreatli for ${data.title} | Video Production Platform`} />
        <meta name="twitter:description" content={data.metaDescription} />
        <meta name="twitter:image" content="https://kreatli.com/og-image.png" />
      </Head>
      <Header />
      <Decorations />
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16">
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 text-center">
          <h1 className="mx-auto max-w-lg font-sans text-2xl font-bold sm:text-4xl">Solutions for {data.title}</h1>
          <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">{data.description}</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Get Started for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      {data.workflowSteps && (
        <section className="relative px-6 py-16 backdrop-blur-lg">
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Video Production Workflow</h2>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                From project setup to final delivery—see how Kreatli streamlines your video production workflow.
                Organize projects, collaborate with teams, collect frame-accurate feedback, and deliver faster.
              </p>
            </div>

            {/* Workflow Progress Indicator */}
            <div className="sticky top-20 z-10 mb-12 flex justify-center">
              <div className="flex items-center gap-4 rounded-full bg-background px-6 py-3 shadow-large">
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#setup"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Setup
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#collaborate"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Collaborate
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#review"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Review
                  </a>
                </div>
                <div className="hidden h-px w-8 bg-gradient-to-r from-primary to-foreground-300 md:block"></div>
                <div className="group flex cursor-pointer items-center gap-2">
                  <div className="size-2 rounded-full bg-primary transition-transform duration-200"></div>
                  <a
                    href="#deliver"
                    className="text-sm font-medium transition-colors duration-200 group-hover:text-primary"
                  >
                    Deliver
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              {data.workflowSteps.map((step, index) => {
                const stepIdMap: { [key: number]: string } = {
                  1: 'setup',
                  2: 'collaborate',
                  3: 'review',
                  4: 'deliver',
                };
                const stepId = stepIdMap[step.step] || step.title.toLowerCase().replace(/\s+/g, '-');
                const isLast = index === data.workflowSteps.length - 1;

                return (
                  <React.Fragment key={index}>
                    <Card id={stepId} className="scroll-mt-36">
                      <CardBody className="p-5 sm:p-8 lg:p-12">
                        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                          <div className="flex flex-col gap-6 lg:w-1/3">
                            <div className="flex items-center gap-4">
                              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 md:size-20">
                                <Icon icon={step.icon as IconType} size={32} className="text-primary" />
                              </div>
                              <div>
                                <div className="mb-1 text-sm font-medium text-primary">Step {step.step}</div>
                                <h3 className="font-sans text-2xl font-bold lg:text-3xl">{step.title}</h3>
                              </div>
                            </div>
                            <p className="line-clamp-2 text-base text-foreground-500 lg:text-lg">{step.description}</p>
                            <div className="flex flex-col gap-2">
                              <div>⏱️ Time to complete: {step.timeToComplete}</div>
                              <div>💰 Saves: {step.saves}</div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-8 border-foreground-200 lg:w-2/3 lg:border-l lg:pl-8">
                            <div className="grid gap-8 sm:grid-cols-2">
                              <div>
                                <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                  <Icon icon="list" size={24} className="text-primary" />
                                  Process Breakdown
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.processBreakdown.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className="flex items-start gap-3 text-base text-foreground-500"
                                    >
                                      <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                                        <span className="text-xs font-bold text-primary">{itemIndex + 1}</span>
                                      </div>
                                      <span className="line-clamp-2">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                  <Icon icon="warning" size={24} className="text-warning" />
                                  Challenges Addressed
                                </h4>
                                <ul className="flex flex-col gap-3">
                                  {step.challengesAddressed.map((challenge, challengeIndex) => (
                                    <li
                                      key={challengeIndex}
                                      className="flex items-start gap-2 text-base text-foreground-500"
                                    >
                                      <Icon icon="cross" size={18} className="mt-0.5 flex-shrink-0 text-warning" />
                                      <span className="line-clamp-2">{challenge}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="mb-4 flex items-center gap-2 font-sans text-xl font-bold">
                                <Icon icon="slides" size={24} className="text-success" />
                                Real-World Example
                              </h4>
                              <Card className="bg-success/5">
                                <CardBody className="p-6">
                                  <p className="mb-3 line-clamp-2 text-base text-foreground-600">
                                    {step.realWorldExample.scenario.includes(':') ? (
                                      <>
                                        <strong>{step.realWorldExample.scenario.split(':')[0]}:</strong>{' '}
                                        {step.realWorldExample.scenario.split(':').slice(1).join(':').trim()}
                                      </>
                                    ) : (
                                      step.realWorldExample.scenario
                                    )}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {step.realWorldExample.tags.map((tag, tagIndex) => (
                                      <Chip key={tagIndex} size="sm" variant="flat" color="success">
                                        {tag}
                                      </Chip>
                                    ))}
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {!isLast && (
                      <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-primary"></div>
                          <div className="flex size-8 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10">
                            <Icon icon="chevronDown" size={20} className="text-primary" />
                          </div>
                          <div className="h-8 w-px bg-gradient-to-b from-primary to-primary/50"></div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Key Features for {data.title}</h2>
          </div>

          {/* Frame-Accurate Video Review */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Frame-Accurate Video Review</h3>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                Pin comments to exact frames and timestamps. Example: "Change at 00:12:30"—editor knows precisely where.
                Reduces revision cycles by 50%.
              </p>
            </div>
            <ReviewToolPreview />
          </div>

          {/* Version History & Comparison */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Version History & Comparison</h3>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                Compare different video versions side-by-side to spot changes instantly. Complete version history with
                one-click revert.
              </p>
            </div>
            <CompareFeaturePreview />
          </div>

          {/* Large Video File Support */}
          <div className="mb-16">
            <div className="mb-8 text-center">
              <h3 className="mb-3 font-sans text-2xl font-bold">Large Video File Support</h3>
              <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
                Upload and share large video files securely without file size limitations. No more WeTransfer or
                compressed previews—share full-quality videos directly.
              </p>
            </div>
            <ProjectFeaturePreview />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden px-6 py-16 backdrop-blur-lg">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-sans text-2xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
              Common questions about Kreatli for {data.title.toLowerCase()}.
            </p>
          </div>
          <Accordion variant="splitted">
            {data.faqs.map((faq, index) => (
              <AccordionItem key={index} title={<span className="text-lg font-semibold">{faq.question}</span>}>
                <div className="space-y-3 text-base leading-relaxed text-foreground-500">{faq.answer}</div>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 text-center">
            <h3 className="font-sans text-xl font-bold">Still Have Questions?</h3>
            <p className="line-clamp-2 text-base text-foreground-600">
              If you didn't find the answer you were looking for, feel free to contact our support team at{' '}
              <a href="mailto:support@kreatli.com" className="font-semibold text-primary underline underline-offset-2">
                support@kreatli.com
              </a>{' '}
              to learn how Kreatli can help your specific workflow.
            </p>
          </div>
        </div>
      </section>

      {/* More Resources Section */}
      <RelatedResourcesSection
        resources={getRelatedResources(['advertisingMarketingAgencies', 'inHouseCreativeContentTeams', 'creativeProofing'])}
        title="More Resources"
        description="Explore other Kreatli solutions to streamline your video collaboration workflow."
      />

      {/* CTA Section */}
      <section className="overflow-hidden bg-foreground-50 px-6 py-16 lg:py-24">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <h2 className="font-sans text-2xl font-bold sm:text-4xl">Ready to Streamline Your Workflow?</h2>
          <p className="mx-auto line-clamp-2 max-w-2xl text-lg text-foreground-500">
            Join {data.title.toLowerCase()} using Kreatli.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
              Get Started for Free
            </Button>
            <Button
              as="a"
              href="https://calendar.app.google/NXbAeTAUwaBGh5x49"
              target="_blank"
              size="lg"
              variant="bordered"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
      <FooterSection hideCta={true} />
    </>
  );
}
