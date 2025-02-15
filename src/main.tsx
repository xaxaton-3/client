import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'swiper/swiper-bundle.css';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
