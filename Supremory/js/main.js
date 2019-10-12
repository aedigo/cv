(function (doc, win, $) {
  'use strict';

  const app = (function () {
    return {
      init: function init() {
        this.initEvents();
      },

      initEvents: function initEvents() {
        this.getElement('[data-js="logout"]', 0).addEventListener('click', function(e) {
          e.preventDefault();
          app.makeLoginFalse();
          setTimeout(() => {
            win.location.reload(true);
          }, 300)
        })
        this.getElement('[data-js="btn-submit"]', 0).addEventListener('click', this.handleButtonSubmit)
        win.addEventListener('load', function (e) {
          const users = JSON.parse(localStorage.getItem('user'))
          const logged = users.some(item => {
            if (item.login)
              return true;
            else return false;
          })
          if (logged) {
            const $login = new $('.login').get(0)
            $login.classList.add('turned-off');
            new $('body').get(0).classList.add('body-after');
          }
        })
        return [this.getElement('[data-js="username"]', 0), this.getElement('[data-js="password"]', 0)]
      },

      getElement: function getElement(element, index) {
        return new $(element).get(index)
      },

      handleButtonSubmit: function handleButtonSubmit(e) {
        e.preventDefault();
        app.letUserIn(app.handleLogin(app.getUsers()))
      },

      letUserIn: function letUserIn(permition) {
        if (permition) {
          this.userLogged();
        }
      },

      makeLoginFalse: function makeLoginFalse() {
        let users = JSON.parse(localStorage.getItem('user'))
        users.forEach(item => {
          if (item.login)
            item.login = false;
        })
        app.saveUsers(users);
        app.init();
      },

      userLogged: function userLogged() {
        const user = this.getUsers();
        const users = JSON.parse(localStorage.getItem('user'));
        users.forEach(item => {
          if (item.name === user[0].name) {
            item.login = true;
          }
        })
        this.saveUsers(users);
        const $login = new $('.login').get(0)
        $login.classList.add('turned-off');
        new $('body').get(0).classList.add('body-after');
      },

      saveUsers: function saveUsers(user) {
        localStorage.setItem('user', JSON.stringify(user))
      },

      handleLogin: function handleLogin(userExist) {
        if (userExist) return true;

        app.errorMessage();
      },

      errorMessage: function errorMessage() {
        const $p = doc.querySelector('[data-js="errorMessage"]');
        $p.textContent = `Password or Login are incorect`;
        $p.setAttribute('class', 'error-message');
      },

      getUsers: function getUsers() {
        const userExist = JSON.parse(localStorage.getItem('user')).filter(item => {
          if (item.name === this.initEvents()[0].value && item.password === this.initEvents()[1].value) {
            return item.name
          } else {
            return false;
          }
        })

        return userExist
      },

      removeUser: function removeUser(user) {
        localStorage.removeItem(user)
      },
    }
  })();

  win.getElement = app.getElement;
  app.init()
})(document, window, window.DOM);
