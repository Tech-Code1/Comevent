import { AREAS, TYPE_AREA } from '../constants';

export interface ISelectArea {
  id: number;
  name: AREAS;
  type?: TYPE_AREA;
}

export interface ISelectAreaWithType extends ISelectArea {
  type: TYPE_AREA;
}
