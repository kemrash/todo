// Чтение из localStorage списка дел
export function getTodoList(owner) {
  const todoDate = JSON.parse(localStorage.getItem(owner));
  return todoDate ? todoDate : [];
}

// Запись в localStorage нового дела
export function createTodoItem({ owner, name, todoItemList }) {
  const maxId =
    todoItemList.length > 0 ? todoItemList[todoItemList.length - 1].id : 0;

  const todoItemObj = {
    done: false,
    id: maxId + 1,
    name,
    owner,
  };

  todoItemList.push(todoItemObj);

  localStorage.setItem(owner, JSON.stringify(todoItemList));

  return todoItemObj;
}

// Изменение статуса дела и запись в localStorage
export function switchTodoItemDone({ todoItem, todoItemList }) {
  todoItem.done = !todoItem.done;

  const indexItem = todoItemList.indexOf(todoItem);

  if (indexItem !== -1) {
    todoItemList[indexItem].done = todoItem.done;
    localStorage.setItem(todoItem.owner, JSON.stringify(todoItemList));
  }
}

// Удаление дела и запись в localStorage
export function deleteTodoItem({ element, todoItem, todoItemList }) {
  if (!confirm("Вы уверены?")) {
    return;
  }

  const indexItem = todoItemList.indexOf(todoItem);

  if (indexItem !== -1) {
    todoItemList.splice(indexItem, 1);
    element.remove({ element, todoItem });
    localStorage.setItem(todoItem.owner, JSON.stringify(todoItemList));
  }
}
