import { defineAction } from "@agent-native/core/action";
import { toggleTask } from "../app/lib/todo-state";
import { z } from "zod";

export default defineAction({
  description: "Toggle a task between completed and incomplete.",
  mcpTool: true,
  schema: z.object({
    id: z.string().describe("The task ID"),
  }),
  http: { method: "POST" },
  run: async ({ id }) => {
    const task = toggleTask(id);
    if (!task) throw new Error("Task not found.");
    return { task };
  },
});
