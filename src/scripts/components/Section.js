export class Section {
  constructor({ renderer }, container) {
    this.renderer = renderer;
    this._container = container;
  }

  _clear() {
    this._container.innerHTML = "";
  }

  addPrependItem(item) {
    this._container.prepend(item);
  }

  addAppendItem(item) {

    this._container.append(item);

  }
};