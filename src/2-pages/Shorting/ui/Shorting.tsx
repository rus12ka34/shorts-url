import { FC, useState } from 'react';
import { Input, DatePicker, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CopyOutlined } from '@ant-design/icons';

import cls from './Shorting.modules.scss';

interface ShortingProps {
  className?: string;
}

interface ShortResponse {
  shortUrl: string;
}

export const Shorting: FC<ShortingProps> = () => {
  const [shorted, setShorted] = useState<string>('');
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [alias, setAlias] = useState<string>('');

  const onShortingUrl = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          originalUrl,
          expiresAt: expiresAt?.toISOString(),
          alias,
        })
      });
      const json = await response.json() as ShortResponse;
      setShorted(json.shortUrl);
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  };

  return (
    <div className={cls.Shorting}>
      <div className={cls.Shorting__container}>
        <Input
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Введите URL для сокращения"
          size="large"
        />
        <DatePicker
          value={expiresAt}
          onChange={(date) => setExpiresAt(date)}
          placeholder="Выберите дату истечения"
          size="large"
        />
        <Input
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          placeholder="Введите желаемый алиас"
          size="large"
        />
        <Button
          type="primary"
          onClick={onShortingUrl}
          size="large"
          block
        >
          Укоротить
        </Button>
        {shorted && (
          <>
            <div className={cls.Shorting__shortedUrl}>
              <CopyOutlined onClick={() => navigator.clipboard.writeText(shorted)} />
              <Typography.Text
                type="success"
                strong
              >
                <a href={shorted} target="_blank" rel="noopener noreferrer">{shorted}</a>
              </Typography.Text>
            </div>
            <div className={cls.Shorting__information}>
            <Typography.Text
              type="secondary"
              strong
            >
              <Link to={`/information/${shorted.split('/').pop()}`}>Перейти к аналитике</Link>
            </Typography.Text>
          </div>
        </>
        )}
      </div>
    </div>
  );
};