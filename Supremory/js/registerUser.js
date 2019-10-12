(function (doc, win, $) {
  'use strict';

  const app = (function () {
    let users = [];
    return {
      init: function init() {
        this.initEvents();
      },

      initEvents: function initEvents() {
        new $('[data-js="btn-submit-register"]').get(0).addEventListener('click', this.handleButtonSubmit)
        new $('[data-js="username-register"]').get(0).addEventListener('change', this.handleUserExistence)
      },

      handleButtonSubmit: function handleUserExistence(e) {
        e.preventDefault();
        const key = app.randomKey();
        app.getElement('[data-js="key"]', 0).value = key;
        users.push({
          name: new $('[data-js="username-register"]').get(0).value,
          password: new $('[data-js="password-register"]').get(0).value,
          key: key,
          login: false,
        })
        new $('[data-js="sucess"]').get(0).textContent = 'O usuário foi cadastrado com sucesso! Agora poderá logar.'
        app.saveUsers(users)
        app.emptyngInputs();
      },

      emptyngInputs: function emptyngInputs() {
        new $('[data-js="username-register"]').get(0).value = '';
        new $('[data-js="password-register"]').get(0).value = '';
      },

      getElement: function getElement(element, index) {
        return new $(element).get(index);
      },

      randomKey: function randomKey() {
        let numbers = [];
        for(let i = 0; i <= 20; i++) {
          numbers.push(Math.ceil(Math.random() * 10) )
        }
        return numbers.join('');
      },

      saveUsers: function saveUsers(user) {
        localStorage.setItem('user', JSON.stringify(user))
      },

      getUsers: function getUsers() {
        const save = localStorage.getItem('user');
        if (save)
          return users = JSON.parse(save);
      },

      handleUserExistence: function handleUserExistence() {
        const userAlreadyExist = app.getUsers().some(item => {
          if (item.name === new $('[data-js="username-register"]').get(0).value) {
            return true;
          }
        })
        if (userAlreadyExist)
          app.showUserAlreadyExistMessage()
        else {
          try {
            const $p = doc.querySelector('[data-js="user-error-message"]');
            const $parentElement = $p.parentNode;
            if ($parentElement.firstChild !== $p)
              $parentElement.removeChild($p)
          }

          catch (e) {}
        }
      },

      showUserAlreadyExistMessage: function showUserAlreadyExistMessage() {
        const $p = doc.querySelector('[data-js="user-error-message"]');
        $p.textContent = `Name already exist.`;
        $p.setAttribute('class', 'error-message');
      },
    }
  })();

  app.init()

})(document, window, window.DOM);
