import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/AllBlogs.module.css';
import axios from 'axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : import.meta.env.VITE_API_BASE_URL || "https://blog-app-u6q5.onrender.com";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBlogs();
  }, []);

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
  return (
    <>
      <div className={styles.navigationLinks}>
        <Link to="/" className={styles.navLink}>🏠 Home</Link>
        <Link to="/myposts" className={styles.navLink}>📝 My Posts</Link>
      </div>

      <div className={styles.noteContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className={styles.noteCard} key={blog.id}>
              <h1 className={styles.noteTitle}>{blog.title}</h1>
              <p className={styles.noteMeta}>
                By {blog.users.username} on {formatDate(blog.created_at)}
      
              </p>
              <p className={styles.noteStatus}>
                Status: <span className={blog.status === 'published' ? styles.published : styles.draft}>
                  {blog.status}
                </span>
              </p>
              <p className={styles.noteContent}>{blog.content}</p>
            </div>
          ))
        ) : (
          <p className={styles.emptyMessage}>No notes available.</p>
        )}
      </div>
    </>
  );
};
export default AllBlogs;