import { createServer, Model, Server } from 'miragejs';
import type{Registry} from 'miragejs';
import {mockTasks } from '../data/mockTasks';
import { mockUsers} from '../data/mockUsers';

type AppModels = {
  user: typeof Model;
  task: typeof Model;
};
type AppFactories = {};

type AppRegistry = Registry<AppModels, AppFactories>;

type AppServer = Server<AppRegistry>;

export function makeServer({ environment = 'development' } = {}): AppServer {
    return createServer<AppModels, AppFactories>({
    environment,
    models: {
      task: Model,
      user: Model,
    },

    seeds(server) {
      mockUsers.forEach((user) => {
        server.create('user', user);
      });

      mockTasks.forEach((task) => {
        server.create('task', task);
      });
    },     
    routes() {
        this.namespace = 'api';
  
        this.get('/tasks', (schema: any) => schema.tasks.all());
        this.get('/tasks/:id', (schema: any, request) => schema.tasks.find(request.params.id));
        this.post('/tasks', (schema: any, request) => {
          const data = JSON.parse(request.requestBody);
          return schema.tasks.create(data.task);
        });
        this.put('/tasks/:id', (schema: any, request) => {
          const id = request.params.id;
          const attrs = JSON.parse(request.requestBody);
          const task = schema.tasks.find(id);
          return task?.update(attrs);
        });
        this.delete('/tasks/:id', (schema: any, request) => {
          return schema.tasks.find(request.params.id)?.destroy();
        });
  
        this.get('/users', (schema: any) => schema.users.all());
        this.get('/users/:id', (schema: any, request) => schema.users.find(request.params.id));
    },
  });
}
