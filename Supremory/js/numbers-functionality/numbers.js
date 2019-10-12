(function (doc, win, $) {
  'use strict';

  const app = (function () {
    return {
      init: function init() {
        this.initEvent();
        console.log(this.doTheJob('0.15'))
      },
      initEvent: function initEvent() {
        $('[data-js="numbers-lenght"]', 0).addEventListener('change', this.handleNumbersLenght);
        $('[data-js="numbers-lenght"]', 0).addEventListener('input', this.isTheNumberBiggerThan25);
        $('[data-js="check"]', 0).addEventListener('click', this.handleCheckButton)
        $('[data-js="time-to-memorize"]', 0).addEventListener('change', this.handleChangeToTimeToMemorize)
        $('[data-js="time-to-aswer"]', 0).addEventListener('change', this.handleTimeToAswer)
      },

      handleNumbersLenght: function handleNumbersLenght() {
        app.generateRandomNumbers(this.value);
      },

      hideTheInput: function hideTheInput() {
        $('[data-js="number-compare"]', 0).classList.replace('toogle-on-input', 'toogle-off-input');
      },

      handleTimeToAswer: function handleTimeToAswer() {
        app.ifTheInputIsReady($('[data-js="time-to-aswer"]', 0));
      },

      ifTheInputIsReady: function ifTheInputIsReady(input) {
        if (!app.isTheFirstInputReady()) {
          input.value = ''
          return;
        };
      },

      handleChangeToTimeToMemorize: function handleChangeToTimeToMemorize() {
        app.ifTheInputIsReady($('[data-js="time-to-aswer"]', 0));
        app.turningTheValuesUsufulForSeTheTime();
      },

      turningTheValuesUsufulForSeTheTime: function turningTheValuesUsufulForSeTheTime(element) {
        let value = $('[data-js="time-to-memorize"]', 0).value;
        const returnedValue = this.doTheJob(value);
        return returnedValue;

      },

      doTheJob: function doTheJob(value) {
        let valueToReturn = +value;

        if (valueToReturn >= 0.01 && valueToReturn <= 0.09) {
          valueToReturn = String(valueToReturn);
          return Number(valueToReturn.match(/\d$/g).join(''))
        }

        if (valueToReturn >= 0.10 && valueToReturn < 1) {
          valueToReturn = String(valueToReturn);
          valueToReturn = Number(valueToReturn.match(/\d+$/g).join(''))
          if (!/\d{2}/.test(valueToReturn)) {
            valueToReturn = String(valueToReturn) + 0
            valueToReturn = Number(valueToReturn)
            return valueToReturn;
          }
          return valueToReturn;
        }
        return valueToReturn * 60;
      },

      isTheFirstInputReady: function isTheFirstInputReady() {
        const value = $('[data-js="time-to-memorize"]', 0).value;
        if (value === '' || value <= 0)
          return false;
        return true;
      },

      ifTheSecondInputIsReady: function ifTheSecondInputReady() {
        if (!this.isTheSecondInputReady())
          $('[data-js="numbers-lenght"]', 0).value = '';
        return;
      },

      isTheSecondInputReady: function isTheSecondInputReady() {
        const value = $('[data-js="time-to-aswer"]', 0).value;
        if (value === '' || value <= 0)
          return false;
        return true;
      },

      handleCheckButton: function handleCheckButton(e) {
        e.preventDefault();
        app.theNumberIsAMatch()
        app.hideTheInput();
        $('[data-js="check"]', 0).classList.replace('toogle-on-input', 'toogle-off-input');

      },

      generateRandomNumbers: function (numberToGenerate) {
        if (numberToGenerate > 25)
          numberToGenerate = 25;
        else if (numberToGenerate <= 0)
          return;
        const arr = [];
        for (let i = 0; i <= numberToGenerate; i++) {
          const numb = Math.ceil(Math.random() * 9);
          arr.push(numb)
        }
        arr.shift()
        $('[data-js="number"]', 0).textContent = arr.join('');
      },

      theNumberIsAMatch: function theNumberIsAMatch() {
        const numb = $('[data-js="number-compare"]', 0).value;
        if ($('[data-js="number"]', 0).textContent === numb) {
          this.generateTheResultText();
        }
        else this.generateTheResultText(true)
      },

      generateTheResultText: function generateTheResultText(ItsNot) {
        this.setTheTime(() => {
          if (ItsNot) {
            this.resetEverything(false);
            return;
          }
          this.resetEverything(true);
        }, 0.60)
      },

      resetEverything: function resetEverything(value) {
        var result = value ? 'Você Acertou!' : 'Você Errou!';
        this.setTheTime(() => $('[data-js="result"]', 0).textContent = '', 1.5)
        $('[data-js="result"]', 0).textContent = result;
        $('[data-js="number"]', 0).textContent = '';
        $('[data-js="numbers-lenght"]', 0).value = '';
        $('[data-js="number-compare"]', 0).value = ''
      },

      isTheNumberBiggerThan25: function isTheNumberBiggerThan25() {
        if (!app.isTheSecondInputReady()) {
          return;
        };
        if (this.value > 25)
          this.value = 25;
        return true;
      },

      setTheTime: function setTheTime(action, multiplied, value) {
        let timer = value ? value : 1000;
        if (multiplied)
          timer *= multiplied;
        const timeoutId = setTimeout(action, timer);
        return timeoutId;
      },
    };
  })();

  window.app = app;
  app.init();
})(document, window, window.getElement);
