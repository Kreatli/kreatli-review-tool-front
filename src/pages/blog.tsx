import Head from 'next/head';
import { useSession } from '../hooks/useSession';
import { Header } from '../components/layout/Header';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import NextLink from 'next/link';
import { Icon } from '../components/various/Icon';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Essential Tips for Streamlining Your Creative Workflow',
    excerpt:
      'Discover how to eliminate bottlenecks and improve collaboration in your creative team. Learn about tools and strategies that can save hours every week.',
    category: 'Workflow',
    date: 'January 15, 2025',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'How to Effectively Manage Large-Scale Creative Projects',
    excerpt:
      'Managing multiple creative projects simultaneously can be overwhelming. Here are proven strategies for keeping everything organized and on track.',
    category: 'Project Management',
    date: 'January 10, 2025',
    readTime: '7 min read',
  },
  {
    id: '3',
    title: 'The Future of Remote Creative Collaboration',
    excerpt:
      'Remote work has transformed how creative teams collaborate. Explore the latest trends, tools, and best practices for distributed creative workflows.',
    category: 'Collaboration',
    date: 'January 5, 2025',
    readTime: '6 min read',
  },
  {
    id: '4',
    title: 'Best Practices for Client Feedback and Approval Processes',
    excerpt:
      'Streamline your client feedback cycles with these proven methods. Learn how to reduce revision rounds and improve communication.',
    category: 'Client Management',
    date: 'December 28, 2024',
    readTime: '4 min read',
  },
  {
    id: '5',
    title: 'File Organization Strategies Every Creative Team Should Know',
    excerpt:
      'Stop wasting time searching for files. Implement these organization strategies to keep your creative assets accessible and well-structured.',
    category: 'Organization',
    date: 'December 20, 2024',
    readTime: '5 min read',
  },
  {
    id: '6',
    title: 'Building a Scalable Creative Production Pipeline',
    excerpt:
      'As your team grows, your production processes need to scale too. Learn how to build a pipeline that works for teams of all sizes.',
    category: 'Workflow',
    date: 'December 15, 2024',
    readTime: '8 min read',
  },
];

export default function Blog() {
  useSession();

  return (
    <>
      <Head>
        <title>Kreatli | Blog</title>
        <meta
          name="description"
          content="Insights, tips, and best practices for creative teams. Learn about workflow optimization, collaboration, and project management."
        />
      </Head>
      <Header />
      <div className="border-t border-foreground-200">
        {/* Hero Section */}
        <section className="bg-foreground-50 lg:py-24 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-4">
            <h1 className="text-3xl sm:text-5xl font-bold font-sans">Blog</h1>
            <p className="text-lg text-foreground-500 max-w-2xl mx-auto">
              Insights, tips, and best practices for creative teams. Discover strategies to streamline your workflow and
              improve collaboration.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Card key={post.id} isHoverable className="dark:border border-foreground-300 h-full flex flex-col">
                  <CardBody className="p-6 flex flex-col gap-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Chip size="sm" variant="faded">
                        {post.category}
                      </Chip>
                      <span className="text-sm text-foreground-500">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-bold font-sans leading-tight line-clamp-2">{post.title}</h2>
                    <p className="text-foreground-500 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-500">
                        <Icon icon="time" size={16} />
                        <span>{post.readTime}</span>
                      </div>
                      <Button
                        as={NextLink}
                        href={`/blog/${post.id}`}
                        variant="light"
                        size="sm"
                        endContent={<Icon icon="arrowRight" size={16} />}
                      >
                        Read more
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA Section */}
        <section className="bg-foreground-50 lg:py-24 py-16 px-6">
          <div className="max-w-2xl mx-auto text-center flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-sans">Stay Updated</h2>
            <p className="text-lg text-foreground-500">
              Get the latest tips, insights, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button as={NextLink} href="/sign-up" size="lg" className="bg-foreground text-content1">
                Subscribe to Newsletter
              </Button>
              <Button as={NextLink} href="/blog" size="lg" variant="bordered">
                View All Posts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

