import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal, Button } from 'react-bootstrap';

const priorities = ['Haute', 'Moyenne', 'Faible'];
const categories = ['À faire', 'En cours', 'Terminée'];

const EditTask: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [task, setTask] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // ✅ Ajouté

  useEffect(() => {
    fetch(`/api/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data.task))
      .catch(() => setError("Impossible de charger la tâche."));

    fetch(`/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      navigate(`/tasks/${id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateField = (field: string, value: any) => {
    setTask((prev: any) => ({ ...prev, [field]: value }));
  };

  if (!task) return <p>Chargement...</p>;

  const assignedTo = task.assignee;

  const handleAssign = () => {
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      <h2>Modifier la tâche</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        {/* Titre */}
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            value={task.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data={task.description}
            onChange={(_, editor) => updateField('description', editor.getData())}
          />
        </div>

        {/* Priorité / Statut / Difficulté */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Priorité</label>
            <select
              className="form-select"
              value={task.priority}
              onChange={(e) => updateField('priority', e.target.value)}
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Statut</label>
            <select
              className="form-select"
              value={task.status}
              onChange={(e) => updateField('status', e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Difficulté</label>
            <input
              type="range"
              min="1"
              max="5"
              value={task.difficulty}
              onChange={(e) => updateField('difficulty', Number(e.target.value))}
              className="form-range"
            />
            <span>{task.difficulty} / 5</span>
          </div>
        </div>

        {/* Dates */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Date de début</label>
            <input
              type="date"
              className="form-control"
              value={task.start}
              onChange={(e) => updateField('start', e.target.value)}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Date de fin</label>
            <input
              type="date"
              className="form-control"
              value={task.end}
              onChange={(e) => updateField('end', e.target.value)}
            />
          </div>
        </div>

        {/* Assigné à */}
        <div className="col-md-3 mb-4">
          <strong>Assigné à :</strong><br />
          {assignedTo ? (
            <div className="d-flex align-items-center gap-2 mt-2">
              <img src={assignedTo.avatar} alt="" width="32" height="32" className="rounded-circle" />
              <span>{assignedTo.name} <small className="text-muted">({assignedTo.role})</small></span>
              <button type="button" className="btn btn-sm btn-link" onClick={handleAssign}>Modifier</button>
            </div>
          ) : (
            <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={handleAssign}>
              Cliquez pour choisir
            </button>
          )}
        </div>

        {/* Bouton Enregistrer */}
        <div className="mt-4 d-flex justify-content-end">
          <button type="submit" className="btn btn-secondary">
            Enregistrer les modifications
          </button>
        </div>
      </form>

      {/* Modal pour assigner */}
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
                    updateField('assignee', user); // ✅ Mise à jour correcte
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

export default EditTask;
