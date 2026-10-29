import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// شبكة أمان: لو وسم viewport ناقص أو غلط في index.html، الموبايل بيعرض الموقع بعرض كمبيوتر (980px) مصغّر.
// هنا بنتأكد إنه موجود وصح مهما كان اللي في index.html.
const VIEWPORT = 'width=device-width, initial-scale=1.0';
let viewportMeta = document.querySelector('meta[name="viewport"]');
if (!viewportMeta) {
  viewportMeta = document.createElement('meta');
  viewportMeta.setAttribute('name', 'viewport');
  document.head.appendChild(viewportMeta);
}
viewportMeta.setAttribute('content', VIEWPORT);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
