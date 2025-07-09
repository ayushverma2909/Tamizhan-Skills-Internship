import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import styles from '../assets/NewPost.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState('');
  const [draftId, setDraftId] = useState(null); 

  const autoSaveTimeout = useRef(null);

  useEffect(() => { // for username
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You are not authenticated. Please log in.');
        setTimeout(() => navigate('/login'), 500);
        return;
      }

      const { data: userData, error } = await supabase
        .from('users')
        .select('username')
        .eq('id', session.user.id)
        .single();

      if (!error && userData?.username) {
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
        setUsername(capitalize(userData.username));
      }
  };

    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!title && !content) return;

    if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);

    autoSaveTimeout.current = setTimeout(() => {
      handleSaveDraft();
    }, 5000);

    return () => {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    };
  }, [title, content, tags]);

  const handleGoBack = () => navigate(-1);

  const handleSaveDraft = async () => {
    setSaving(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      toast.error('You are not authenticated. Please log in.');
      setSaving(false);
      navigate('/login');
      return;
    }

    const userId = session.user.id;
    const payload = {
      user_id: userId,
      title,
      content,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      status: 'draft',
      updated_at: new Date(),
    };

    let response;

    if (draftId) {
      response = await supabase.from('posts').update(payload).eq('id', draftId);
    } else {
      const insertRes = await supabase.from('posts').insert([payload]).select().single();

      if (insertRes.error) {
        toast.error('Failed to auto-save draft.');
        setSaving(false);
        return;
      }

      setDraftId(insertRes.data.id); 
      response = insertRes;
    }

    if (response.error) {
      toast.error('Failed to auto-save draft.');
    } else {
      toast.success('Draft auto-saved');
    }

    setSaving(false);
  };

  const handlePublish = async () => {
    if (!title || !content) {
      toast.error('Title and content are required to publish.');
      return;
    }

    setSaving(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session || sessionError) {
      toast.error('You are not authenticated. Please log in.');
      setSaving(false);
      navigate('/login');
      return;
    }

    const userId = session.user.id;
    const payload = {
      user_id: userId,
      title,
      content,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      status: 'published',
      updated_at: new Date(),
    };

    const publishRes = draftId
      ? await supabase.from('posts').update(payload).eq('id', draftId)
      : await supabase.from('posts').insert([payload]);

    if (publishRes.error) {
      toast.error('Failed to publish post.');
    } else {
      toast.success('Post published successfully!');
      setTimeout(() => navigate('/myposts'), 1000);
    }

    setSaving(false);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        ← Back
      </button>

      <h2>Welcome{username && ` ${username}.`}</h2>
      <h3>Create a New Post</h3>

      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Post Title"
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
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button onClick={handleSaveDraft} disabled={saving} className={styles.buttonSecondary}>
          Save Draft
        </button>
        <button onClick={handlePublish} disabled={saving} className={styles.buttonPrimary}>
          Publish
        </button>
      </div>

      {saving && <p className={styles.saving}>Saving...</p>}
    </div>
  );
};

export default NewPost;
