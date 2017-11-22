import TaDom from '/index.js';
// generate a form
const myForm = () => {
  return form(input({type:'text'}),
           button({type:'submit'}, 'submit')
          );
};

// build a thing
document.body.appendChild(
  div({class:'outer'},
      h1('HELLO,'),
      h2('World!'),
      div({class:'inner'},
          span('yay span!'), span('blarg span!')),
      article(h4('ARTICLE HEAER'), 'hi article'),
      myForm(),
      myForm(),
      div({enabled:true, count:3}, 'more div')
     )
);
