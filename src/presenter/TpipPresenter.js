import InfoTripView from '../view/info-trip-view';
import { mockData } from '../mock/mockData';
import { render } from '../render';
import PointView from '../view/point-view.js';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';

export default class TripPresenter{
  constructor (container) {
    this.container = container;
    this.data = mockData;
  }

  init(){
    const tripInfo =
    {title: this.getTripTitle(this.data),
      dates: this.getTripDates(this.data),
      cost: this.getTotalCost(this.data)
    };
    const infoTripView = new InfoTripView(tripInfo);
    render(infoTripView, this.container);

    const filterView = new FilterView();
    render(filterView,this.container);

    const sortView = new SortView();
    render(sortView,this.container);
    //другие компоненты
    this.data.forEach((point) => {
      const pointView = new PointView(point);
      render(pointView, this.container);
    });
  }

  getTripTitle(data){
    return data.map((point)=>point.destination.name).join(' - ');
  }

  getTripDates(data){
    const startDate = data[0]?.dateFrom || '';
    const endDate = data[data.length - 1]?.dateTo || '';
    return `${startDate} - ${endDate}`;
  }

  getTotalCost(data){
    return data.reduce((acc,point)=> acc + point.basePrise, 0);
  }
}
