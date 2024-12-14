// Login Functionality
const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");

let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

function checkAuth() {
  if (isLoggedIn) {
    window.location.href = "/";
  }
}

checkAuth();

function login(e) {
  e.preventDefault();

  if (email.value && password.value?.length > 4) {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.location.reload();
  }
}

form.addEventListener("submit", login);
