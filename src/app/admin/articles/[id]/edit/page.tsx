'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  status: 'published' | 'draft';
  date: string;
  content: string;
};

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft' as const
  });

  useEffect(() => {
    // Загрузка статьи (замените на реальный API-вызов)
    const fetchArticle = async () => {
      try {
        // Имитация загрузки
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Имитация данных
        const mockArticle = {
          id: Number(id),
          title: `Article ${id}`,
          content: `Content for article ${id}`,
          status: 'draft' as const,
          date: new Date().toISOString().split('T')[0]
        };
        
        setArticle(mockArticle);
        setFormData({
          title: mockArticle.title,
          content: mockArticle.content,
          status: mockArticle.status
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Имитация сохранения
      await new Promise(resolve => setTimeout(resolve, 500));
      alert(`Article ${id} updated successfully!`);
      router.push('/admin/articles');
    } catch (error) {
      alert('Failed to update article');
    }
  };

  if (loading) {
    return <div className="loading">Loading article...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-form-container">
      <h2>Edit Article {id}</h2>
      
      <form onSubmit={handleSubmit} className="article-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="button"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="button primary"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}