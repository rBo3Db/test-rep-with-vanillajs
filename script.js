// Пример с использованием async/await
document.getElementById("asyncBtn").addEventListener("click", async () => {
  const asyncResult = document.getElementById("asyncResult");
  asyncResult.textContent = "Загрузка...";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const data = await response.json();
    asyncResult.textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    asyncResult.textContent = `Ошибка: ${error.message}`;
  }
});

// Пример с использованием промисов
document.getElementById("promiseBtn").addEventListener("click", () => {
  const promiseResult = document.getElementById("promiseResult");
  promiseResult.textContent = "Загрузка...";

  fetch("https://jsonplaceholder.typicode.com/posts/2")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка сети");
      }
      return response.json();
    })
    .then((data) => {
      promiseResult.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      promiseResult.textContent = `Ошибка: ${error.message}`;
    });
});
