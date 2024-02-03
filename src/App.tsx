import "./App.scss";
import { Route, Routes } from "react-router-dom";
import BlogList from "./components/BlogList/BlogList";
import Post from "./components/Post/Post";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
