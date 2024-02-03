import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchPostsApi = async (filter?: string) => {
  const response = filter
    ? await axios.get(`${BASE_URL}/posts`, {
        params: {
          title_like: filter,
        },
      })
    : await axios.get(`${BASE_URL}/posts`);
  return response.data;
};

export const fetchPostApi = async (postId: number) => {
  const response = await axios.get(`${BASE_URL}/posts/${postId}`);
  return response.data;
};
