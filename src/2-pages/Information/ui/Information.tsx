import { FC, useEffect, useState } from 'react';
import { Typography, Button, Card, List, Empty, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import cls from './Information.modules.scss';

interface InformationProps {
  className?: string;
}

interface AnalyticsItem {
  createdat: string;
  ip: string;
}

interface AnalyticsData {
  totalFollow: number;
  analytics: AnalyticsItem[];
}

interface UrlData {
  id: string;
  targeturl: string;
  expiresat: string;
  totalFollow: number;
}

export const Information: FC<InformationProps> = () => {
  const { alias } = useParams();
  const [data, setData] = useState<UrlData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/info/${alias}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`http://localhost:3000/analytics/${alias}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const json = await response.json();
        setAnalytics(json);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchAnalytics();
  }, [alias]);

  const onDeleteUrl = async () => {
    try {
      await fetch(`http://localhost:3000/delete/${alias}`, {
        method: 'DELETE',
      });
      navigate('/');  
    } catch (error) {
      console.error('Ошибка при удалении данных:', error);
    }
  };

  if (loading) {
    return (
      <div className={cls.Shorting}>
        <Spin size="large" />
      </div>
    );
  }
  
  if (data && !data.id || analytics && !analytics.analytics) {
    return (
      <div className={cls.Shorting}>
        <Empty description="Ссылка не найдена" />
      </div>
    );
  }

  return (
    <div className={cls.Shorting}>
      <div className={cls.container}>
        {data && data.id && (
          <Card title="Информация о ссылке" style={{ marginBottom: 16 }}>
            <Typography.Title level={4}>ID: {data.id}</Typography.Title>
            <Typography.Paragraph>
              <Typography.Text strong>Целевой URL: </Typography.Text>
              {data.targeturl}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Срок действия: </Typography.Text>
              {data.expiresat}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Всего переходов: </Typography.Text>
              {data.totalFollow}
            </Typography.Paragraph>
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />}
              onClick={onDeleteUrl}
            >
              Удалить
            </Button>
          </Card>
        )}
        {analytics && (
          <Card title="Аналитика">
            <Typography.Title level={4}>
              Всего переходов: {analytics.totalFollow}
            </Typography.Title>
            <List
              dataSource={analytics.analytics}
              renderItem={(item: AnalyticsItem) => (
                <List.Item>
                  <Typography.Text>Дата: {item.createdat}</Typography.Text>
                  <Typography.Text>IP: {item.ip}</Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </div>
  );
};