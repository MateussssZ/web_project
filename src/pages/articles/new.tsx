import { useState } from 'react';
import { useRouter } from 'next/router';
import ArticleForm from '../../components/ArticleForm';

const NewArticle = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (articleData: { title: string; content: string }) => {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      const data = await response.json()
      try {
        const res = await fetch("http://localhost:3003/notify",{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({ 
          title: data.title,
          createdAt: data.createdAt,
          url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/articles/${data.id}`
         }),
        })

        if (!res.ok){
          throw new Error()
        }
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
    }
      router.push('/');
    } else {
      const errorData = await response.json();
      setError(errorData.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Create New Article</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ArticleForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewArticle;