import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostCard from "~/components/PostCard";
import PostFilter from "~/components/PostFilter";
import type { Post, StrapiPost, StrapiProject, StrapiResponse } from "~/type";
import type { Route } from "./+types";

export const loader = async ({ request }: Route.LoaderArgs): Promise<{ posts: Post[] }> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`,
  );

  if (!response.ok) {
    throw new Response("Failed to fetch post metadata", { status: 500 });
  }

  const json: StrapiResponse<StrapiPost> = await response.json();
  const posts = json.data.map((post: StrapiPost) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    body: post.body,
    image: post.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${post.image.url}`
      : "/images/no-image.png",
  }));

  return { posts };
};

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { posts } = loaderData as { posts: Post[] };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const indexOfLastProject = currentPage * postsPerPage;
  const indexOfFirstProject = indexOfLastProject - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-white mb-2">Blog 📒</h2>

        <PostFilter
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />

        <div className="space-y-6">
          {currentPosts.length === 0 ? (
            <div className="text-gray-400">No posts found matching your search.</div>
          ) : (
            currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      )}
    </>
  );
};

export default BlogPage;
