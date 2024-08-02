// import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../../img/icons.svg'; //parcel 2
import PreviewView from './PreviewView';
import View from './view';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found. Try something else !';
  _successMessage;

  _generateMarkup() {
    return this._data.map(res => PreviewView.render(res, false)).join('');
  }
}
export default new ResultView();
