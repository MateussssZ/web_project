import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.message || 'Error');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f6fa'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          padding: 32,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 8 }}>
          {isRegister ? 'Регистрация' : 'Вход'}
        </h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 5,
            border: '1px solid #eaeaea',
            fontSize: 16,
          }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '10px 12px',
            borderRadius: 5,
            border: '1px solid #eaeaea',
            fontSize: 16,
          }}
        />
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            padding: '12px 0',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0070f3',
            fontWeight: 500,
            fontSize: 15,
            cursor: 'pointer',
            padding: 0,
            textDecoration: 'underline'
          }}
        >
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}