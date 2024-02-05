import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPost } from "../types/BlogTypse";
import { fetchPostApi, fetchPostsApi } from "../api/postApi";
import { handleLikePost } from "../helpers/handleLikePost";
import { handleDoslikePost } from "../helpers/handleDislikePost";

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

      if (!post) return;

      switch (reactionType) {
        case "like":
          handleLikePost(post);
          break;
        case "dislike":
          handleDoslikePost(post);
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.map((post: IPost) => ({
          ...post,
        }));
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      })

      //fetch posts with filter
      .addCase(fetchFilteredPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.map((post: IPost) => ({
          ...post,
        }));
      })
      .addCase(fetchFilteredPosts.rejected, (state) => {
        state.status = "failed";
      })

      //fetch single post
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
