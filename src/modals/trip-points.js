export default class PointsModal{
  constructor (data){
    this._data = data;
  }

  getPoints(){
    return this._data;
  }

  updatePoint(id, updatedPoint){
    const index = this._data.findIndex((point)=>point.id === id);
    if (index === -1) {
      throw new Error('point не найден');
    }
    this._data[index] = {
      ...this._data[index], ...updatedPoint
    };
  }

  addPoint(newPoint){
    this._data.push(newPoint);
  }

  deletePoint(id){
    this._data = this._data.filter((point)=> point.id !== id);
  }
}
