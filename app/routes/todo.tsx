import { useState } from "react";
import {
  useActionQuery,
  useActionMutation,
} from "@agent-native/core/client/hooks";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoPage() {
  const [input, setInput] = useState("");

  const { data, isLoading } = useActionQuery("todo-list", {});
  const addTaskMutation = useActionMutation("todo-add");
  const toggleTaskMutation = useActionMutation("todo-toggle");
  const deleteTaskMutation = useActionMutation("todo-delete");

  const tasks: Task[] = data?.tasks ?? [];
  const completedCount = tasks.filter((task) => task.completed).length;

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    addTaskMutation.mutate({ text });
    setInput("");
  }

  async function clearAllTasks() {
    for (const task of tasks) {
      await deleteTaskMutation.mutateAsync({ id: task.id });
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <section className="mx-auto max-w-2xl">
        <a href="/home" className="text-sm text-slate-400 hover:text-white">
          ← Agent Native Home
        </a>

        <div className="mt-8">
          <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
            Agent Native Demo
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            My To-Do List
          </h1>
          <p className="mt-3 text-slate-400">
            Keep track of your tasks in one simple place.
          </p>
        </div>

        <form onSubmit={addTask} className="mt-8 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What needs to be done?"
            aria-label="New task"
            className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-500"
          />
          <button
            type="submit"
            disabled={addTaskMutation.isPending}
            className="rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 disabled:opacity-50"
          >
            Add task
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-slate-400">
          <span>{tasks.length} tasks</span>
          <span>{completedCount} completed</span>
        </div>

        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800"
          role="progressbar"
          aria-label="Task completion"
          aria-valuemin={0}
          aria-valuemax={tasks.length}
          aria-valuenow={completedCount}
          aria-valuetext={`${completedCount} of ${tasks.length} tasks completed`}
        >
          <div
            className="h-full rounded-full bg-violet-500 transition-[width]"
            style={{
              width: `${tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100}%`,
            }}
          />
        </div>

        <div className="mt-4 space-y-3">
          {isLoading ? (
            <p className="text-slate-400">Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 px-5 py-12 text-center">
              <p className="text-lg font-medium">Your list is empty</p>
              <p className="mt-2 text-sm text-slate-400">
                Add your first task above to get started.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTaskMutation.mutate({ id: task.id })
                  }
                  aria-label={`Mark ${task.text} as completed`}
                  className="h-5 w-5 accent-violet-500"
                />

                <span
                  className={`min-w-0 flex-1 break-words ${
                    task.completed
                      ? "text-slate-500 line-through"
                      : "text-slate-100"
                  }`}
                >
                  {task.text}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    deleteTaskMutation.mutate({ id: task.id })
                  }
                  className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-950 hover:text-red-300"
                  aria-label={`Delete ${task.text}`}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {tasks.length > 0 && (
          <button
            type="button"
            onClick={clearAllTasks}
            className="mt-5 text-sm text-slate-400 hover:text-white"
          >
            Clear all tasks
          </button>
        )}
      </section>
    </main>
  );
}