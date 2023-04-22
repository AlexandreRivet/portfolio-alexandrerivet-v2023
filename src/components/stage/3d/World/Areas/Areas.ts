import { Object3D } from 'three';
import { EventBus } from '../../../utils/EventBus';
import { Ticker } from '../../../utils/Ticker';
import { Area, AreaParams } from './Area';

export type AreasSettings = {
  ticker: Ticker;
}

export class Areas extends EventBus {
  public container = new Object3D();

  private areas: Area[] = [];

  constructor(private settings: AreasSettings) {
    super();

    this.container.matrixAutoUpdate = false;

    this.setupBehavior();
  }

  public createArea(params: AreaParams) {
    const area = new Area({
      ...this.settings,
      ...params,
    });
    this.container.add(area.container);
    this.areas.push(area);
    return area;
  }

  public destroyArea(area: Area) {
    const indexOfArea = this.areas.indexOf(area);
    if (indexOfArea !== -1) {
      this.areas.splice(indexOfArea, 1);
    }
  }

  private setupBehavior() {

  }
}