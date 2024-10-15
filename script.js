"use strict";

(function() {
  const LOGIN_SUCCESS_MSG = "Login successful!";
  const LOGIN_FAILED_MSG = "Invalid username or password";
  const LOGIN_DISAPPEAR_DELAY = 1000;
  window.addEventListener("load", init);

  /**
   * the code that runs on window load
   */
  function init() {
    promptLogin();
    document.querySelector(".wrapper form").addEventListener("submit", login);
    document.querySelector(".login-button-popup").addEventListener("click", promptLogin);
  }

  // functions

  /**
   * Gives login-screen the appear class, leading it to become visible
   */
  function promptLogin() {
    let loginBlock = document.querySelector(".wrapper");
    loginBlock.classList.add("appear");
  }

  /**
   * logic that handles what to do when form is filled out and submitted to log in
   * @param {Event} evt event
   */
  function login(evt) {
    // webpage keeps refreshing instead of closing the login when asked to without this line
    evt.preventDefault();

    // TODO: actually check if username/password in database?
    if (document.querySelector(".formbox-login input#email").value.length > 0) {
      showLoginMessage(true);
      setTimeout(() => {
        hideLogin();
      }, LOGIN_DISAPPEAR_DELAY);
    } else {
      showLoginMessage(false);
    }
    for (let input of document.querySelectorAll(".formbox-login input")) {
      input.value = "";
    }
  }

  /**
   * Hides the login-appear class by removing the appear class, and also removes any previous
   * msgs to reset how it looks incase of next time
   */
  function hideLogin() {
    removeClass(".wrapper", "appear");
    for (let message of document.querySelectorAll(".login-msg")) {
      message.parentNode.removeChild(message);
    }
  }

  /**
   * Helper method to remove the class of an element in question
   * @param {Element} querySelector query selector to find element
   * @param {String} className name of class to remove from element
   */
  function removeClass(querySelector, className) {
    let element = document.querySelector(querySelector);
    element.classList.remove(className);
  }

  /**
   * Shows a login message, being different depending on if the login was successful for not
   * @param {Boolean} success whether or not the login was a success
   */
  function showLoginMessage(success) {
    let message = document.createElement("p");
    message.classList.add("login-msg");
    if (success) {
      message.textContent = LOGIN_SUCCESS_MSG;
    } else {
      message.textContent = LOGIN_FAILED_MSG;
    }
    document.querySelector(".formbox-login").appendChild(message);
  }
})();
