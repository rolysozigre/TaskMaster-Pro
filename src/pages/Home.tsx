import type { FC } from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  start: string;
  end: string;
  assignee?: {
    id: string;
    name: string;
    avatar: string;
  };
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
};

const priorityClass = (priority: string) => {
  switch (priority) {
    case 'Haute':
      return 'bg-danger text-white';
    case 'Moyenne':
      return 'bg-warning text-dark';
    case 'Basse':
      return 'bg-success text-white';
    default:
      return 'bg-secondary';
  }
};

const Home: FC = () => {
  const categories = ['À faire', 'En cours', 'Terminé'];
  const priorities = ['Haute', 'Moyenne', 'Basse'];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data.tasks))
      .catch((err) => console.error('Erreur lors du fetch des tâches:', err));
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus ? task.status === filterStatus : true;
    const priorityMatch = filterPriority ? task.priority === filterPriority : true;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">Liste des tâches</h2>

      {/* Filtres */}
      <div className="mb-4 d-flex flex-wrap gap-3">
        <div>
          <label className="form-label">Filtrer par statut :</label>
          <select
            className="form-select"
            value={filterStatus || ''}
            onChange={(e) => setFilterStatus(e.target.value || null)}
          >
            <option value="">Tous les statuts</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="form-label">Filtrer par priorité :</label>
          <select
            className="form-select"
            value={filterPriority || ''}
            onChange={(e) => setFilterPriority(e.target.value || null)}
          >
            <option value="">Toutes les priorités</option>
            {priorities.map((prio) => (
              <option key={prio} value={prio}>
                {prio}
              </option>
            ))}
          </select>
        </div>

        <div className="align-self-end">
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setFilterStatus(null);
              setFilterPriority(null);
            }}
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>

      {/* Affichage conditionnel */}
      {filterStatus ? (
        // Affichage à plat par lignes de 3
        <div className="row">
          {filteredTasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body p-3">
                  <h6 className="fw-bold mb-1">
                    <a href={`/tasks/${task.id}`} className="text-decoration-none task-title">
                      {task.title}
                    </a>
                  </h6>
                  <span className={`badge ${priorityClass(task.priority)} mb-2`}>
                    Priorité : {task.priority}
                  </span>
                  <div className="text-muted small">
                    Du {task.start} au {task.end}
                  </div>
                  <div className="d-flex align-items-center mt-2 flex-wrap">
                    {task.assignee ? (
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
                    ) : (
                      <span className="text-muted me-3">Non assignée</span>
                    )}
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
            </div>
          ))}
        </div>
      ) : (
        // Affichage par défaut en colonnes
        <div className="row" style={{ overflowX: 'auto' }}>
          {categories.map((status) => {
            const tasksByStatus = filteredTasks.filter((task) => task.status === status);
            return (
              <div
                key={status}
                className="col-md-4 mb-3"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-light fw-bold text-center">{status}</div>
                  <div className="card-body d-flex flex-column gap-3">
                    {tasksByStatus.map((task) => (
                      <div
                        key={task.id}
                        className="card border-start border-1"
                        style={{ borderColor: '#007bff' }}
                      >
                        <div className="card-body p-3">
                          <h6 className="fw-bold mb-1">
                            <a
                              href={`/tasks/${task.id}`}
                              className="text-decoration-none task-title"
                            >
                              {task.title}
                            </a>
                          </h6>
                          <span className={`badge ${priorityClass(task.priority)} mb-2`}>
                            Priorité : {task.priority}
                          </span>
                          <div className="text-muted small">
                            Du {task.start} au {task.end}
                          </div>
                          <div className="d-flex align-items-center mt-2 flex-wrap">
                            {task.assignee ? (
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
                            ) : (
                              <span className="text-muted me-3">Non assignée</span>
                            )}
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
