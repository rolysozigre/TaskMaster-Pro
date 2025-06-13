import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.tsx";
import TaskList from "../pages/TaskList.tsx";
import TaskDetail from "../pages/TaskDetail.tsx";
import CreateTask from "../pages/CreateTask.tsx";
import Settings from "../pages/Settings.tsx";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/tasks", element: <TaskList /> },
  { path: "/tasks/:id", element: <TaskDetail /> },
  { path: "/create", element: <CreateTask /> },
  { path: "/settings", element: <Settings /> },
]);
