import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeSwitcher } from "./themes/ThemeSwitcher";

import { makeServer } from './mirage/server.ts';
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_MIRAGE === 'true') {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="p-4">
        <ThemeSwitcher />
        <App />
      </div>
    </ThemeProvider>
  </StrictMode>,
);

