/*
 *  Emoji Minesweeper
 *  Copyright (c) 2024 Michael Kolesidis
 *  GNU Affero General Public License v3.0
 *
 */

import MenuLogo from "./menuLogo.js";
import countryList from "./countryList.js";

export default function RegistrationForm() {
  const registrationForm = document.createElement("div");

  /**
   * Logo
   */
  const menuLogo = MenuLogo();
  registrationForm.appendChild(menuLogo);

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

  // Country
  const country = document.createElement("div");
  country.classList.add("form-section");
  const countryLabel = document.createElement("label");
  countryLabel.innerHTML = "Country";
  countryLabel.htmlFor = "country";
  country.appendChild(countryLabel);
  const countryInput = document.createElement("select");
  // countryInput.setAttribute("type", "text");
  countryInput.setAttribute("name", "country");
  countryInput.setAttribute("id", "country");
  countryInput.required = true;

  let countries = countryList;
  countryInput.innerHTML += `<option value=""></option>`;

  for (let i = 0; i < countries.length; i++) {
    countryInput.innerHTML += `<option value="${countries[i].text}">${countries[i].text}</option>`;
  }

  country.appendChild(countryInput);
  form.appendChild(country);

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

  // Repeat Password
  const repeatPassword = document.createElement("div");
  repeatPassword.classList.add("form-section");
  const repeatPasswordLabel = document.createElement("label");
  repeatPasswordLabel.innerHTML = "Repeat Password";
  repeatPasswordLabel.htmlFor = "repeatPassword";
  repeatPassword.appendChild(repeatPasswordLabel);
  const repeatPasswordInput = document.createElement("input");
  repeatPasswordInput.setAttribute("type", "password");
  repeatPasswordInput.setAttribute("name", "repeatPassword");
  repeatPasswordInput.setAttribute("id", "repeatPassword");
  repeatPasswordInput.required = true;
  repeatPassword.appendChild(repeatPasswordInput);
  form.appendChild(repeatPassword);

  // Submit
  const submit = document.createElement("div");
  submit.classList.add("form-section");
  const registrationButton = document.createElement("input");
  registrationButton.classList.add("button");
  registrationButton.setAttribute("type", "submit");
  registrationButton.setAttribute("name", "Register");
  registrationButton.setAttribute("value", "Register");
  submit.appendChild(registrationButton);
  form.appendChild(submit);

  registrationButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://emojiminesweeper.cyclic.app/user/signup", {
        username: usernameInput.value,
        country: countryInput.options[countryInput.selectedIndex].value,
        password: passwordInput.value,
      });
      const token = res.data.token;
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("isLoggedIn", "true");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });

  registrationForm.appendChild(form);

  return registrationForm;
}
