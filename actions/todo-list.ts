import { defineAction } from "@agent-native/core/action";
import { getTasks } from "../app/lib/todo-state";
import { z } from "zod";

export default defineAction({
  description: "Get all tasks in the shared To-Do List.",
  mcpTool: true,
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async () => ({ tasks: getTasks() }),
});
