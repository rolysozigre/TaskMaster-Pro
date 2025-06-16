import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/responsive.css';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeSwitcher } from "./themes/ThemeSwitcher";

import { makeServer } from './mirage/server.ts';
import { UIProvider } from './context/UIContext.tsx';
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_MIRAGE === 'true') {
  makeServer();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="p-4">
        <ThemeSwitcher />
          <UIProvider>
            <App />
          </UIProvider>
      </div>
    </ThemeProvider>
  </StrictMode>,
);

