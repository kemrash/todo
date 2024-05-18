export function createSelectApiBtn({
  dynamicApiTextBtn,
  eventSelectApiBtn,
  readApiStatus,
  writeApiStatus,
}) {
  const $container = document.createElement("div"),
    $selectApiBtn = document.createElement("button");

  $container.classList.add("container", "mb-3");

  $selectApiBtn.classList.add("btn", "btn-secondary");
  dynamicApiTextBtn($selectApiBtn, { readApiStatus });
  $selectApiBtn.addEventListener("click", () => {
    eventSelectApiBtn({ readApiStatus, writeApiStatus });
  });

  $container.append($selectApiBtn);
  return $container;
}

export function dynamicApiTextBtn($apiBtn, { readApiStatus }) {
  const apiStatus = readApiStatus();

  if (apiStatus === "ls") {
    $apiBtn.textContent = "Перейти на серверное хранилище";
  } else {
    $apiBtn.textContent = "Перейти на локальное хранилище";
  }
}

export function eventSelectApiBtn({ readApiStatus, writeApiStatus }) {
  const apiStatus = readApiStatus();

  if (apiStatus === "ls") {
    writeApiStatus("server");
  } else {
    writeApiStatus("ls");
  }

  location.reload();
}
