import { useParams } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Détail de la tâche</h1>
      <p>Affichage des détails pour la tâche n° {id}</p>
    </div>
  );
}
