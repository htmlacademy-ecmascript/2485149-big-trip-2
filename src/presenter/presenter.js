import FormEditView from '../view/form-edit-view.js';
import EditList from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';

const POINTS = 3;

export default class Presenter {
  routeListPoints = new EditList();
  formEdit = new FormEditView();

  constructor ({container}) {
    this.container = container;
  }

  init() {
    render(this.FormEditView, this.container);
    render(this.routeListPoints, this.container);

    for (let i = 0; i < POINTS; i++) {
      render(new PointView(), this.routeListPoints.getElement());
    }
  }
}
