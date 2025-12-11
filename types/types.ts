// // export type User = {
// //   avatarImage: string;
// //   bio: string;
// //   comments: any[];
// //   email: string;
// //   followers: any[];
// //   following: any[];
// //   id: number;
// //   savedPosts: SavedPost[];
// //   likes: any[];
// //   name: string;
// //   posts: any[];
// //   username: string;
// //   token: string;
// //   surname: string;
// // };

// // export type SavedPost = {
// //   id: number;
// //   postId: number;
// //   userId: number;
// //   createdAt: string;
// //   post: Post;
// // };

// // export type Comment = {
// //   id: number;
// //   content: string;
// //   authorId: number;
// //   postId: number;
// //   post?: Post;
// //   createdAt: string;
// //   author: User;
// //   likes: User[];
// // };

// // export type Post = {
// //   id: number;
// //   author: User;
// //   authorId: number;
// //   title: string;
// //   content: string;
// //   categories: { id: number; name: string }[];
// //   comments: Comment[];
// //   coverImage: string;
// //   published: boolean;
// //   createdAt: string;
// //   updatedAt: string;
// //   savedBy: {
// //     id: number;
// //     userId: number;
// //     postId: number;
// //     commentId: number;
// //     createdAt: string;
// //   }[];
// //   likes: {
// //     id: number;
// //     userId: number;
// //     postId: number;
// //     commentId: number;
// //     createdAt: string;
// //   }[];
// // };

// export type RecentPostsProps = {
//   publishedPosts: Post[];
// };

// export type PostDetailsProps = {
//   postById: Post[];
// };

// // export type SearchResultsProps = {
// //   searchResults: Post[];
// // };

// // export type AuthContextType = {
// //   user: User | null;
// //   register: (
// //     name: string,
// //     surname: string,
// //     username: string,
// //     email: string,
// //     password: string,
// //     bio: string,
// //     avatarImage: File
// //   ) => Promise<void>;
// //   login: (username: string, password: string) => Promise<void>;
// //   logout: () => void;
// //   editUser: (
// //     id: number,
// //     name: string,
// //     surname: string,
// //     username: string,
// //     email: string,
// //     bio: string,
// //     avatarImage: File | null
// //   ) => Promise<void>;
// //   loading: boolean;
// //   id: number | undefined;
// // };

// export type User = {
//   id: number;
//   name: string;
//   surname: string;
//   username: string;
//   email: string;
//   bio?: string | null;
//   avatarImage?: string | null;

// };

// export type Like = {
//   id: number;
//   userId: number;
//   postId: number;
//   commentId?: number | null;
//   createdAt: Date;
// };

// export type SavedBy = {
//   id: number;
//   userId: number;
//   postId: number;
//   commentId?: number | null;
//   createdAt: Date;
// };

// export type Comment = {
//   id: number;
//   content: string;
//   createdAt: Date;
//   updatedAt: Date;
//   author: User;
//   likes: Like[];
// };

// export type Category = {
//   id: number;
//   name: string;
// };

// export type Post = {
//   id: number;
//   author: User;
//   authorId: number;
//   title: string;
//   content: string;
//   coverImage: string | null;
//   published: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   comments: Comment[];
//   likes: Like[];
//   savedBy: SavedBy[];
//   categories: Category[];
// };

export type User = {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  bio?: string | null;
  avatarImage?: string | null;
  isAdmin: boolean;
  posts: Post[];
  comments: Comment[];
  likes: Like[];
  followers: Follower[];
  following: Follower[];
  savedPosts: SavedPost[];
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  published: boolean;
  authorId: number;
  author: User;
  comments: Comment[];
  likes: Like[];
  categories: Category[];
  savedBy: SavedPost[];
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  content: string;
  authorId: number;
  author: User;
  postId: number;
  post: Post;
  likes: Like[];
  createdAt: Date;
};

export type Category = {
  id: number;
  name: string;
  posts: Post[];
};

export type Like = {
  id: number;
  userId: number;
  user: User;
  postId?: number | null;
  post?: Post | null;
  commentId?: number | null;
  comment?: Comment | null;
  createdAt: Date;
};

export type Follower = {
  id: number;
  followerId: number;
  follower: User;
  followingId: number;
  following: User;
  createdAt: Date;
};

export type SavedPost = {
  id: number;
  userId: number;
  user: User;
  postId: number;
  post: Post;
  createdAt: Date;
};
