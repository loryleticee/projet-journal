console.log("fEZdsfgsdfsdf");

(function getArticles() {
  $.ajax({
    url: "http://localhost:8000/api/articles",
    dataType: "json",
    type: "GET",
    contentType: "application/ld+json",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    success: (articles) => {
      if (!articles instanceof Array) {
        return false;
      }
      if (articles.length === 0) {
        return false;
      }
      showArticles(articles);
    },
    error: (error) => {
      let message = error?.responseJSON?.message;
      let code = error?.responseJSON?.code;
      if (message === "Expired JWT Token" && code === 401) {
        refreshToken();
      }
    },
  });
})();

console.log("'fEZdsfgsdfsdf");

function showArticles(articles) {
  articles.forEach((article) => {
    let html = `
      <div>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
      </div>
    `;
    $("#myarticles").append(html);
  });
}

function refreshToken() {
  let data = JSON.stringify({
    refresh_token: sessionStorage.getItem("refresh_token"),
  });

  let token, refresh_token;

  $.ajax({
    url: "http://127.0.0.1:8000/api/token/refresh",
    dataType: "json",
    type: "POST",
    data: data,
    contentType: "application/json",
    success: (response) => {
      token = response?.token;
      refresh_token = response?.refresh_token;
      
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refresh_token", refresh_token);
    },
    error: () => {
      console.log("Oups error");
    },
  });
}
