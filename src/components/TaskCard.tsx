import type { FC } from "react";
import { Card } from "react-bootstrap";

type Props = {
  title: string;
  start: string;
  end: string;
  assignee: string;
  creator: string;
  priority: string;
};

const TaskCard: FC<Props> = ({ title, start, end, assignee, creator, priority }) => {
  return (
    <Card className="mb-3 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fs-6 fw-bold mb-1">{title}</Card.Title>
        <div className="small text-muted mb-1">{start} – {end}</div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-secondary">{priority}</span>
          <small className="text-muted">Assigné à {assignee}</small>
        </div>
        <div className="text-end mt-2">
          <small className="text-muted fst-italic">Créé par {creator}</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
