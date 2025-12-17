import { Link } from "react-router";
import type { Post } from "~/type";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article key={post.slug} className="bg-gray-800 p-4 rounded mb-4">
      <h3 className="text-2xl font-semibold text-white mb-1">{post.title}</h3>
      <p className="text-sm-text-gray-400 mb-2">{new Date(post.date).toDateString()}</p>
      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded mb-4" />
      )}
      <p className="text-gray-300 mb-2">{post.excerpt}</p>
      <Link to={`/blog/${post.slug}`} className="text-blue-400 hover:underline">
        Read more →
      </Link>
    </article>
  );
};

export default PostCard;
