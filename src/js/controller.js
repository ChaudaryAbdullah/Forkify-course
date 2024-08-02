import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import PaginationView from './view/paginationView.js';
import bookmarkView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './view/paginationView.js';

//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
// if (module.hot) {
//   module.hot.accept();
// }
///////////////////////////////////////

const controlSearch = async function () {
  try {
    resultView.renderSpinner();

    //Get Search
    const query = searchView.getQuery();
    if (!query) return;

    //load Serach data or Render data
    await model.loadSearchResults(query);

    // resultView.render(model.state.search.results);
    controlPagination(model.state.search.page);
  } catch (error) {
    searchView.renderError();
  }
};
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    //Render Spinner
    recipeView.renderSpinner();

    //result view to mark as selected
    if (model.state.search.query)
      resultView.update(model.getSearchResultPage());
    bookmarkView.update(model.state.bookmark);

    //1)loading recipe
    await model.loadRecipe(id);

    //2)Render Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
    console.error(error);
  }
};

function controlAddBookmark() {
  //Add and Remove bookmarks
  !model.state.recipe.bookmarked
    ? model.addBookMarks(model.state.recipe)
    : model.removeBookMarks(model.state.recipe.id);

  //Render Recipe view
  recipeView.update(model.state.recipe);

  //Render bookmarks
  bookmarkView.render(model.state.bookmark);
}
const controlPagination = function (page) {
  resultView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};

function controlServings(numServe) {
  //update the recipe servings
  model.updateServings(numServe);
  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //render Spinner
    recipeView.renderSpinner();

    //uplaod Recipe
    await model.UploadRecipe(newRecipe);

    //render Recipe
    recipeView.render(model.state.recipe);

    //success Message Display
    addRecipeView.renderMessage();

    //Render Bookmark
    bookmarkView.render(model.state.bookmark);
    //Change Id in Url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close Form window
    setTimeout(function () {
      addRecipeView.toogleFunction();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error);
  }
};
const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearchRender(controlSearch);
  PaginationView.addHandlerCLick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};
init();
