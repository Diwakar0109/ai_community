
export interface ProjectLink {
  type: 'github' | 'document';
  url: string;
}

export interface Project {
  id: string;
  topic: string;
  tags: string[];
  short_description: string;
  thumbnail_url: string;
  video_url: string;
  link: ProjectLink;
}
