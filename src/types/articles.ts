export type ArticleCard = {
  id: string | number;
  name?: string;
  full_slug: string;
  content: {
    metaFields?: {
      title?: string;
      description?: string;
    };
    image?: {
      filename: string;
      alt?: string | null;
      title?: string | null;
    } | null;
    publishDate?: string;
    readTime?: string;
    tags?: { value: string[] };
  };
};

