
// types.ts
import { Model } from 'miragejs';

export const models = {
  user: Model.extend<Partial<User>>({}),
  task: Model.extend<Partial<Task>>({}),
};

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  start: string;
  end: string;
  description: string;
  priority: 'Haute' | 'Moyenne' | 'Basse';
  status: 'À faire' | 'En cours' | 'Terminée';
  assignedTo: string;
  createdBy: string;
}

