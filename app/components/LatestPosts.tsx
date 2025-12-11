import { Link } from "react-router";
import type { Post } from "~/type";

type LatestPostsProps = {
  posts: Post[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsProps) => {
  const sortedPosts = posts.toSorted(
    (a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <section className="max-w-6xl mx-auto  px-6 py-12">
      <h2 className="text-2xl font-bold text-white mb-6">Latest Posts 📰</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {(limit ? sortedPosts.slice(0, limit) : sortedPosts).map((post) => (
          <Link
            to={`/blog/${post.slug}`}
            key={post.slug}
            className="block p-4 border border-gray-700 rounded-lg mb-4 bg-gray-800 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <p className="text-gray-400">{post.excerpt}</p>
            <span className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
