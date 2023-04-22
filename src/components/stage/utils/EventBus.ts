export type CallbackArgs = any[];
export type CallbackFnc = (...args: CallbackArgs) => void;

export type Callback = {
  once?: boolean;
  callback: CallbackFnc
};

export type EventName = string | string[];
export type Listeners = Map<string, Callback[]>;

export type CallbackRegistration = (event: EventName, callback: CallbackFnc) => IEventBus;
export type CallbackExecution = (event: EventName, ...args: CallbackArgs) => IEventBus;

export type IEventBus = {
  /**
   * Register callback on event names trigger
   * @param event event name or list of event names
   * @param callback callback that we want to trigger
   * @returns EventBus to chain calls
   * @example
   * ```
   * myEventBus.on('myEventName', () => {})
   * myEventBus.on(['myEventNameA', 'myEventNameB'], () => {})
   * ```
   */
  on: CallbackRegistration;
  /**
   * Register callback on event names trigger only once
   * @param event event name or list of event names
   * @param callback callback that we want to trigger
   * @returns EventBus to chain calls
   * @example
   * ```
   * myEventBus.once('myEventName', () => {})
   * myEventBus.once(['myEventNameA', 'myEventNameB'], () => {})
   * ```
   */
  once: CallbackRegistration;
  /**
   * Unregister callback on event names trigger
   * @param event event name or list of event names
   * @param callback callback that we want to trigger
   * @returns EventBus to chain calls
   * @example
   * ```
   * myEventBus.off('myEventName', () => {})
   * myEventBus.off(['myEventNameA', 'myEventNameB'], () => {})
   * ```
   */
  off: CallbackRegistration;
  /**
   * Emit the event name to trigger all registered callbacks
   * @param event event name to trigger
   * @returns EventBus to chain calls
   * ```
   * myEventBus.emit('myEventName')
   * myEventBus.emit(['myEventNameA', 'myEventNameB'])
   * ```
   */
  emit: CallbackExecution;
}

/**
 * Sanitize event to always return an array
 * @param event string or array of event names
 * @returns array of event names
 */
const sanitizeEventName = (event: EventName) =>
  typeof event === 'string' ? [event] : event;

/**
 * Get index of event and callback
 * @param listeners to get into
 * @param evt event name
 * @param callback to find
 * @returns the element index if found. Otherwise it returns -1
 */
const getEventCallbackIndex = (listeners: Listeners, event: string, callback: CallbackFnc) => 
  listeners.get(event)?.findIndex((events) => events.callback === callback) ?? -1;

const register = (listeners: Listeners, once: boolean, ...[event, callback]: Parameters<CallbackRegistration>): Listeners => {
  const newListeners = new Map(listeners);
  const events = sanitizeEventName(event);
  events.forEach((evt) => {
    let listener = newListeners.get(evt) ?? [];
    newListeners.set(evt, listener);
    if (getEventCallbackIndex(newListeners, evt, callback) === -1) {
      listener.push({ callback, once });
    }
  });
  return newListeners;
}
const on = (listeners: Listeners, ...args: Parameters<CallbackRegistration>) => register(listeners, false, ...args);
const once = (listeners: Listeners, ...args: Parameters<CallbackRegistration>) => register(listeners, true, ...args);

const off = (listeners: Listeners, ...[event, callback]: Partial<Parameters<CallbackRegistration>>): Listeners => {
  const newListeners = new Map(event ? listeners : []);
  if (typeof event !== 'undefined') {
    const events = sanitizeEventName(event);
    events.forEach((evt) => {
      if (typeof callback !== 'undefined') {
        const indexOfCallback = getEventCallbackIndex(newListeners, evt, callback);
        const listener = newListeners.get(evt);
        if (typeof listener !== 'undefined' && indexOfCallback !== -1) {
          listener.splice(indexOfCallback, 1);
          if (listener.length === 0) {
            newListeners.delete(evt);
          }
        }
      } else {
        newListeners.delete(evt);
      }
    });
  }
  return newListeners;
}

const emit = (listeners: Listeners, ...[event, ...args]: Parameters<CallbackExecution>): Listeners => {
  let newListeners = new Map(listeners);
  const events = sanitizeEventName(event);
  events.forEach((evt) => {
    const listener = newListeners.get(evt);
    if (typeof listener === 'undefined') {
      return;
    }

    const array = listener.slice(0);
    for (let i = 0, iLen = array.length; i < iLen; i += 1) {
      array[i].callback(...args);
      if (array[i].once) {
        newListeners = off(newListeners, evt, array[i].callback);
      }
    }
  });
  return newListeners;
}

/**
 * EventBus to manage custom event dispatch
 * @example
 * ```
 * eventBus
 * .on('myEventNameA', () => {})
 * .once('myEventNameB', () => {})
 * .off('myEventNameA', () => {})
 * .emit('myEventNameB', () => {})
 * ```
 */
export class EventBus implements IEventBus {
  private listeners: Map<string, Callback[]> = new Map();

  public on(...args: Parameters<CallbackRegistration>) {
    this.listeners = on(this.listeners, ...args);
    return this;
  }

  public once(...args: Parameters<CallbackRegistration>) {
    this.listeners = once(this.listeners, ...args);
    return this;
  }

  public off(...args: Parameters<CallbackRegistration>) {
    this.listeners = off(this.listeners, ...args);
    return this;
  }

  public emit(...args: Parameters<CallbackExecution>) {
    this.listeners = emit(this.listeners, ...args);
    return this;
  }

  public destroy() {
    this.listeners = off(this.listeners);
  }
}