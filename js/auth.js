/* LIMAX Authentication Logic (localStorage) */

const LIMAX_USERS_KEY = "limax_users";

function getUsers() {
  return JSON.parse(localStorage.getItem(LIMAX_USERS_KEY) || "[]");
}

function setUsers(users) {
  localStorage.setItem(LIMAX_USERS_KEY, JSON.stringify(users));
}

function registerUser(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form).entries());
  const users = getUsers();

  if (users.some((user) => user.email === data.email)) {
    alert("Email already registered.");
    return;
  }

  users.push(data);
  setUsers(users);
  alert("Registration successful. You can now login.");
  window.location.href = "login.html";
}

function loginUser(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const users = getUsers();
  const found = users.find(
    (user) => user.email === data.email && user.password === data.password,
  );

  if (!found) {
    alert("Invalid credentials.");
    return;
  }

  localStorage.setItem("limax_current_user", JSON.stringify(found));
  window.location.href = "dashboard.html";
}

function forgotPassword(event) {
  event.preventDefault();
  const email = new FormData(event.target).get("email");
  const users = getUsers();
  const user = users.find((item) => item.email === email);
  if (user) {
    alert("Password hint: " + user.password);
  } else {
    alert("No account found for this email.");
  }
}
