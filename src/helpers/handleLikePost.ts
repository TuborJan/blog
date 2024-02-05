import { IPost } from "../types/BlogTypse";

export const handleLikePost = (post: IPost) => {
  if (!post.reactions.liked && !post.reactions.disliked) {
    post.reactions.likes += 1;
    post.reactions.liked = true;
  } else if (post.reactions.liked) {
    post.reactions.likes -= 1;
    post.reactions.liked = false;
  } else {
    post.reactions.likes += 1;
    post.reactions.liked = true;
    post.reactions.dislikes -= 1;
    post.reactions.disliked = false;
  }
};
