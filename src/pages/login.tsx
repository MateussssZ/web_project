import { useState } from 'react';
import { useRouter } from 'next/router';

const DARK_BG = '#18191a';
const CARD_BG = '#23272b';
const BORDER = '#2e3237';
const TEXT = '#e6e6e6';
const ACCENT = '#6abf4b';

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
      setError(data.message || 'Ошибка');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: DARK_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'PT Sans', Arial, sans-serif",
      }}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap');
        body {
          margin: 0;
          background: ${DARK_BG};
          color: ${TEXT};
          font-family: 'PT Sans', Arial, sans-serif;
        }
        input, textarea {
          background: #23272b !important;
          color: #e6e6e6 !important;
          border: 1px solid #2e3237 !important;
        }
        input:focus, textarea:focus {
          border-color: #6abf4b !important;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
      <form
        onSubmit={handleSubmit}
        style={{
          background: CARD_BG,
          padding: 36,
          borderRadius: 14,
          boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
          minWidth: 340,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          border: `1px solid ${BORDER}`,
          animation: 'fadeIn 0.7s',
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: 8, fontWeight: 700, color: TEXT, fontSize: 24 }}>
          {isRegister ? 'Регистрация' : 'Вход'}
        </h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: `1px solid ${BORDER}`,
            fontSize: 16,
            background: CARD_BG,
            color: TEXT,
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '12px 14px',
            borderRadius: 8,
            border: `1px solid ${BORDER}`,
            fontSize: 16,
            background: CARD_BG,
            color: TEXT,
            outline: 'none',
            transition: 'border 0.2s',
          }}
        />
        {error && <div style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</div>}
        <button
          type="submit"
          style={{
            background: '#23272b',
            color: '#e6e6e6',
            border: '1.5px solid #6abf4b',
            borderRadius: 8,
            padding: '12px 0',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
            transition: 'background 0.2s, box-shadow 0.2s, color 0.2s, border 0.2s, transform 0.15s',
            outline: 'none',
            marginTop: 8,
          }}
        >
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </button>
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          style={{
            background: 'linear-gradient(90deg, #23272b 0%, #2e3237 100%)',
            color: '#6abf4b',
            border: `1.5px solid #6abf4b`,
            borderRadius: 8,
            padding: '8px 20px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(60,60,120,0.08)',
            transition: 'background 0.2s, color 0.2s, border 0.2s, transform 0.15s',
            outline: 'none',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {isRegister ? (
            <>
              <span style={{ fontSize: 18, lineHeight: 1, display: 'inline-block' }}>←</span>
              Уже есть аккаунт? Войти
            </>
          ) : (
            <>
              <span style={{ fontSize: 18, lineHeight: 1, display: 'inline-block' }}>→</span>
              Нет аккаунта? Зарегистрироваться
            </>
          )}
        </button>
      </form>
    </div>
  );
}