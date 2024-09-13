import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FormEditView from './view/form-edit-view.js';
import Presenter from './presenter/presenter.js';
import {render} from './render.js';

const siteHeader = document.querySelector('.page-header');
const siteFilterContainer = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteSortingContainer = siteMain.querySelector('.trip-events');
const presenter = new Presenter({container: siteSortingContainer});

render(new FilterView(), siteFilterContainer);
render(new SortView(), siteSortingContainer);

presenter.init();

render(new FormEditView(), siteSortingContainer);
