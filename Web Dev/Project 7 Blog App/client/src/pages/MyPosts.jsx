import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import styles from "../assets/MyPosts.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAndPosts = async () => {
      setLoading(true);
      setError("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        navigate("/login");
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from("posts")
        .select("*, user: user_id (username)")
        .eq("user_id", userId)
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load posts.");
      } else {
        setPosts(data);
      }

      setLoading(false);
    };

    getUserAndPosts();
  }, [navigate]);

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
      toast.success("Logout Successful");
    } else {
      setError("Logout failed. Please try again.");
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError("You are not authenticated.");
        return;
      }

      const token = session.access_token;

      const API_BASE_URL =
        import.meta.env.MODE === "development"
          ? "http://localhost:4000"
          : import.meta.env.VITE_API_BASE_URL;

      await axios.delete(`${API_BASE_URL}/api/blogs/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete post.");
    }
  };

  const formatDate = (dateStr) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  // const truncate = (text, max = 100) =>
  //   text.length > max ? text.slice(0, max) + '...' : text;

  return (
    <div className={styles.container}>
      <h2>My Posts</h2>

      <div className={styles.topLinks}>
        <Link to="/drafts" className={styles.link}>
          My Drafts
        </Link>
        <Link to="/newpost" className={styles.link}>
          Create New Post
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts found.</p>}

      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.status}>
                Status:{" "}
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </span>
              {post.tags && post.tags.length > 0 && (
                <span className={styles.tags}>
                  Tags:{" "}
                  {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags}
                </span>
              )}
            </div>
              
            <h3 className={styles.title}>{post.title}</h3>
            <span className={styles.username}>
                By: @{post.user?.username || "Unknown"}
              </span>
            {
              <p className={styles.content}>
                {/*truncate(post.content)*/ post.content}
              </p>
            }
            
            <div className={styles.cardFooter}>
              
              <div className={styles.cardDates}>
                <span className={styles.date}>
                  Created at: {formatDate(post.created_at)}
                </span>
                {post.updated_at && post.updated_at !== post.created_at && (
                  <span className={styles.updatedDate}>
                    
                    Updated at: {formatDate(post.updated_at)}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button
                onClick={() => handleEdit(post.id)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
