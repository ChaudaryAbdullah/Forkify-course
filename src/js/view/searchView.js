import View from './view';

class SearchView extends View {
  _parentEl = document.querySelector('.search');
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  getQuery() {
    const data = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return data;
  }
  addHandlerSearchRender(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
