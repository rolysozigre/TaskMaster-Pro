import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState, type JSX } from 'react';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import Settings from './pages/Settings';
import Layout from './components/Layout/Layout';
import EditTask from './pages/EditTask';
import { useTheme } from './context/ThemeContext';
import Login from './pages/Login';
import { getCurrentUser } from './services/AuthService';
import Logout from './pages/Logout';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);
  if (loading) return <div>Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default function App() {
  const { ui, mode } = useTheme();

  return (
    <div className={`app-wrapper ${mode} ${ui === 'mui' ? 'theme-material' : 'theme-shadcn'}`}
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <div className="container-xxl flex-grow-1 container-p-y p-3 b-0" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>
                    <div className="card">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="tasks" element={<TaskList />} />
                        <Route path="tasks/:id" element={<TaskDetail />} />
                        <Route path="tasks/:id/edit" element={<EditTask />} />
                        <Route path="create" element={<CreateTask />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="api/login"/>
                        <Route path="/logout" element={<Logout />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </div>
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
