// src/pages/TaskDetail.tsx
import type { FC, FormEvent } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockTasks } from "../data/mockTasks";
import "bootstrap/dist/css/bootstrap.min.css";

const priorities = ["Haute", "Moyenne", "Basse"];
const categories = ["À faire", "En cours", "Terminé"];

const TaskDetail: FC = () => {
  const { id } = useParams();
  const task = mockTasks.find((t) => t.id === Number(id));
  const [assignedTo, setAssignedTo] = useState(task?.assignee);
  const [priority, setPriority] = useState(task?.priority);
  const [category, setCategory] = useState(task?.category);
  const [difficulty, setDifficulty] = useState(1);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  if (!task) return <div className="container py-5">Tâche introuvable.</div>;

  const handleAssign = () => {
    // Simule une assignation
    setAssignedTo({id:1, name: "Moi", avatar: "/avatars/avatar_homme.png" });
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">{task.title}</h3>
          <span className={`badge ${priority === "Haute" ? "bg-danger" : priority === "Moyenne" ? "bg-warning text-dark" : "bg-success"}`}>
            {priority} priorité
          </span>
        </div>

        <div className="card-body">
          <div className="row gx-4 mb-4">
            <div className="col-md-3"><strong>Période :</strong><br />{task.start} → {task.end}</div>
            <div className="col-md-3">
              <strong>Catégorie :</strong><br />
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <strong>Assigné à :</strong><br />
              {assignedTo ? (
                <div className="d-flex align-items-center gap-2">
                  <img src={assignedTo.avatar} alt="" width="32" height="32" className="rounded-circle" />
                  <span>{assignedTo.name}</span>
                </div>
              ) : (
                <button className="btn btn-outline-primary btn-sm" onClick={handleAssign}>
                  S’assigner cette tâche
                </button>
              )}
            </div>
            <div className="col-md-3">
              <strong>Difficulté :</strong><br />
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
            <p className="mt-2">{task.title} - Structure de la tâche à compléter par l’utilisateur.</p>
          </div>

          <hr />

          <div className="mb-4">
            <strong>Commentaires</strong>
            <form onSubmit={handleCommentSubmit} className="d-flex gap-2 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Écrire un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">Envoyer</button>
            </form>

            <ul className="list-group list-group-flush mt-3">
              {comments.map((c, i) => (
                <li key={i} className="list-group-item">{c}</li>
              ))}
              {comments.length === 0 && <li className="list-group-item text-muted">Aucun commentaire.</li>}
            </ul>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-outline-success">Sauvegarder</button>
            <button className="btn btn-outline-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
