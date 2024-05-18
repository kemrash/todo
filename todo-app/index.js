import { createTodoApp } from "./view.js";
import {
  getOwnerAndTitle,
  readApiStatus,
  writeApiStatus,
  getApi,
} from "./helper.js";
import {
  createSelectApiBtn,
  dynamicApiTextBtn,
  eventSelectApiBtn,
} from "./select-api-btn.js";

const $contentTodoApp = document.getElementById("todo-app"),
  apiImport = await getApi({ readApiStatus, writeApiStatus }),
  { getTodoList, createTodoItem, switchTodoItemDone, deleteTodoItem } =
    apiImport,
  { owner, title } = getOwnerAndTitle($contentTodoApp),
  todoItemList = await getTodoList(owner);

$contentTodoApp.before(
  createSelectApiBtn({
    dynamicApiTextBtn,
    eventSelectApiBtn,
    readApiStatus,
    writeApiStatus,
  })
);

createTodoApp($contentTodoApp, {
  title,
  owner,
  todoItemList,
  onCreateFormSubmit: createTodoItem,
  onDoneClick: switchTodoItemDone,
  onDeleteClick: deleteTodoItem,
});
