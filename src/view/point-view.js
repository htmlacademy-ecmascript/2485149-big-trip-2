import AbstractView from '../framework/view/abstract-view.js';

const TYPE_NAMES = {
  taxi: 'Taxi',
  flight: 'Flight',
  bus: 'Bus',
  train: 'Train',
  ship: 'Ship',
  drive: 'Drive',
  checkin: 'Check-in',
  sightseeing: 'Sightseeing',
  restaurant: 'Restaurant',
};

function createPointTemplate(point, destination, offers) {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;

  const readableType = TYPE_NAMES[type] || 'taxi';

  const startDate = new Date(dateFrom).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const endDate = new Date(dateTo).toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const duration = Math.round((new Date(dateTo) - new Date(dateFrom)) / (1000 * 60));
  const offersTemplate = offers.length > 0
    ? offers.map((offer) => `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </li>`).join('')
    : '<li class="event__offer">No additional offers</li>';

  return (`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${new Date(dateFrom).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${readableType}.png" alt="${readableType} icon">
        </div>
        <h3 class="event__title">${readableType} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${startDate}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${endDate}</time>
          </p>
          <p class="event__duration">${duration}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `);
}

export default class PointView extends AbstractView{
  constructor(point, destination, offers) {
    super();
    this.point = point;
    this.destination = destination || { name: 'Unknown destination' };
    this.offers = offers || [];
  }

  get template() {
    return createPointTemplate(this.point, this.destination, this.offers);
  }
}

