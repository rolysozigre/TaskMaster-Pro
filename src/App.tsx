import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";
import CreateTask from "./pages/CreateTask";
import Settings from "./pages/Settings";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
