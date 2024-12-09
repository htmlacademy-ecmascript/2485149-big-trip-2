import FilterView from './view/filter-view.js';
// import Presenter from './presenter/presenter.js';
import TripPresenter from './presenter/tpipPresenter.js';
import {render} from './render.js';

const siteHeader = document.querySelector('.page-header');
const siteFilterContainer = siteHeader.querySelector('.trip-controls__filters');
const siteMain = document.querySelector('.page-body__page-main');
const siteSortingContainer = siteMain.querySelector('.trip-events');

// const presenter = new Presenter({container: siteSortingContainer});
const tripPresenter = new TripPresenter({container: siteSortingContainer});

render(new FilterView(), siteFilterContainer);

// presenter.init();
tripPresenter.init();

