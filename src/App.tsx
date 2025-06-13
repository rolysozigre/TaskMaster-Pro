import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';
import EditTask from './pages/EditTask';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();
  const { colorMode } = useTheme();
  return (
    <div className={`app-wrapper ${colorMode} ${theme === 'mui' ? 'theme-material' : 'theme-shadcn'}`}>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/tasks/:id/edit" element={<EditTask />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </div>
  );
}
