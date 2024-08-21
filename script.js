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

// Пример с использованием async/await и .then()
document.getElementById('combineBtn').addEventListener('click', () => {
  const asyncResult = document.getElementById('combineResult');
  asyncResult.textContent = 'Загрузка...';

  (async function() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/3');
      if (!response.ok) {
          throw new Error('Ошибка сети');
      }
      return response.json();
  })()
  .then(data => {
      asyncResult.textContent = JSON.stringify(data, null, 2);
  })
  .catch(error => {
      asyncResult.textContent = `Ошибка: ${error.message}`;
  });
});

// Пример с использованием промисов
// Пример с использованием нескольких запросов внутри цепочки .then()
document.getElementById('promiseBtn').addEventListener('click', () => {
  const promiseResult = document.getElementById('promiseResult');
  promiseResult.textContent = 'Загрузка...';

  // Первый запрос
  fetch('https://jsonplaceholder.typicode.com/posts/2')
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка сети при первом запросе');
          }
          return response.json();
      })
      .then(data => {
          // Логируем данные первого запроса
          promiseResult.textContent = `Первый запрос: ${JSON.stringify(data, null, 2)}`;

          // Второй запрос на основе данных из первого запроса
          return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка сети при втором запросе');
          }
          return response.json();
      })
      .then(userData => {
          // Логируем данные второго запроса
          promiseResult.textContent += `\n\nВторой запрос: ${JSON.stringify(userData, null, 2)}`;

          // Третий запрос на основе данных из второго запроса
          return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userData.id}`);
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка сети при третьем запросе');
          }
          return response.json();
      })
      .then(userPosts => {
          // Логируем данные третьего запроса
          promiseResult.textContent += `\n\nТретий запрос: ${JSON.stringify(userPosts, null, 2)}`;
      })
      .catch(error => {
          promiseResult.textContent = `Ошибка: ${error.message}`;
      });
});
