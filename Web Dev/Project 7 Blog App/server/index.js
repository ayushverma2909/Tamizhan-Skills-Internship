import express from "express";
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Malformed token' });

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
}


app.get("/api/blogs", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`*, users (username)`)
      .eq('status', 'published');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching notes: ' + err.message);
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.post("/api/blogs/publish", authenticate, async (req, res) => {
  const { title, content, tags } = req.body;
  const user_id = req.user.id;

  try {
    const { data, error } = await supabase.from('posts').upsert([{
      title,
      content,
      tags,
      user_id,
      status: 'published',
      updated_at: new Date().toISOString(),
    }], { onConflict: ['user_id', 'title'] });

    if (error) throw error;

    res.status(201).json({ message: 'Post published', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/blogs/save-draft", authenticate, async (req, res) => {
  const { title, content, tags } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("posts")
    .upsert([
      {
        user_id,
        title,
        content,
        tags,
        status: "draft",
        updated_at: new Date().toISOString(),
      }
    ], { onConflict: ['user_id', 'title'] });

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});


app.delete("/api/blogs/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id); 

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json({ message: "Deleted successfully", data });
});


app.put("/api/blogs/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, status } = req.body;
  const user_id = req.user.id;

  const { data, error } = await supabase
    .from("posts")
    .update({ title, content, tags, status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});



app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
