describe('ta-dom', () => {

  describe('applyAttributes(el, attributes)', () => {
    it('should set attributes on the element', () => {
      const el = div();
      const attributes = {class: "foo", id: "bar"};
      const res = applyAttributes(el, attributes);
      expect(el.getAttribute('class')).toEqual('foo');
      expect(el.getAttribute('id')).toEqual('bar');
    });
  });

  describe('appendContent(el, content)', () => {
    it('should append simple text content', () => {
      const el = div({},'foo');
      expect(el.innerText).toEqual('foo');
    });
    it('should append html elements', () => {
      const nested1 = div();
      const nested2 = div();
      const el = div({}, nested1, nested2);
      expect(el.firstChild).toBe(nested1);
      expect(el.lastChild).toBe(nested2);
    });
    xit('should properly nest elements', () => {
      spyOn(window, 'appendContent').and.callThrough();
      const el = div();
      appendContent(el, [div(div())]);
      expect(window.appendContent.calls.count()).toBe(2);
    });
  });

  describe('element(tagName, attributes, ...content)', () => {
    it('should produce an element', () => {
      const el = element('div', {});
      expect(el instanceof HTMLElement).toBe(true);
      // test tagName, attributes, etc?
      //...
    });
  });

  describe('generate(tag)', () => {
    it('should produce a function', () => {
      const fn = generate('div');
      expect(typeof fn).toBe('function');
    });
  });
});
