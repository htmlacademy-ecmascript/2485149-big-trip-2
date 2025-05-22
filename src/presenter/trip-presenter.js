import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import EditList from '../view/event-list-view';
import { render } from '../framework/render';
import { mockData } from '../mock/mockData';
import { mockDestination } from '../mock/destinations';
import { mockOffers } from '../mock/offers';
import PointsModal from '../modals/trip-points';
import PointPresenter from './point-presenter';

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
}
