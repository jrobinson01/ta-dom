### Ta-Dom! ###
A tiny, simple, functional helper library for generating DOM elements. Inspired in part by the jade templating engine for node.

### Usage ###

generate a single div element with a class
```javascript
div({class:'how-i-like-my-divs'});
```
produces:
```html
  <div class="how-i-like-my-divs"></div>
```

with some text content:
```javascript
div({class:'how-i-like-my-divs'}, 'Hello, World!');
```
produces:
```html
  <div class="how-i-like-my-divs">
    Hello, World!
  </div>
```
with some nested elements:
```javascript
div({class:'how-i-like-my-divs'}, 'Hello, World!',
      h1({},'HEADER'),
      article({class:'how-i-like-my-articles'}, 'blah blah blah');
    );
```
produces:
```html
  <div class="how-i-like-my-divs">
    Hello, World!
    <h1>HEADER</h1>
    <article>blah blah blah</article>
  </div>
```

Create re-usable modules:
```javascript
const myArticle = (headline, articleText) => {
  return div({class:'my-article'},
    h1({class:'my-header'}, headline),
    article({class:'my-class'}, articleText)
  );
};

div({}, myArticle('My Favorite things', 'Foo and bar.'),
  myArticle('About Bananas', 'Yellow and delicious.'));
```
produces:
```html
  <div>
    <div class="my-article">
      <h1>My Favorite Things</h1>
      <article>Foo and bar.</article>
    </div>
    <div class="my-article">
      <h1>About Bananas</h1>
      <article>Yellow and delicious.</article>
  </div>
```

Using some fancy component library, define a function to instantiate your components:
```javascript
const myElement = element('my-element');
myElement();
```
produces:
```html
  <my-element><my-element>
```

For more examples, check out the `examples` directory.

#### Testing ####
Ta-dom uses Karma for unit testing. To run tests:
`npm test`
