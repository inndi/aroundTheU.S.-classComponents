export class Section {
  constructor({ items, renderer }, container) {
    this._renderedItems = items;
    this.renderer = renderer;
    this._container = container;
  }

  _clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this._clear();

    this._renderedItems.forEach((item) => {
      this.renderer(item);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
};