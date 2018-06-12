import { Component, Prop, State } from '@stencil/core';
import ClientLiftService, { LiftService, __LIFT_STATE_KEY } from '../../services/lift.service';

@Component({
  tag: 'stencil-lift',
})
export class StencilLiftComponent {

  @Prop() deleteStateOnWindowLoad = false;
  @Prop() initialState: any = null;
  @Prop() mergeState = false;

  @Prop({ context: 'isServer' }) isServer: boolean;
  @Prop({ context: 'window' }) window!: Window;
  @Prop({ context: 'document' }) document!: Document;

  private _LiftService: LiftService;

  // When rendering completes, the Lift's data will be set to this prop.
  // The state set triggers a refresh, which gives the render() an opportunity
  // to create the output script node.
  @State() collectedData: any = null;

  componentWillLoad() {
    this._LiftService = this.isServer ? new LiftService() : ClientLiftService;
    this._LiftService.initialize({
      win: this.window,
      isServer: this.isServer,
      deleteStateOnWindowLoad: this.deleteStateOnWindowLoad,
      initialState: this.initialState,
      mergeState: this.mergeState,
    });
  }

  componentDidLoad() {
    this.collectedData = this._LiftService.export() || {};
  }

  componentWillUpdate() {
    return Promise.resolve();
  }

  componentDidUpdate() { } // tslint:disable-line no-empty

  render() {
    if (!this.collectedData) { return null; }

    if (this.isServer) {
      // We must use `this.document`, NOT `document`!
      // `this.document` is scoped to this server request.
      const scr = this.document.createElement('script');
      scr.innerHTML = `window.${__LIFT_STATE_KEY}=${JSON.stringify(this.collectedData)}`;
      scr.id = __LIFT_STATE_KEY;
      this.document.head.appendChild(scr);
    }

    // Render the component tree.
    return [
      // this.isServer ? <script id={__LIFT_STATE_KEY} innerHTML={`window.${__LIFT_STATE_KEY}=${JSON.stringify(this.collectedData)}`}></script> : null,
      <slot></slot>
    ];
  }
}
