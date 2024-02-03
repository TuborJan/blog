export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
  liked: boolean;
  disliked: boolean;
  likes: number;
  dislikes: number;
}
