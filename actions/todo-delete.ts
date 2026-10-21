import { defineAction } from "@agent-native/core/action";
import { deleteTask } from "../app/lib/todo-state";
import { z } from "zod";

export default defineAction({
  description: "Delete a task from the shared To-Do List.",
  mcpTool: true,
  schema: z.object({
    id: z.string().describe("The task ID"),
  }),
  http: { method: "POST" },
  run: async ({ id }) => {
    const deleted = deleteTask(id);
    if (!deleted) throw new Error("Task not found.");
    return { success: true, id };
  },
});
