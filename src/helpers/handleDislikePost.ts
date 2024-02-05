import { IPost } from "../types/BlogTypse";

export const handleDoslikePost = (post: IPost) => {
  if (!post.reactions.liked && !post.reactions.disliked) {
    post.reactions.dislikes += 1;
    post.reactions.disliked = true;
  } else if (post.reactions.disliked) {
    post.reactions.dislikes -= 1;
    post.reactions.disliked = false;
  } else {
    post.reactions.dislikes += 1;
    post.reactions.disliked = true;
    post.reactions.likes -= 1;
    post.reactions.liked = false;
  }
};
