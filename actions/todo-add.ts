import { defineAction } from "@agent-native/core/action";
import { addTask } from "../app/lib/todo-state";
import { z } from "zod";

export default defineAction({
  description: "Add a new task to the shared To-Do List.",
  mcpTool: true,
  schema: z.object({
    text: z.string().min(1).describe("The task text"),
  }),
  http: { method: "POST" },
  run: async ({ text }) => ({ task: addTask(text.trim()) }),
});
