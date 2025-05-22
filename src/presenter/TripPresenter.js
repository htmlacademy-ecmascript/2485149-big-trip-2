import InfoTripView from '../view/info-trip-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import EditList from '../view/event-list-view';
import { render } from '../framework/render';
import { mockData } from '../mock/mockData';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import PointsModal from '../modals/trip-points';
import PointPresenter from './pointPresenter';

export default class TripPresenter {
  #container;
  #data;
  #pointsModal;
  #routeListPoints;
  #sortView;
  #pointPresenters;

  constructor(container) {
    this.#container = container;
    this.#data = mockData;
    this.#pointsModal = new PointsModal(mockData);
    this.#routeListPoints = new EditList();
    this.#sortView = new SortView();
    this.#pointPresenters = new Map();
  }

  init() {
    const tripInfo = {
      title: this.getTripTitle(this.#data),
      dates: this.getTripDates(this.#data),
      cost: this.getTotalCost(this.#data),
    };

    render(new InfoTripView(tripInfo), this.#container);
    render(new FilterView(), this.#container);
    render(this.#sortView, this.#container);
    render(this.#routeListPoints, this.#container);

    const points = this.#pointsModal.getPoints();

    points.forEach((point) => {
      const pointPresenter = new PointPresenter(
        this.#routeListPoints.element,
        mockDestination,
        mockOffers,
        this.#handlePointChange,
        this.#handleModeChange
      );
      pointPresenter.init(point);
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  #handlePointChange = (updatedPoint) => {
    this.#pointsModal.updatePoint(updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  getTripTitle(data) {
    const destinationNames = data.map((point) => {
      const destination = mockDestination.find(
        (dest) => dest.id === point.destination
      );
      return destination ? destination.name : 'Unknown';
    });
    return destinationNames.join(' - ');
  }

  getTripDates(data) {
    if (!data.length) return '';
    const startDate = new Date(data[0].dateFrom).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const endDate = new Date(data[data.length - 1].dateTo).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return `${startDate} - ${endDate}`;
  }

  getTotalCost(data) {
    return data.reduce((total, point) => {
      const offersCost = point.offers.reduce((sum, offerId) => {
        const offer = mockOffers.find((o) => o.id === offerId);
        return sum + (offer ? offer.price : 0);
      }, 0);
      return total + point.basePrice + offersCost;
    }, 0);
  }
}
