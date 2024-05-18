// Читает статус использования API
export function readApiStatus() {
  const apiStatus = JSON.parse(localStorage.getItem("todoApiStatus"));
  return apiStatus;
}

// Записывает статус использования API
export function writeApiStatus(apiStatus) {
  localStorage.setItem("todoApiStatus", JSON.stringify(apiStatus));
}

// Получет статус использования API с LocalStorage, если его нет, то записывает в LocalStorage его статус как "ls".
// В соответствии с этим статусом будет динамически загружаться API.
export async function getApi({ readApiStatus, writeApiStatus }) {
  let apiStatus = readApiStatus();

  if (!apiStatus) {
    apiStatus = "ls";
    writeApiStatus(apiStatus);
  }

  let apiImport;

  if (apiStatus === "ls") {
    apiImport = await import("./api-ls.js");
  } else {
    apiImport = await import("./api-server.js");
  }

  return apiImport;
}

// Выбирает owner и title
export function getOwnerAndTitle($contentTodoApp) {
  let owner = $contentTodoApp.dataset.owner,
    title = $contentTodoApp.dataset.title;

  if (!owner) owner = "meTodo";
  if (!title) title = "Мои дела";

  return {
    owner,
    title,
  };
}
