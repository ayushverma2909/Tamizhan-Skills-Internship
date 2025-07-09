import { BrowserRouter , Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import AllBlogs from "./pages/AllBlogs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyPosts from "./pages/MyPosts";
import NewPost from "./pages/NewPosts";
import Drafts from "./pages/Draft";
import EditPost from "./pages/EditPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter basename="/Blog-App">
        <ToastContainer position="top-center" />

        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="blogs" element={<AllBlogs />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="newpost" element={<NewPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/drafts" element={<Drafts />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
