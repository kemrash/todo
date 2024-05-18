const TODOS_URL = "http://localhost:3000/api/todos";

// Чтение c сервера списка дел
export async function getTodoList(owner) {
  const response = await fetch(`${TODOS_URL}?owner=${owner}`);

  return await response.json();
}

// Запись на сервер нового дела
export async function createTodoItem({ owner, name }) {
  const response = await fetch(TODOS_URL, {
    method: "POST",
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: { "Content-Type": "application/json" },
  });

  return await response.json();
}

// Изменение статуса дела и запись на сервер
export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`${TODOS_URL}/${todoItem.id}`, {
    method: "PATCH",
    body: JSON.stringify({ done: todoItem.done }),
    headers: { "Content-Type": "application/json" },
  });
}

// Удаление дела и запись на сервер
export function deleteTodoItem({ element, todoItem }) {
  if (!confirm("Вы уверены?")) {
    return;
  }
  element.remove({ element, todoItem });
  fetch(`${TODOS_URL}/${todoItem.id}`, {
    method: "DELETE",
  });
}
