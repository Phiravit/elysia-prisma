import { Elysia } from "elysia";
import todoRoutes from "./routes/todos";

const todoApp = new Elysia();

todoApp.group("/api", (app) => app.use(todoRoutes)).listen(3000);

console.log(
  `🦊 Elysia is running at ${todoApp.server?.hostname}:${todoApp.server?.port}`
);
