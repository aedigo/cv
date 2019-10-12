((doc, win, $, method) => {
  'use strict';

  const app = (function () {
    let shouldBeStop = false;
    let timeoutId;
    let value;
    return {
      init: function init() {
        this.initEvents();

      },

      initEvents: function initEvents() {
        $('[data-js="start"]', 0).addEventListener('click', this.handleStart);
        $('[data-js="stop"]', 0).addEventListener('click', this.handleStop)
        $('[data-js="time-to-aswer"]', 0).addEventListener('change', this.handleTheAnswer)
        $('[data-js="number-compare"]', 0).addEventListener('change', this.handleChangeInNumberToCompare)
      },

      handleChangeInNumberToCompare: function handleChangeInNumberToCompare() {
        if (this.value > 0) {
          method.setTheTime(() => {
            $('[data-js="check"]', 0).classList.replace('toogle-off-input', 'toogle-on-input');
          }, 0.5)
        }
      },

      handleTheAnswer: function handleTheAnswer() {
        value = $('[data-js="time-to-aswer"]', 0).value
      },

      handleStop: function handleStop() {
        shouldBeStop = true;
        app.stopTheTimer(timeoutId)
      },

      handleStart: function handleStart() {
        const numberToRemember = $('[data-js="number"]', 0)
        numberToRemember.classList.replace('toogle-off-input', 'toogle-on-input');
        app.handleTheAnswer()
        shouldBeStop = false;
        if (method.isTheFirstInputReady() && method.isTheSecondInputReady() && $('[data-js="numbers-lenght"]', 0).value > 0) {
          timeoutId = method.setTheTime(() => {
            numberToRemember.classList.replace('toogle-on-input', 'toogle-off-input');
          }, method.turningTheValuesUsufulForSeTheTime())
          app.stopTheTimer(timeoutId)

          method.setTheTime(() => {
            app.showTheInput();
          }, method.doTheJob(value))
        }
      },

      showTheInput: function showTheInput() {
        const element = $('[data-js="number-compare"]', 0);
        element.classList.replace('toogle-off-input', 'toogle-on-input');

      },

      stopTheTimer: function stopTheTimer(id) {
        if (shouldBeStop)
          clearTimeout(id);
      },
    };
  })();

  app.init();
})(document, window, window.getElement, window.app);
