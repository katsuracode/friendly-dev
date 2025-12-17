export type Project = {
  id: string;
  documentId: string;
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

export type StrapiResponse<T> {
  data: T[];
}

export type StrapiProject = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image?: {
    url: string,
    formats?: {
      thumbnail?: { url: string },
      small?: { url: string },
      medium?: { url: string },
      large?: { url: string },
    }
  }
  category: string;
  date: string;
  url: string;
  featured: boolean;
}