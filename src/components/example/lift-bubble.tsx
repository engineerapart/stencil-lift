import { Component, State } from '@stencil/core';

import { Lift } from '../../services/lift.decorator';

@Lift({ key: 'bubble' })
@Component({
  tag: 'lift-bubble',
  styleUrl: 'lift-bubble.css',
})
export class LiftBubble {

  @State() title: string;
  @State() text: string;

  // This component doesn't have getInitialProps, to demonstrate injection of external state.
  // async getInitialProps() { }

  render() {
    return (
      <div class="bubble">
        <header>
          <h3>{this.title}</h3>
        </header>

        <div class="bubble-text">
          {this.text}
        </div>
      </div>
    );
  }
}
