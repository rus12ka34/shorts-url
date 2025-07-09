import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from '@/app';

render(
  <Suspense fallback="loading">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);