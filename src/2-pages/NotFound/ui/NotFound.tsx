import { FC } from 'react';
import cls from './NotFound.modules.scss';

interface NotFoundProps {
  className?: string;
};

export const NotFound: FC<NotFoundProps> = () => { 
  return (
    <div className={cls.NotFound}>
      Ничего не найдено 404.
    </div>
  );
};