import { useEffect, useState } from "react";
import { IPost } from "../../types/BlogTypse";
import BlogListItem from "../BlogListItem/BlogListItem";
import "./BlogList.scss";
import {
  fetchFilteredPosts,
  fetchPosts,
  reactToPost,
} from "../../store/PostSlices";
import { useAppDispatch, useAppSelector } from "../../store/store";

const BlogList = () => {
  const [filter, setFilter] = useState<string>();
  const dispatch = useAppDispatch();
  const { posts, status } = useAppSelector((state: any) => state.postsSlice);

  const handleReaction = (postId: number, reactionType: "like" | "dislike") => {
    dispatch(reactToPost({ postId, reactionType }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  useEffect(() => {
    if (filter || filter === "") {
      dispatch(fetchFilteredPosts(filter));
    }
  }, [filter]);

  return (
    <div className="blog-page container">
      <div className="blog-page__header">
        <h1>Блог</h1>
        <p>
          Здесь мы делимся интересными кейсами из наших проектов, пишем про IT,
          а также переводим зарубежные статьи
        </p>
        <input
          type="text"
          className="blog-page__search-bar"
          placeholder="Поиск по названию статьи"
          value={filter}
          onChange={handleSearch}
        />
      </div>
      <div className="blog-page__posts">
        {status === "loading" && <h1>Поиск...</h1>}
        {status === "succeeded" &&
          (posts.length > 0 ? (
            posts.map((post: IPost) => (
              <BlogListItem
                post={post}
                handleReaction={handleReaction}
                key={post.id}
              />
            ))
          ) : (
            <h1>Посты с названием "{filter}" не найдены</h1>
          ))}
        {status === "failed" && <h1>Посты не найдены!</h1>}
      </div>
    </div>
  );
};

export default BlogList;
