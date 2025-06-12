import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import Application from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Application />
  </StrictMode>,
);