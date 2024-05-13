document.getElementById("button").addEventListener("click", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  console.log(username);
  document.getElementById("username").value = "";

  fetch("https://api.github.com/users/"+username)
.then((result) => result.json())
.then((data) => {

  console.log(data)
  const profile = document.getElementById("profile").innerHTML = `
  <br><br>
  <a href="https://github.com/${username}"><img src=${data.avatar_url}></a>
  `

  })
});

