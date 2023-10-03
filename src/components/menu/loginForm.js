/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuLogo from "./menuLogo.js";
import RegistrationForm from "./registrationForm.js";

export default function LoginForm() {
  const loginForm = document.createElement("div");

  /**
   * Logo
   */
  const menuLogo = MenuLogo();
  loginForm.appendChild(menuLogo);

  /**
   * Form
   */
  const form = document.createElement("form");
  form.setAttribute("method", "get");
  form.classList.add("form");

  // Username
  const username = document.createElement("div");
  username.classList.add("form-section");
  const usernameLabel = document.createElement("label");
  usernameLabel.innerHTML = "Username";
  usernameLabel.htmlFor = "username";
  username.appendChild(usernameLabel);
  const usernameInput = document.createElement("input");
  usernameInput.setAttribute("type", "username");
  usernameInput.setAttribute("name", "username");
  usernameInput.setAttribute("id", "username");
  usernameInput.required = true;
  username.appendChild(usernameInput);
  form.appendChild(username);

  // Password
  const password = document.createElement("div");
  password.classList.add("form-section");
  const passwordLabel = document.createElement("label");
  passwordLabel.innerHTML = "Password";
  passwordLabel.htmlFor = "password";
  password.appendChild(passwordLabel);
  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.required = true;
  password.appendChild(passwordInput);
  form.appendChild(password);

  // Submit
  const submit = document.createElement("div");
  submit.classList.add("form-section");
  const loginButton = document.createElement("input");
  loginButton.classList.add("button");
  loginButton.setAttribute("type", "submit");
  loginButton.setAttribute("name", "Login");
  loginButton.setAttribute("value", "Login");
  submit.appendChild(loginButton);
  form.appendChild(submit);

  loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://emojiminesweeper.cyclic.app/user/login", {
        username: usernameInput.value,
        password: passwordInput.value,
      });
      const token = res.data.user.token;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  });

  loginForm.appendChild(form);

  /**
   * Register
   */
  const registerPrompt = document.createElement("div");
  registerPrompt.innerHTML = `New Player?`;
  loginForm.appendChild(registerPrompt);

  const register = document.createElement("a");
  register.innerHTML = `Register`;
  loginForm.appendChild(register);

  let registerClicked = false;

  register.addEventListener("click", () => {
    if (!registerClicked) {
      const registrationForm = RegistrationForm();
      loginForm.appendChild(registrationForm);
      registerClicked = true;
    }
  });

  return loginForm;
}
