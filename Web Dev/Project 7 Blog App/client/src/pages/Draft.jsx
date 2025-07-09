import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import styles from '../assets/Draft.module.css';
import axios from 'axios'

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAndDrafts = async () => {
      setLoading(true);
      setError('');
      setMessage('');

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        navigate('/login');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('posts')
        .select('*, user: user_id (username)')
        .eq('user_id', userId)
        .eq('status', 'draft')
        .order('updated_at', { ascending: false });

      if (error) {
        setError('Failed to load drafts.');
      } else {
        setDrafts(data);
        if (data.length === 0) setMessage('No drafts found.');
      }

      setLoading(false);
    };

    getUserAndDrafts();
  }, [navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  const formatDate = (dateStr) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateStr).toLocaleString(undefined, options);
  };

  const handleDelete = async (postId) => {
  if (!window.confirm('Are you sure you want to delete this post?')) return;

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError('You are not authenticated.');
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
    
    setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.id !== postId));
    setMessage('Draft deleted successfully.');
  } catch (err) {
    console.error(err);
    setError('Failed to delete post.');
  }
};


  const truncate = (text, max = 100) =>
    text ? (text.length > max ? text.slice(0, max) + '...' : text) : '';

  return (
    <div className={styles.container}>
      <h2>My Drafts</h2>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        ← Back to Posts
      </button>

      {loading && <p>Loading drafts...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.grid}>
        {drafts.map((draft) => (
          <div key={draft.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.status}>Status: Draft</span>
              {draft.tags && draft.tags.length > 0 && (
                <span className={styles.tags}>
                  Tags: {Array.isArray(draft.tags) ? draft.tags.join(', ') : draft.tags}
                </span>
              )}
            </div>

            <h3 className={styles.title}>{draft.title || '(Untitled Draft)'}</h3>
            <p className={styles.content}>{truncate(draft.content)}</p>

            <div className={styles.cardFooter}>
              <span className={styles.username}>
                By: {draft.user?.username || 'Unknown'}
              </span>
              <span className={styles.date}>{formatDate(draft.updated_at || draft.created_at)}</span>
            </div>

            <button onClick={() => handleEdit(draft.id)} className={styles.editButton}>
              Edit Draft
            </button>
            <button
                onClick={() => handleDelete(draft.id)}
                className={styles.deleteButton}
              >
                Delete Draft
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;
