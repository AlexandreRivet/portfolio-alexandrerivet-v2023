import { EventBus } from '../../../utils/EventBus';
import { Ticker } from '../../../utils/Ticker';
import { Object3D, Vector2 } from 'three';

export type AreaParams = {
  position: Vector2;
  size: Vector2;
}

export type AreaSettings = AreaParams & {
  ticker: Ticker;
}

export class Area extends EventBus {
  /** Root of the Area */
  public container = new Object3D();

  /** Whether we are currently inside this area */
  private isInside = false;
  /** Whether the area is active or not */
  private isActive = true;

  constructor(private settings: AreaSettings) {
    super();

    this.container.position.set(...this.settings.position.toArray(), 1);
    this.container.matrixAutoUpdate = false;
    this.container.updateMatrix();

    this.setupBehavior();
  }

  public set active(value: boolean) {
    this.isActive = value;
    if (this.isInside) {
      this.isActive ? this.enter() : this.leave();
    }
  }

  public enter() {
    this.isInside = true;
    if (!this.isActive) {
      return;
    }
    this.onEntered?.();
    this.emit('areaIn');
  }

  public leave() {
    this.isInside = false;
    if (!this.isActive) {
      return;
    }
    this.onLeft?.();
    this.emit('areaOut');
  }

  private setupBehavior() {
    this.settings.ticker.on('update', () => {
      // TODO: conditions
      const isInside = true;
      if (isInside !== this.isInside) {
        isInside ? this.enter() : this.leave();
      }
    });
  }

  protected onEntered?(): void;
  protected onLeft?(): void;
}