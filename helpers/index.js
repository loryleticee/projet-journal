document.getElementById("myFormLogin").addEventListener("submit", ($e) => {
  $e.preventDefault();

  let username = $("#email").val();
  let password = $("#password").val();

  getToken(username, password).then( () => {
      getArticles()
  });
});

document.getElementById("myForm").addEventListener("submit", ($e) => {
  $e.preventDefault();
  getToken().then( (token) => {
    subscribe(token).then(() => {
      getArticles().then(articles => {
        showArticles(articles)
      })
    })   
  });
});


async function getToken(username = null, password = null) {
  let data = JSON.stringify({
    username: username ?? "lory@lory.fr",
    password: password ?? "lory",
  });

  let token, refresh_token;

  await $.ajax({
    url: "http://127.0.0.1:8000/api/login_check",
    dataType: "json",
    type: "POST",
    data: data,
    contentType: "application/json",
    success: (response) => {
      token = response?.token;
      refresh_token = response?.refresh_token;
      
      sessionStorage.setItem("token",token)
      sessionStorage.setItem("refresh_token",refresh_token)
    },
    error: () => {
      console.log("Oups error");
    },
  });

  return token;
}

async function subscribe(token) {
  let email = $("#email").val();
  let username = $("#email").val();
  let password = $("#password").val();

  let data = JSON.stringify({
    email: email,
    username: username,
    password: password,
    createdAt: new Date(),
    updateAt: new Date(),
  });

  await $.ajax({
    url: "http://127.0.0.1:8000/api/users",
    dataType: "json",
    type: "POST",
    data: data,
    contentType: "application/ld+json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: (response) => {
      console.log(response.id ?? "Not excpected response");
    },
    error: () => {
      console.log("Oups error");
      $("#notification").html(
        "<p>L'inscription n'a pa pu aboutir en raison d'un probleme avec serveur</p>"
      );
    },
  });
}

async function getArticles() {
  return await $.ajax({
    url: "http://localhost:8000/api/articles",
    dataType: "json",
    type: "GET",
    contentType: "application/ld+json",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    success: (articles) => {
      if (! articles instanceof Array) {
        return false; 
      }
      if (articles.length === 0) {
        return false; 
      }
      getPage("/src/vues/articles.php", articles)
    },  
  });
}


function getPage(url, articles) {
  $.ajax({
    url: url,
    dataType: "html",
    success: (page) => {
      $("#main-content").html(page)
      showArticles(articles)
    },  
  });
}


function showArticles(articles) {
  articles.forEach(article => {
    let html = `
      <div>
        <h2>${article.title}</h2>
        <p>${article.content}</p>
      </div>
    `
    $("#content").append(html)
  });
}
