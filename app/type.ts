export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  url: string;
  featured: boolean;
}
export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}