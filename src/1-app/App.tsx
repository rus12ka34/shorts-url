import { useState } from 'react';
import './styles/index.scss';

export const App = () => {
  const [shorted, setShorted] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');

  const shortingUrl = async () => {
    try {
      const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl,
          expiresAt: '',
          alias: '',
        })
      });
      const json = await response.json();
      setShorted(json.shortUrl);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  
  return (
    <div className={'App'}>
      <div className='container'>
        <input value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
        <button onClick={shortingUrl}>Укоротить</button>
        {shorted}
      </div>
    </div>
  );
};