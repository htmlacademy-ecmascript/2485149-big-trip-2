import InfoTripView from "../view/info-trip-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";
import EditList from "../view/event-list-view";
import FormEditView from "../view/form-edit-view";
import PointView from "../view/point-view";
import { render } from "../render";
import { mockData } from "../mock/mockData";
import { mockDestination } from "../mock/destinations";
import { mockOffers } from "../mock/offers";
import PointsModal from "../modals/trip-points";
import { replace } from "../framework/render";
import NoPoint from "../view/no-point-view";

export default class TripPresenter {
  #container;
  #data;
  #pointsModal;
  #routeListPoints;
  #sortView;
  #activeFormEdit = null;

  constructor(container) {
    this.#container = container;
    this.#data = mockData;
    this.#pointsModal = new PointsModal(mockData);
    this.#routeListPoints = new EditList();
    this.#sortView = new SortView();
  }

  setEditButtonHandler(pointView) {
    pointView.setRollupButtonClickHandler(() => {
      if (this.#activeFormEdit) {
        replace(this.#activeFormEdit.relatedPointView, this.#activeFormEdit);
        this.#activeFormEdit = null;
      }

      const formEditView = new FormEditView(pointView);
      const escKeyHandler = (evt) => {
        if (evt.key === "Escape") {
          evt.preventDefault();
          replace(pointView, formEditView);
          this.#activeFormEdit = null;
          document.removeEventListener("keydown", escKeyHandler);
        }
      };

      formEditView.setFormSubmitHandler((updatedData) => {
        pointView.data = { ...pointView.data, ...updatedData };
        replace(pointView, formEditView);
        this.#activeFormEdit = null;
      });

      formEditView.setRollupButtonClickHandler(() => {
        replace(pointView, formEditView);
        this.#activeFormEdit = null;
        document.removeEventListener("keydown", escKeyHandler);
      });

      replace(formEditView, pointView);
      this.#activeFormEdit = formEditView;
      this.#activeFormEdit.relatedPointView = pointView;
      document.addEventListener("keydown", escKeyHandler);
    });
  }

  init() {
    const tripInfo = {
      title: this.getTripTitle(this.#data),
      dates: this.getTripDates(this.#data),
      cost: this.getTotalCost(this.#data),
    };

    const infoTripView = new InfoTripView(tripInfo);
    render(infoTripView, this.#container);

    const filterView = new FilterView();
    render(filterView, this.#container);

    render(this.#sortView, this.#container);
    render(this.#routeListPoints, this.#container);

    const points = this.#pointsModal.getPoints();

    if (true) {
      const noPointVal = new NoPoint();
      render(noPointVal, this.#routeListPoints.element);
    } else {
      points.forEach((point) => {
        const destination = mockDestination.find(
          (dest) => dest.id === point.destination
        );
        const offers = point.offers.map((offerId) =>
          mockOffers.find((offer) => offer.id === offerId)
        );

        const pointView = new PointView(point, destination, offers);

        this.setEditButtonHandler(pointView);
        render(pointView, this.#routeListPoints.element);
      });
    }
  }

  getTripTitle(data) {
    const destinationNames = data.map((point) => {
      const destination = mockDestination.find(
        (dest) => dest.id === point.destination
      );
      return destination ? destination.name : "Unknown";
    });
    return destinationNames.join(" - ");
  }

  getTripDates(data) {
    if (!data.length) {
      return "";
    }
    const startDate = new Date(data[0].dateFrom).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const endDate = new Date(data[data.length - 1].dateTo).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
    return `${startDate} - ${endDate}`;
  }

  getTotalCost(data) {
    return data.reduce((total, point) => {
      const offersCost = point.offers.reduce((sum, offerId) => {
        const offer = mockOffers.find((theOffer) => theOffer.id === offerId);
        return sum + (offer ? offer.price : 0);
      }, 0);
      return total + point.basePrice + offersCost;
    }, 0);
  }
}
