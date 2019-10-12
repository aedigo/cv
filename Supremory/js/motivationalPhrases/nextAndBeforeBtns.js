(function (doc, win, $, phrases) {
  'use strict';

  const app = (function () {
    return {
      init: function init() {
        this.initEvents();
      },

      initEvents: function initEvents() {
        $('[data-js="before"]', 0).addEventListener('click', this.handleBeforeEvent);
        $('[data-js="after"]', 0).addEventListener('click', this.handleafterEvent);
      },

      handleafterEvent: function handleafterEvent(e) {
        e.preventDefault();
        let length = (--phrases().length);
        let number = phrases().findIndex(app.ifItsEqualReturnItsIndex) + 1
        if (number <= length)
          return $('[data-js="phrases"]', 0).textContent = phrases()[number]
        return;
      },

      handleBeforeEvent: function handleBeforeEvent(e) {
        e.preventDefault();

        let number = phrases().findIndex(app.ifItsEqualReturnItsIndex)
        if (!number) return;
        $('[data-js="phrases"]', 0).textContent = phrases()[--number]
      },

      ifItsEqualReturnItsIndex: function ifItsEqualReturnItsIndex(element) {
        return element === $('[data-js="phrases"]', 0).textContent;
      },
    }
  })();

  app.init()
})(document, window, window.getElement, window.phrases);
