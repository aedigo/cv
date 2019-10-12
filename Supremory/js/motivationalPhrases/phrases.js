const app = (function (doc, win, $) {
  'use strict';
  return {
    init: function init() {
      $('[data-js="phrases"]', 0).textContent = this.listOfPhrases()[this.randomPhrase()]
    },

    listOfPhrases: function listOfPhrases() {
      return ['O sucesso nasce do querer, da determinação e persistência em se chegar a um objetivo. Mesmo não atingindo o alvo, quem busca e vence obstáculos, no mínimo fará coisas admiráveis.',
      'A persistência é o caminho do êxito.',
      'As pessoas costumam dizer que a motivação não dura sempre. Bem, nem o efeito do banho, por isso recomenda-se diariamente.',
      'Pedras no caminho? Eu guardo todas. Um dia vou construir um castelo.',
      'Tudo o que um sonho precisa para ser realizado é alguém que acredite que ele possa ser realizado.',
      'O que me preocupa não é o grito dos maus. É o silêncio dos bons.',
      ];
    },

    randomPhrase: function randomPhrase() {
      return Math.ceil(Math.random() * (--this.listOfPhrases().length))
    },
  }

})(document, window, window.getElement);

window.phrases = app.listOfPhrases;

app.init();
