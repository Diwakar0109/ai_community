
export interface ProjectLink {
  type: 'github' | 'document';
  url: string;
}

export interface Project {
  id: string;
  topic: string;
  category: string;
  tags: string[];
  short_description: string;
  brief_description?: string;
  thumbnail_url: string;
  video_url: string;
  links: {
    github?: string;  // The '?' makes this property optional
    document?: string; // The '?' makes this property optional
  };
}
