import type { FC } from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../types";

type Props = {
  title: string;
  tasks: Task[];
};

const TaskColumn: FC<Props> = ({ title, tasks }) => {
  return (
    <div className="col">
      <h5 className="text-center fw-bold mb-3">{title}</h5>
      {tasks.map(task => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
};

export default TaskColumn;
