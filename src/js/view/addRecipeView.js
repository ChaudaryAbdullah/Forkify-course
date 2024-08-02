// import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../../img/icons.svg'; //parcel 2
import { Fraction } from 'fractional';
import View from './view.js';
import { updateServings } from '../model.js';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _windowEl = document.querySelector('.add-recipe-window');
  _overlayEl = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _successMessage = 'Recipe was successfully upoaded!';
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
    //this._addHandlerUpload();
  }

  toogleFunction() {
    this._overlayEl.classList.toggle('hidden');
    this._windowEl.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleFunction.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toogleFunction.bind(this));
    this._overlayEl.addEventListener('click', this.toogleFunction.bind(this));
  }
  _generateMarkup() {
    return;
  }
}

export default new addRecipeView();
