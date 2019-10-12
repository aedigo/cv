function DOM(elements) {
  this.element = document.querySelectorAll(elements);
}

DOM.prototype.get = function (index) {
  return this.element[index];
}

window.DOM = DOM;
