import { Suspense } from 'react';
import { NotFound, Shorting, Information } from '@/pages';
import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';

import './styles/index.scss';


export const App = () => {
  
  return (
    <div className={'App'}>
      <Suspense fallback={'Загрузка...'}>
          <Routes>
            <Route path='/' element={<Shorting />} />
            <Route path='/information/:alias' element={<Information />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
      </Suspense>
    </div>
  );
};