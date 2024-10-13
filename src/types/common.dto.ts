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
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: Date;
    tags: string[];
    image?: string;
    likes?:number
    authorId:string
    postId?:string,
  };

  export type LikeDTO={
    liked:boolean,
    byUser:string,
    Postid:string,
    authorId:string,
    shared?:string
  }

  export type CommentDTO={
    Commentlikes?:number,
    comment:string,
    byUser:string,
    Postid:string,
    shared?:string
    userName?:string,
  }

  export type profileDTO={
    id?:string,
    uid: string,
    email: string,
    displayName: string,
    photoURL: string, 
    public:boolean
  }
  
  