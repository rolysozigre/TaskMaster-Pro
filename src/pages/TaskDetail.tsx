import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal, Button } from 'react-bootstrap';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const categories = ['À faire', 'En cours', 'Terminée'];

const TaskDetail: FC = () => {
  const { id } = useParams();
  const [task, setTask] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [assignedTo, setAssignedTo] = useState<any | null>(null);
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [comments, setComments] = useState<string[]>([]);
  const [editorData, setEditorData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error('Erreur lors de la récupération de la tâche');
        const data = await res.json();

        setTask(data.task);
        setAssignedTo(data.task.assignee);
        setPriority(data.task.priority);
        setCategory(data.task.status);
      } catch (err: any) {
        setError(err.message || 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const handleAssign = () => {
    setShowModal(true);
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editorData.trim() !== '' && editorData !== '<p></p>') {
      setComments([...comments, editorData]);
      setEditorData('');
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Es-tu sûr de vouloir supprimer cette tâche ?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Échec de la suppression de la tâche.');

      navigate('/'); // Redirige vers la liste
    } catch (err: any) {
      alert(err.message);
    }
  };


  if (loading) return <div className="container py-5">Chargement de la tâche...</div>;
  if (error || !task) return <div className="container py-5 text-danger">{error || 'Tâche introuvable.'}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Détail de la tâche</h2>
        <Dropdown>
          <Dropdown.Toggle variant="primary" className="shadow-sm text-white">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Link} to={`/tasks/${task.id}/edit`}>
              Modifier
            </Dropdown.Item>
            <Dropdown.Item className="text-danger" onClick={handleDelete}>
              Supprimer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0">{task.title}</h3>
            {task.creator && (
              <div className="d-flex align-items-center gap-2 mt-3">
                <img
                  src={task.creator.avatar}
                  alt={task.creator.name}
                  width="28"
                  height="28"
                  className="rounded-circle"
                />
                <span className="text-muted small">
                  Créée par <strong>{task.creator.name}</strong> ({task.creator.role})
                </span>
              </div>
            )}
          </div>
          <span
            className={`badge ${
              priority === 'Haute'
                ? 'bg-danger'
                : priority === 'Moyenne'
                  ? 'bg-warning text-dark'
                  : 'bg-success'
            }`}
          >
            {priority} priorité
          </span>
        </div>

        <div className="card-body">
          <div className="row gx-4 mb-4">
            <div className="col-md-3">
              <strong>Période :</strong>
              <br />
              {task.start ?? 'Non définie'} → {task.end ?? 'Non définie'}
            </div>
            <div className="col-md-3">
              <strong>Catégorie :</strong>
              <br />
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
                <strong>Assigné à :</strong><br />
                {assignedTo ? (
                    <div className="d-flex align-items-center gap-2">
                    <img src={assignedTo.avatar} alt="" width="32" height="32" className="rounded-circle" />
                    <span>{assignedTo.name} <small className="text-muted">({assignedTo.role})</small></span>
                    <button className="btn btn-sm btn-link" onClick={handleAssign}>Modifier</button>
                    </div>
                ) : (
                    <button className="btn btn-outline-primary btn-sm" onClick={handleAssign}>
                    cliquez pour Choisir
                    </button>
                )}
            </div>
            <div className="col-md-3">
              <strong>Difficulté :</strong>
              <br />
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
                
          <div className="mb-4">
            <strong>Description :</strong>
            
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(task.description || '<em>Aucune description fournie.</em>'),
              }}
            />
          </div>
          <hr />

          <div className="mb-4">
            <strong>Commentaires</strong>
            <form onSubmit={handleCommentSubmit} className="mt-2">
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(_, editor) => {
                  setEditorData(editor.getData());
                }}
              />
              <button type="submit" className="btn btn-primary mt-2">
                Envoyer
              </button>
            </form>

            <div className="mt-3">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div
                    key={i}
                    className="border rounded p-2 mb-2 bg-light comment-display"
                    dangerouslySetInnerHTML={{ __html: c }}
                  />
                ))
              ) : (
                <div className="text-muted">Aucun commentaire.</div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-success">Sauvegarder</button>
            <button className="btn btn-outline-danger">Supprimer</button>
          </div>
        </div>
      </div>

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

export default TaskDetail;
