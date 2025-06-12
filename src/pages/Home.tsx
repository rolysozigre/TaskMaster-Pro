// src/pages/Home.tsx
import type { FC } from "react";
import { mockTasks } from "../data/mockTasks";
import "bootstrap/dist/css/bootstrap.min.css";

const priorityClass = (priority: string) => {
  switch (priority) {
    case "Haute":
      return "bg-danger text-white";
    case "Moyenne":
      return "bg-warning text-dark";
    case "Basse":
      return "bg-success text-white";
    default:
      return "bg-secondary";
  }
};

const Home: FC = () => {
  const categories = ["À faire", "En cours", "Terminé"];

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Liste des tâches</h2>

      <div className="row" style={{ overflowX: "auto" }}>
        {categories.map((category) => (
          <div
            key={category}
            className="col-md-4 mb-3"
            style={{maxHeight: "80vh", overflowY: "auto" }}
          >
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-light fw-bold text-center">
                {category}
              </div>
              <div className="card-body d-flex flex-column gap-3">
                {mockTasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="card border-start border-1"
                      style={{ borderColor: "#007bff" }}
                    >
                      <div className="card-body p-3">
                            <h6 className="fw-bold mb-1">
                                <a href={`/tasks/${task.id}`} className="text-decoration-none task-title">
                                    {task.title}
                                </a>
                            </h6>
                        <span
                          className={`badge ${priorityClass(
                            task.priority
                          )} mb-2`}
                        >
                          Priorité : {task.priority}
                        </span>

                        <div className="text-muted small">
                          Du {task.start} au {task.end}
                        </div>

                        <div className="d-flex align-items-center mt-2 flex-wrap">
                            <a
                                href={`/profil/user/${task.assignee.id}`}
                                className="d-flex align-items-center me-3 text-decoration-none text-dark"
                            >
                                <img
                                src={task.assignee.avatar}
                                alt={task.assignee.name}
                                className="rounded-circle me-1"
                                width="24"
                                height="24"
                                />
                                <span>à {task.assignee.name}</span>
                            </a>

                            <a
                                href={`/profil/user/${task.creator.id}`}
                                className="d-flex align-items-center text-muted text-decoration-none"
                            >
                                <img
                                src={task.creator.avatar}
                                alt={task.creator.name}
                                className="rounded-circle me-1"
                                width="24"
                                height="24"
                                />
                                <span>par {task.creator.name}</span>
                            </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
