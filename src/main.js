import TripPresenter from './presenter/trip-presenter';

const siteSortingContainer = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(siteSortingContainer);
tripPresenter.init();

