import { useState, useEffect } from 'react';

export function useArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  return { articles, setArticles };
}