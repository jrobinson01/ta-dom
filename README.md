## Ta-Dom! 🎉 ##
A tiny, functional helper library for generating DOM elements. Inspired in part by the jade templating engine for node.

### How it works ###
Ta-Dom generates a global function that returns an HTML element for each valid html tag. The attributes object is a plain object whose key/value pairs make up the desired attributes. The content param can hold text content, or any number of other elements.
```javascript
div(attributesObject, ...content);
```

Event listeners can also be specified in the attributes object by specifying the name of the event, with the 'on-' prefix and a function defining the event handler.

```javascript
div({'on-click',(event)=> console.log(event)});
```

### Usage ###

generate a single div element with a class:
```javascript
div({class:'how-i-like-my-divs'});
```

```html
  <div class="how-i-like-my-divs"></div>
```

with some text content:
```javascript
div({class:'how-i-like-my-divs'}, 'Hello, World!');
```
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
const myElement = generate('my-element');
myElement();
```
```html
  <my-element><my-element>
```

For more examples, check out the `examples` directory.

#### Testing ####
Ta-dom uses Karma for unit testing. To run tests:
`npm test`
