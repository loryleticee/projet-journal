document.getElementById("myForm").addEventListener("submit", ($e) => {
  $e.preventDefault();
  getToken()
});

function getToken() {
  let data = JSON.stringify({
    username: "lory@lory.fr",
    password: "lory",
  });
  $.ajax({
    url: "http://127.0.0.1:8000/api/login_check",
    dataType: "json",
    type: "POST",
    data: data,
    contentType: "application/json",
    success: (response) => {
      subscribe(response?.token);
    },
    error: () => {
      console.log("Oups error");
    },
  });
}

function subscribe(token) {
  let email = $("#email").val();
  let username = $("#email").val();
  let password = $("#password").val();

  let data = JSON.stringify({
    email: email,
    username: username,
    password: password,
    createdAt : (new Date()),
    updateAt : (new Date())
  });

  $.ajax({
    url: "http://127.0.0.1:8000/api/users",
    dataType: "json",
    type: "POST",
    data: data,
    contentType: "application/ld+json",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: (response) => {
      console.log(response.id ?? "Not excpected response")
    },
    error: () => {
      console.log("Oups error");
    },
  });
}
