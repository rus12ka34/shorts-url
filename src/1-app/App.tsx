import { useEffect, useState } from 'react';
import './styles/index.scss';

export const App = () => {
  const [shorted, setShorted] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            originalUrl: '',
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

    fetchData();
  }, []);

  return (
    <div className={'App'}>
      <div className='container'>
        {shorted}
        
      </div>
    </div>
  );
};