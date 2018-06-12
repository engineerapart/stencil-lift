import ClientLiftService, { LiftService } from './lift.service';

export interface LiftComponentOptions {
  key: string;
}

declare var Context: any;
export function Lift(options: LiftComponentOptions): ClassDecorator {
  return function LiftDecorator(constructor: Function) {
    const original = constructor.prototype.componentWillLoad;

    constructor.prototype.componentWillLoad = async function() {
      // On client, use the singleton export.
      let LiftInstance: LiftService = ClientLiftService;
      // On server, we need an instance per request so that requests do not share state.
      if (typeof Context !== 'undefined' && Context.isServer) {
        LiftInstance = Context.__LIFT_STATE_KEY;
      }

      let data = null;
      const getInitialProps = this.getInitialProps;

      if (getInitialProps && typeof getInitialProps === 'function') {
        if (LiftInstance.isServer) {
          data = await getInitialProps.bind(this)({ Lift: LiftInstance, isServer: LiftInstance.isServer });
          LiftInstance.set({ key: options.key, payload: data });
        } else {
          data = LiftInstance.get(options.key);
        }
      } else {
        // Get the data for this key if it is in the store.
        data = LiftInstance.get(options.key);
      }

      // Spread the data into the class instance.
      data && Object.assign(this, data);

      original && typeof original === 'function' && original.apply(this, arguments);
    };
  };
}
