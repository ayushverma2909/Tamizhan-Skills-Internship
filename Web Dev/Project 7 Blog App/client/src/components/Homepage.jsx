import styles from '../assets/Homepage.module.css';

const Homepage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome to My First Blog Project 📝</h1>
        <p>
          This is a full-stack blog editor built with modern web technologies. You can write, auto-save drafts, edit, and publish blog posts with ease.
        </p>
        <div className={styles.info}>
          <h3>🔧 Features:</h3>
          <ul>
            <li>💾 Auto-save drafts every 30 seconds or after 5 seconds of inactivity</li>
            <li>🚀 One-click publish to share your post instantly</li>
            <li>📋 View and manage both <strong>drafts</strong> and <strong>published blogs</strong></li>
            <li>🛡 Authentication using <strong>JWT</strong></li>
          </ul>
        </div>
        <div className={styles.info}>
          <h3>🛠 Built With:</h3>
          <ul>
            <li>⚛️ React.js (Frontend)</li>
            <li>📦 Node.js + Express (Backend)</li>
            <li>🐘 PostgreSQL via Supabase (Database)</li>
            <li>🎨 CSS Modules (Styling)</li>
          </ul>
        </div>
        <footer className={styles.footer}>
          Created to explore full-stack development.
        </footer>
      </div>
    </div>
  );
};

export default Homepage;
