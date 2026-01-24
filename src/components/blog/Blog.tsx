import { ArticleCard } from '../../types/articles';
import { BlogArticle } from './BlogArticle';

interface Props {
  articles: ArticleCard[];
}

export const BlogArticles = ({ articles }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <BlogArticle key={article.id} article={article} />
      ))}
    </div>
  );
};
