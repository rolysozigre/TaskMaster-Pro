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
  const { ui, mode } = useTheme();

  return (
    <div className={`app-wrapper ${mode} ${ui === 'mui' ? 'theme-material' : 'theme-shadcn'}`}
    style={{height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Layout>
          <div className="container-xxl flex-grow-1 container-p-y p-3 b-0" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
            <div className="card">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/tasks/:id" element={<TaskDetail />} />
              <Route path="/tasks/:id/edit" element={<EditTask />} />
              <Route path="/create" element={<CreateTask />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            </div>
          </div>
        </Layout>
      </BrowserRouter>
    </div>
  );
}