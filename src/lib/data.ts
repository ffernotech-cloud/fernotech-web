import content from "@/data/content.json";

export interface Project {
  id: string;
  titleKey: string;
  categoryKey: string;
  image: string;
  descKey: string;
  detailsKeys: string[];
  tech: string[];
}

export interface Post {
  id: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export const projects: Project[] = content.projects;
export const posts: Post[] = content.posts;
