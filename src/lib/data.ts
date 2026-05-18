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

export interface EventDetails {
  title: string;
  desc: string;
  date: string;
  location: string;
  capacity: string;
}

export interface Event {
  id: string;
  type: "upcoming" | "past";
  tag: string;
  time: string;
  color: string;
  fr: EventDetails;
  en: EventDetails;
  sg: EventDetails;
}

