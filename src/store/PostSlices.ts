import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../types/BlogTypse";
import { fetchPostApi, fetchPostsApi } from "../api/postApi";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchPostsApi();
  return response;
});

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (postId: any) => {
    const response = await fetchPostApi(postId);
    return response;
  }
);

export const fetchFilteredPosts = createAsyncThunk(
  "posts/fetchFilteredPosts",
  async (filter: string) => {
    const response = await fetchPostsApi(filter);
    return response;
  }
);

const getRandomNumber = () => {
  return Math.floor(Math.random() * 51);
};

interface IPostState {
  posts: IPost[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: IPostState = {
  posts: [],
  status: "idle",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactToPost(state, action) {
      const { postId, reactionType } = action.payload;
      const post = state.posts.find((p) => p.id === postId);

      if (post) {
        if (!post.liked && !post.disliked) {
          if (reactionType === "like") {
            post.likes += 1;
            post.liked = true;
          } else if (reactionType === "dislike") {
            post.dislikes += 1;
            post.disliked = true;
          }
        } else if (
          (reactionType === "like" && post.liked) ||
          (reactionType === "dislike" && post.disliked)
        ) {
          if (reactionType === "like") {
            post.likes -= 1;
            post.liked = false;
          } else if (reactionType === "dislike") {
            post.dislikes -= 1;
            post.disliked = false;
          }
        } else {
          if (reactionType === "like") {
            post.likes += 1;
            post.dislikes -= 1;
            post.liked = true;
            post.disliked = false;
          } else if (reactionType === "dislike") {
            post.dislikes += 1;
            post.likes -= 1;
            post.liked = false;
            post.disliked = true;
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.map((post: IPost) => ({
          ...post,
          liked: false,
          disliked: false,
          likes: getRandomNumber(),
          dislikes: getRandomNumber(),
        }));
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchFilteredPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.map((post: IPost) => ({
          ...post,
          likes: getRandomNumber(),
          dislikes: getRandomNumber(),
          liked: false,
          disliked: false,
        }));
      })
      .addCase(fetchFilteredPosts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const post = action.payload;
        const existingPost = state.posts.find((p) => p.id === post.id);
        if (!existingPost) {
          state.posts.push({
            ...post,
            liked: false,
            disliked: false,
            likes: Math.floor(Math.random() * 51),
            dislikes: Math.floor(Math.random() * 51),
          });
        }
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { reactToPost } = postsSlice.actions;
export default postsSlice.reducer;
