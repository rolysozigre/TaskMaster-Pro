import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const priorities = ['Haute', 'Moyenne', 'Faible'];
const categories = ['À faire', 'En cours', 'Terminée'];

const CreateTask: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Moyenne');
  const [status, setStatus] = useState('À faire');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [assignedTo, setAssignedTo] = useState<any | null>(null);
  const [difficulty, setDifficulty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch(() => setError('Erreur de chargement des utilisateurs.'));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status,
      start,
      end,
      assignedTo,
      difficulty,
      creator: {
        id: 1,
        name: 'Admin',
        role: 'Administrateur',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
    };

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask }),
      });

      if (!res.ok) throw new Error('Échec de la création de la tâche');

      const data = await res.json();
      navigate(`/tasks/${data.task.id}`);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de la tâche');
    }
  };

  return (
    <div className="container py-4">
      <h2>Créer une nouvelle tâche</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={description}
            onChange={(_, editor) => setDescription(editor.getData())}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Priorité</label>
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Statut</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Difficulté</label>
            <input
              type="range"
              min="1"
              max="5"
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="form-range"
            />
            <span>{difficulty} / 5</span>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Date de début</label>
            <input
              type="date"
              className="form-control"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date de fin</label>
            <input
              type="date"
              className="form-control"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <strong>Assigné à :</strong>
          <br />
          {assignedTo ? (
            <div className="d-flex align-items-center gap-2 mt-2">
              <img
                src={assignedTo.avatar}
                alt={assignedTo.name}
                width="32"
                height="32"
                className="rounded-circle"
              />
              <span>
                {assignedTo.name}{' '}
                <small className="text-muted">({assignedTo.role})</small>
              </span>
              <button
                className="btn btn-sm btn-link"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Modifier
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-primary btn-sm mt-2"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Cliquez pour choisir
            </button>
          )}
        </div>

        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Créer la tâche
          </button>
        </div>
      </form>

      {/* Modal de sélection d'utilisateur */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Choisir un utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Rechercher par nom ou rôle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {users
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <button
                  key={user.id}
                  type="button"
                  className="list-group-item list-group-item-action d-flex align-items-center gap-2"
                  onClick={() => {
                    setAssignedTo(user);
                    setShowModal(false);
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                  <span>
                    {user.name} <small className="text-muted">({user.role})</small>
                  </span>
                </button>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTask;
