'use client';
import { useRouter } from 'next/navigation';

export default function CreateArticlePage() {
  const router = useRouter();

  return (
    <div className="article-form-container">
      <h2>Create New Article</h2>
      
      <form className="article-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" rows={10}></textarea>
        </div>
        
        <div className="form-actions">
          <button type="button" onClick={() => router.back()}>
            Cancel
          </button>
          <button type="submit">
            Save Article
          </button>
        </div>
      </form>
    </div>
  );
}