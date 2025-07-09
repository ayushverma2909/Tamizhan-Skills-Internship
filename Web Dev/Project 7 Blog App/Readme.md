# 📝 Full Stack Blog Editor 


[🔗 Project Demo](https://ayushverma2909.github.io/Blog-App/)

A full-stack blog editor application with **auto-save draft**, **publish**, and **edit** features. Built to demonstrate frontend, backend, and database integration skills.

---

## ⚙️ Tech Stack

### 🖥 Frontend
- **Framework:** React.js
- **Styling:** CSS Modules
- **Debounce + Auto-Save:** Custom React Hook

### 🛠 Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** JWT 
- **API Type:** RESTful

---

## 🧠 Features

- 📝 Create/Edit blog posts (title, content, tags)
- 💾 Save as Draft
- 🚀 Publish blog posts
- 🔄 Auto-Save Draft
  - After 5 seconds of inactivity (debounced)
  - Also saved every 30 seconds as backup
- 🧾 View all blogs
  - Drafts and Published listed separately
- 🔐 JWT-protected APIs (Bonus)
- 🔔 Toast notification on auto-save (Bonus)

---
### 🛠 How to Install & Run Locally

# 1. Clone the repository
```bash
git clone https://github.com/ayushverma2909/Blog-App.git
cd Blog-App

# 2. Install dependencies for both client and server
cd server
npm install

cd ../client
npm install

# Run the backend
cd server
nodemon index.js

# In a separate terminal, run the frontend
cd ../client
npm run dev

```

### 🛠 Supabase installation


1. Create an account at [https://www.supabase.com](https://www.supabase.com).
2. Create a new project and set up a database.
3. Go to the **SQL Editor** and run the SQL commands provided in the `schemas.sql` file.
4. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase **Project Settings → API** section.
5. Paste them into the `.env.example` files in both the `client/` and `server/` folders.
6. Rename `.env.example` files to `.env`.

✅ That's it — you're now all set! 😄 Enjoy!



