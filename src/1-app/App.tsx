import { Suspense } from 'react';
import { NotFound } from '@/pages';
import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';

import './styles/index.scss';


export const App = () => {
  const [shorted, setShorted] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [expiresAt, setExpiresAt] = useState(null);
  const [alias, setAlias] = useState('');

  const shortingUrl = async () => {
    try {
      const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl,
          expiresAt,
          alias,
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
      <Suspense fallback={'Загрузка...'}>
          <Routes>
            <Route path='/' element={
              <div className='container'>
                <input value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} />
                <input type='date' value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
                <input value={alias} onChange={(e) => setAlias(e.target.value)} />
                <button onClick={shortingUrl}>Укоротить</button>
                {shorted}
              </div>
            } />
            <Route path='/*' element={<NotFound />} />
          </Routes>
      </Suspense>
    </div>
  );
};