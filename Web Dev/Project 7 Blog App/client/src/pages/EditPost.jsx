import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import styles from '../assets/EditPost.module.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!session || sessionError) {
        navigate('/login');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data || data.user_id !== userId) {
        toast.error('You are not authorized to edit this post.');
        setTimeout(() => navigate('/myposts'), 2000);
        return;
      }

      setTitle(data.title);
      setContent(data.content);
      try {
      const parsedTags =
      typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags;
        setTags(Array.isArray(parsedTags) ? parsedTags.join(', ') : '');
      } catch {
        setTags('');
      }

      setStatus(data.status);
      setLoading(false);
    };

    fetchPost();
  }, [id, navigate]);
 
  const handleGoBack = () => {
    navigate(-1); 
  };

  const handleUpdate = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast.error('Not authenticated.');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        tags: typeof tags === 'string'
  ? tags.split(',').map((t) => t.trim()).filter(Boolean)
  : [],

        status: 'published', 
        updated_at: new Date(),
      })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update post');
    } else {
      toast.success('Post updated successfully!');
      setTimeout(() => navigate('/myposts'), 1000);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>Edit Post</h2>
      <button onClick={handleGoBack} className={styles.button}>
        ⬅️ Go Back
      </button>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />

        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={handleUpdate} className={styles.buttonPrimary}>
          Update Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;
