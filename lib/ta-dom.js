function applyAttributes(el, attributes) {
  if (!attributes) {
    return el;
  }
   for(let key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  return el;
};

// fill element with content
function appendContent(el, content) {
  content.forEach(c => {
    if (typeof c === 'string') {
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
  appendContent(el, contents);
  return el;
}

// generates a tag function
function generate(tag) {
  return function(attributes, ...contents) {
    return element(tag, attributes, contents);
  }
}

// giant list of built-in html tags
const tags = [
  'html',
  'body',
  'style',
  'div',
  'span',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'article',
  'template',
  'header',
  'footer',
  'a',
  'b',
  'p',
  'br',
  'button',
  'input',
  'form',
  'canvas',
  'img',
  'ul',
  'ol',
  'li',
  'select',
  'option',
  'label'
];

// generate tag functions
tags.forEach(tag => {
  window[tag] = generate(tag);
});
