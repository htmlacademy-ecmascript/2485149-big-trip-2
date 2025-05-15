import PointView from '../view/point-view';
import FormEditView from '../view/form-edit-view';
import { render, replace, remove } from '../framework/render';
import  Mode  from '../const';

export default class PointPresenter {
  #container = null;
  #point = null;
  #pointComponent = null;
  #formEditComponent = null;

  #destinations = null;
  #offers = null;

  #handlePointChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor(container, destinations, offers, onPointChange, onModeChange) {
    this.#container = container;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handlePointChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new PointView(
      point,
      this.#getDestination(),
      this.#getOffers(),
      this.#handleEditClick,
      this.#handleFavoriteClick
    );

    this.#formEditComponent = new FormEditView(
      point,
      this.#getDestination(),
      this.#getOffers(),
      this.#handleFormSubmit,
      this.#handleCloseEditClick
    );

    if (!prevPointComponent || !prevFormEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }

    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #getDestination() {
    return this.#destinations.find((dest) => dest.id === this.#point.destination);
  }

  #getOffers() {
    return this.#point.offers.map((offerId) =>
      this.#offers.find((offer) => offer.id === offerId)
    );
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    this.#handleModeChange();
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleCloseEditClick = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#handlePointChange(updatedPoint);
    this.#replaceFormToCard();
  };

  #handleFavoriteClick = () => {
    this.#handlePointChange({
      ...this.#point,
      isFavorite: !this.#point.isFavorite,
    });
  };
}

