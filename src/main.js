import TripPresenter from './presenter/TripPresenter';

const siteSortingContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteSortingContainer);
tripPresenter.init();

