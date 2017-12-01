const TaDom = {};

// assign attributes
function applyAttributes(el, attributes) {
  if (!attributes) {
    return el;
  }
   for(let key in attributes) {
    const value = attributes[key];
    if (typeof value === 'string' || typeof value === 'number') {
      // convert to string
      el.setAttribute(key, String(attributes[key]));
    } else if (typeof value === 'boolean') {
      // empty string if true, otherwise ignore
      if(value) {
        el.setAttribute(key, '');
      }
    } else {
      // set as property
      el[key] = value;
    }
  }
  return el;
};

// add event listeners
function applyEventListeners(el, attributes) {
  if (!attributes) {
    return el;
  }
   for(let key in attributes) {
     const prop = attributes[key];
    if (typeof prop === 'function') {
      // if function, it should be an event handler.
      if(key.indexOf('on-') === 0) {
        const eventName = key.split('on-')[1];

        // store listeners on element so they can
        // easily be removed elsewhere
        if (!el.__eventListeners) {
          el.__eventListeners = [{eventName, fn:prop}];
          el.addEventListener(eventName, prop);
        } else {
          // element already has event listeners
          if (el.__eventListeners.find(e => {
            return e.eventName === eventName && e.fn === prop;
          }) === undefined) {
            el.__eventListeners.push({eventName, fn:prop});
            el.addEventListener(eventName, prop);
          } else {
            // console.log('avoided adding duplicate listener', el, eventName, el.__eventListeners);
          }
        }

      }
    }
  }
  return el;
};

// fill element with content
function appendContent(el, content) {
  content.forEach(c => {
    if (typeof c === 'string' || typeof c === 'number') {
      el.appendChild(document.createTextNode(c));
    } else if (c instanceof HTMLElement) {
      el.appendChild(c);
    } else if (Array.isArray(c)) {
      appendContent(el, c);
    }
  });
  return el;
}

// generates an element
function element(tagName, attributes, ...contents) {
  const el = document.createElement(tagName);
  applyAttributes(el, attributes);
  applyEventListeners(el, attributes);
  appendContent(el, contents);
  return el;
}

// generates a tag function
TaDom.generate = function(tag) {
  return function(attributes, ...contents) {
    // attributes argument is optional
    if(attributes instanceof HTMLElement ||
      typeof attributes === 'string' ||
      typeof attributes === 'number'){
      contents.unshift(attributes);
      attributes = {};
    } else if (Array.isArray(attributes)) {
      contents = attributes.concat(contents);
      attributes = {};
    }
    return element(tag, attributes, contents);
  }
}

// giant list of built-in html tags
const tags = [
  'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'base', 'basefont', 'b', 'bdo',
  'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col',
  'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'embed', 'em', 'fieldset', 'figcaption',
  'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'head', 'hgroup',
  'hr', 'html', 'iframe', 'i', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link',
  'listing', 'map', 'mark', 'marquee', 'math', 'menu', 'meta', 'meter', 'nav', 'nextid', 'nobr', 'noembed', 'noframes',
  'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'param', 'plaintext', 'p', 'pre', 'progress', 'q', 'rp',
  'rt', 'ruby', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'spacer', 'span', 's', 'strike', 'strong',
  'style', 'sub', 'sup', 'summary', 'svg', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'thead', 'th', 'time', 'title',
  'tr', 'tt', 'ul', 'u', 'video', 'wbr', 'xmp'
];

// generate global tag functions
tags.forEach(tag => {
  if (!window[tag]) {
    window[tag] = TaDom.generate(tag);
  } else {
    console.warn(`window.${tag} is already defined!`);
  }
});

export default TaDom;
