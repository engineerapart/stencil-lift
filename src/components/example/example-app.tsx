import { Component } from '@stencil/core';

const initialState = {
  bubble: {
    title: 'Hello world!',
    text: 'dolor sint quo a velit explicabo quia nam'
  }
};

@Component({
  tag: 'example-app',
  styles: `
    example-app {
      display: block;
      width: 75%;
      margin: 0 auto;
    }
  `
})
export class ExampleApp {

  render() {
    const liftProps = {
      deleteStateOnWindowLoad: false,
      initialState,
      mergeState: true,
    };

    return (
      <stencil-lift {...liftProps}>
        <div class="main">
          <header>
            <h1>Stencil Lift Demo App</h1>
          </header>
          <lift-bubble></lift-bubble>
          <div>
            <post-listing></post-listing>
          </div>
        </div>
      </stencil-lift>
    );
  }
}
