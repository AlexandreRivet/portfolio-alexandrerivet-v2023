import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera
} from 'three';
import { EventBus } from '../utils/EventBus';
import { Ticker } from '../utils/Ticker';

export class Stage extends EventBus {
  private scene?: Scene;
  private renderer?: WebGLRenderer;
  private camera?: PerspectiveCamera;

  private ticker = new Ticker({ autoStart: false });

  public init(canvas: HTMLCanvasElement) {
    this.scene = new Scene();

    this.renderer = new WebGLRenderer({
      canvas,
    });;
    this.renderer.setClearColor(0xaaaaaa, 1);
    this.renderer.setSize(500, 500, true);

    this.camera = new PerspectiveCamera();

    this.ticker.on('update', (deltaTime: number, elapsedTime: number) => {
      this.render();
    });
    // this.ticker.start();
  }

  private render() {
    if (typeof this.renderer === 'undefined' || typeof this.scene === 'undefined' || typeof this.camera === 'undefined') {
      return;
    }

    this.renderer.render(this.scene, this.camera);
  }

  public destroy() {
    super.destroy();
    this.renderer?.dispose();
  }
}