import type { Route } from "./+types/api.todo";
import {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../lib/todo-state";

export async function loader() {
  return Response.json({ tasks: getTasks() });
}

export async function action({ request }: Route.ActionArgs) {
  const body = await request.json();
  const operation = body.operation;

  if (operation === "add") {
    const text = String(body.text ?? "").trim();
    if (!text) {
      return Response.json({ error: "Task text is required." }, { status: 400 });
    }
    return Response.json({ task: addTask(text) });
  }

  if (operation === "toggle") {
    const task = toggleTask(String(body.id ?? ""));
    if (!task) {
      return Response.json({ error: "Task not found." }, { status: 404 });
    }
    return Response.json({ task });
  }

  if (operation === "delete") {
    const id = String(body.id ?? "");
    if (!deleteTask(id)) {
      return Response.json({ error: "Task not found." }, { status: 404 });
    }
    return Response.json({ success: true });
  }

  return Response.json({ error: "Unknown operation." }, { status: 400 });
}
