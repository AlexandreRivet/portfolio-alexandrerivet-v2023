import { Engine, Scene as BScene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Mesh } from '@babylonjs/core';

export default class Scene {
  private engine?: Engine;
  private scene?: BScene;

  constructor() {}

  public init(view: HTMLCanvasElement | null) {
    const engine = new Engine(view, true, {}, true);
    const scene = new BScene(engine);

    const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(view, true);
    const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
    const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

    // run the main render loop
    engine.runRenderLoop(() => {
        scene.render();
    });

    this.scene = scene;
    this.engine = engine;
  }

  public destroy() {
    this.scene?.dispose();
    this.engine?.dispose();
  }
}