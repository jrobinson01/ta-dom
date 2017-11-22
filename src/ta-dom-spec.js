import TaDom from './ta-dom.js';

describe('ta-dom', () => {
  it('should add a bunch of functions to window', () => {
    expect(window.a).toBeDefined();
    expect(window.xmp).toBeDefined();
  });
  describe('generate(tag)', () => {
    it('should produce a function', () => {
      const fn = TaDom.generate('myElement');
      expect(typeof fn).toBe('function');
    });
  });
  describe('a ta-dom function', () => {
    let fn;
    beforeEach(() => {
      fn = TaDom.generate('myElement');
    })
    it('should produce an element', () => {
      expect(fn() instanceof HTMLElement).toBe(true);
    });
    it('should apply the attributes', () => {
      const el = fn({id:'foo', class:'bar'});
      expect(el.getAttribute('id')).toBe('foo');
      expect(el.getAttribute('class')).toBe('bar');
    });
    it('should create simple text content', () => {
      const el = fn('foo');
      expect(el.innerText).toBe('foo');
    });
    it('should handle nested elements', () => {
      const el = fn('foo', div('bar'));
      expect(el.outerHTML).toBe('<myelement>foo<div>bar</div></myelement>');
    });
    it('should add event listeners', () => {
      const handler = jasmine.createSpy('handler');
      const el = fn({'on-some-event': handler});
      el.dispatchEvent(new CustomEvent('some-event'));
      expect(handler).toHaveBeenCalled();
    });
  })
});
