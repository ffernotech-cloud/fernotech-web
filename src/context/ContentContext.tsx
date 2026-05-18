"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project, Post } from "@/lib/data"; // Import interfaces

interface ContentContextType {
  projects: Project[];
  posts: Post[];
  settings: any;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/public/content");
        if (!res.ok) throw new Error("Failed to fetch content");
        const data = await res.json();
        setProjects(data.projects || []);
        setPosts(data.posts || []);
        setSettings(data.settings || {});
      } catch (error) {
        console.error("Content fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <ContentContext.Provider value={{ projects, posts, settings, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error("useContent must be used within a ContentProvider");
  return context;
};
