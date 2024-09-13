// Define the VisitorDTO type
export type VisitorDTO = {
    id?: string;
    ip: string | null;
    userAgent: string;
    timestamp: Date;
    pageVisited: string;
  };

  // PostDTO - Type definition for a Post
export type PostDTO = {
  title: string;
  content: string;
  author: string;
  timestamp: Date|string;
  tags: string|number[] |string;
};
