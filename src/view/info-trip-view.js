import { createElement } from '../render.js';

function createTripInfoTemplate({title,dates,cost}) {
  return (`<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${title}</h1>
              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;${dates}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`);
}

export default class InfoTripView {
  constructor({title,dates,cost}){
    this.title = title;
    this.dates = dates;
    this.cost = cost;
  }

  getTemplate() {
    return createTripInfoTemplate(
      {title:this.title,
        dates:this.dates,
        cost:this.cost});
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

