import { EventBus } from './EventBus';

export type TickerSettings = {
  autoStart?: boolean;
}

export class Ticker extends EventBus {
  /** Whether or not the ticker has been started */
  public started = false;

  /** When the ticker shas been started */
  private startTime: number = 0;
  /** Current time of the ticker */
  private currentTime: number = this.startTime;
  /** Delta time between last frame and current frame */
  private deltaTime = 0;
  /** Internal current frame request ID */
  private requestId: number | null = null;

  constructor(
    private settings: TickerSettings
  ) {
    super();

    this.tick = this.tick.bind(this);
    this.tryToStart();
  }

  /** Elapsed time from the ticker start */
  public get elapsed() {
    return this.currentTime - this.startTime;
  }

  /**
   * Start the ticker if not already started
   */
  public start() {
    if (!this.started) {
      this.started = true;
      this.startTime = performance.now();
      this.requestStart();
    }
  }

  /** Stops the ticker if already started */
  public stop() {
    if (this.started) {
      this.started = false;
      this.requestStop();
    }
  }

  /** Internal management to start the ticker */
  private requestStart() {
    if (this.requestId === null) {
      this.currentTime = performance.now();
      this.requestId = window.requestAnimationFrame(this.tick);
    }
  }

  /** Internal management to stop the ticker */
  private requestStop() {
    if (this.requestId !== null) {
      window.cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  /** Internal management of starting */
  private tryToStart() {
    if (this.started) {
      this.requestStart();
    } else if (this.settings.autoStart) {
      this.start();
    }
  }

  /** Execute one tick of the ticker */
  private tick(time: number) {
    this.requestId = null;
    if (this.started) {
      this.update(time);
      // Check again started and requestId as update itself could have trigger some things that we don't know
      // and mess up these values
      if (this.started && this.requestId === null) {
        this.requestId = window.requestAnimationFrame(this.tick);
      }
    }
  }

  /** Emit the update event with delta and elapsed times */
  private update(currentTime = performance.now()) {
    if (currentTime > this.currentTime) {
      this.deltaTime = currentTime - this.currentTime;
      this.currentTime = currentTime;
      this.emit('update', this.deltaTime, this.elapsed);
    }
  }
}