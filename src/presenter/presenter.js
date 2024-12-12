import SortView from '../view/sort-view.js';
import FormEditView from '../view/form-edit-view.js';
import EditList from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import {render} from '../render.js';
import { mockData } from '../mock/mockData.js';
import PointsModal from '../modals/trip-points.js';
// const POINTS = 3;

export default class Presenter {
  routeListPoints = new EditList();
  sortView = new SortView();
  formEdit = new FormEditView();

  constructor({container}) {
    this.container = container;
    this.pointsModal = new PointsModal(mockData);
  }

  init() {

    const points = this.pointsModal.getPoints();
    render(this.sortView, this.container);

    render(this.formEdit, this.container);

    render(this.routeListPoints, this.container);

    // for (let i = 0; i < POINTS; i++) {
    //   render(new PointView(), this.routeListPoints.getElement());
    // }
    points.forEach((point)=>{
      render(new PointView(point), this.routeListPoints.getElement());
    });
  }
}
