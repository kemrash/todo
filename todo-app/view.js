// создаём и возвращаем заголовок приложения
function createAppTitle(title) {
  const appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}

// создаём и возвращаем форму для создания дела
function createTodoItemForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  const buttonWrapper = document.createElement("div");
  const button = document.createElement("button");

  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

// создаём и возвращаем список элементов
function createTodoList() {
  const list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete, todoItemList }) {
  const doneClass = "list-group-item-success";

  const item = document.createElement("li");
  // кнопки помещаем в элемент, который красиво покажет их в одной группе
  const buttonGroup = document.createElement("div");
  const doneButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  // устанавливаем стили для элемента списка, а также для размещения кнопок
  // в его правой части c помощью flex
  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );

  // проверяем на статус готово, если да? красим в зелёный
  if (todoItem.done === true) {
    item.classList.add(doneClass);
  }

  // добавляем текст для item
  item.textContent = todoItem.name;

  // добавляем class-ы и текст кнопок
  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";

  // добавляем обработчики на кнопки
  // добавляем слушателя для события click на кнопку doneButton
  doneButton.addEventListener("click", () => {
    // включаем или отключаем класс для item
    onDone({ todoItem, element: item, todoItemList });
    item.classList.toggle(doneClass, todoItem.done);
  });

  // добавляем слушателя для события click на кнопку deleteButton
  deleteButton.addEventListener("click", () => {
    onDelete({ todoItem, element: item, todoItemList });
  });

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}

// создаём функцию createTodoApp
async function createTodoApp(
  container,
  {
    title,
    owner,
    todoItemList = [],
    onCreateFormSubmit,
    onDoneClick,
    onDeleteClick,
  }
) {
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const hadlers = {
    onDone: onDoneClick,
    onDelete: onDeleteClick,
    todoItemList,
  };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemList.forEach((todoItem) => {
    const todoItemElement = createTodoItemElement(todoItem, hadlers);
    todoList.append(todoItemElement);
  });

  // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener("submit", async (e) => {
    // эта строчка необходима, чтобы предотвратить стандартное действия браузера
    // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
    e.preventDefault();

    // игнорируем создание элемента, если пользователь ничего не ввёл в поле
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
      todoItemList,
    });

    const todoItemElement = createTodoItemElement(todoItem, hadlers);

    // создаём и добовляем в список новое дело с названием из поля для ввода
    todoList.append(todoItemElement);

    // обнуляем значение в поле, чтобы не пришлось стирать его вручную
    todoItemForm.input.value = "";
  });
}

export { createTodoApp };
