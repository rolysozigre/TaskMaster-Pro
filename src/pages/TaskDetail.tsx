import type { FC, FormEvent } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockTasks } from "../data/mockTasks";
import { users } from "../data/mockUsers"; // Import des utilisateurs
import "bootstrap/dist/css/bootstrap.min.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Modal, Button } from "react-bootstrap";

const priorities = ["Haute", "Moyenne", "Basse"];
const categories = ["À faire", "En cours", "Terminé"];

const TaskDetail: FC = () => {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === Number(id));
  const [assignedTo, setAssignedTo] = useState(task?.assignee);
  const [priority, setPriority] = useState(task?.priority);
  const [category, setCategory] = useState(task?.status);
  const [difficulty, setDifficulty] = useState(1);
  const [comments, setComments] = useState<string[]>([]);
  const [editorData, setEditorData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!task) return <div className="container py-5">Tâche introuvable.</div>;

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

  return (
    <div className="container py-4">
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
                className={`badge ${priority === "Haute"
                ? "bg-danger"
                : priority === "Moyenne"
                ? "bg-warning text-dark"
                : "bg-success"
                }`}
            >
                {priority} priorité
            </span>
        </div>


        <div className="card-body">
          <div className="row gx-4 mb-4">
            <div className="col-md-3"><strong>Période :</strong><br />{task.start} → {task.end}</div>
            <div className="col-md-3">
              <strong>Catégorie :</strong><br />
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
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
              <strong>Difficulté :</strong><br />
              <input type="range" min="1" max="5" value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} className="form-range" />
              <span>{difficulty} / 5</span>
            </div>
          </div>

          <div className="mb-4">
            <strong>Description :</strong>
            <p className="mt-2">{task.title} - Structure de la tâche à compléter par l’utilisateur.</p>
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
              <button type="submit" className="btn btn-primary mt-2">Envoyer</button>
            </form>

            <div className="mt-3">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} className="border rounded p-2 mb-2 bg-light comment-display" dangerouslySetInnerHTML={{ __html: c }} />
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
                    .filter(user =>
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
                        <img src={user.avatar} alt={user.name} width="32" height="32" className="rounded-circle" />
                        <span>{user.name} <small className="text-muted">({user.role})</small></span>
                    </button>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
};

export default TaskDetail;
