import { TestWindow } from '@stencil/core/testing';
import { StencilLiftComponent } from './stencil-lift';

describe('stencil-lift', () => {
  it('should build', () => {
    expect(new StencilLiftComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: HTMLStencilLiftElement;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [StencilLiftComponent],
        html: '<stencil-lift></stencil-lift>'
      });
    });

    it('should work without parameters', () => {
      expect(element.textContent.trim()).toEqual('');
    });

  });
});
