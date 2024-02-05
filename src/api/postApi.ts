import axios from "axios";
import { getRandomNumber } from "../helpers/getRandomNumber";
import { IPost } from "../types/BlogTypse";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPostsApi = async (filter?: string) => {
  const response = await axios.get(`${BASE_URL}/posts`, {
    params: {
      title_like: filter,
    },
  });

  const postsData = response.data;

  const initialReactions = {
    liked: false,
    disliked: false,
    likes: getRandomNumber(),
    dislikes: getRandomNumber(),
  };

  const postsWithReactions = postsData.map((post: IPost) => ({
    ...post,
    reactions: initialReactions,
  }));

  return postsWithReactions;
};

export const fetchPostApi = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}`);

  const postData = response.data;

  const initialReactions = {
    liked: false,
    disliked: false,
    likes: getRandomNumber(),
    dislikes: getRandomNumber(),
  };

  const postsWithReactions = {
    ...postData,
    reactions: initialReactions,
  };

  return postsWithReactions;
};
