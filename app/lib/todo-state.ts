export type TodoTask = {
  id: string;
  text: string;
  completed: boolean;
};

let tasks: TodoTask[] = [];

export function getTasks(): TodoTask[] {
  return tasks;
}

export function addTask(text: string): TodoTask {
  const task: TodoTask = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    completed: false,
  };

  tasks = [...tasks, task];
  return task;
}

export function toggleTask(id: string): TodoTask | undefined {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );

  return tasks.find((task) => task.id === id);
}

export function deleteTask(id: string): boolean {
  const previousLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== id);
  return tasks.length < previousLength;
}
