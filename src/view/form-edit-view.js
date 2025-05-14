import AbstractView from '../framework/view/abstract-view.js';

function createFormEditTemplate() {
  return `<form class="event event--edit" action="#" method="post">
  <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">30</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                        <label class="event__offer-label" for="event-offer-comfort-1">
                          <span class="event__offer-title">Switch to comfort class</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">100</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                        <label class="event__offer-label" for="event-offer-meal-1">
                          <span class="event__offer-title">Add meal</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">15</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                        <label class="event__offer-label" for="event-offer-seats-1">
                          <span class="event__offer-title">Choose seats</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">5</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                        <label class="event__offer-label" for="event-offer-train-1">
                          <span class="event__offer-title">Travel by train</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">40</span>
                        </label>
                      </div>
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
                        <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
}

export default class FormEditView extends AbstractView {
  #point;

  constructor(point) {
    super();
    this.#point = point;
    this._callback = {};
  }

  get template() {
    return createFormEditTemplate(this.#point);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupClick = callback;
    const rollupButton = this.element.querySelector('.event__rollup-btn');
    if (rollupButton) {
      rollupButton.addEventListener('click', this._callback.rollupClick);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.submit = callback;
    const form = this.element.querySelector('form');
    if (form) {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(form);
        const updatedData = {
          ...this.#point,
          basePrice: +formData.get('event-price'),
        };
        this._callback.submit(updatedData);
      });
    }
  }

  setEscKeyHandler(callback) {
    this._callback.escKey = callback;
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this._callback.escKey();
      }
    });
  }

  removeHandlers() {
    document.removeEventListener('keydown', this._callback.escKey);
    const rollupButton = this.element.querySelector('.event__rollup-btn');
    if (rollupButton) {
      rollupButton.removeEventListener('click', this._callback.rollupClick);
    }
    const form = this.element.querySelector('form');
    if (form) {
      form.removeEventListener('submit', this._callback.submit);
    }
  }

  removeElement() {
    this.removeHandlers();
    super.removeElement();
  }
}
