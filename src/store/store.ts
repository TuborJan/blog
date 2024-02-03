import { configureStore } from "@reduxjs/toolkit";
import postsSlice, { fetchPosts } from "./PostSlices";
import { AppDispatch, RootState } from "../types/StoreHooks";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    postsSlice,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
