import TaDom from '/index.js';
// lists
const users = [
  {
    name: "steve",
    age: 97,
    gender: 'male'
  },
   {
    name: "carl",
    age: 17,
    gender: 'male'
  },
   {
    name: "jennnnnifer",
    age: 397,
    gender: 'female'
  },
];

const usercard = (user) =>
    div({class: 'usercard'},
        h1(`Name: ${user.name}`),
        h3(`Age: ${user.age}`)
      )

const malecards = users
    .filter(u => u.gender === 'male')
    .sort((a , b) => a.age > b.age)
    .map(usercard)


// build the thing
console.log('typeof malecards', malecards);
document.body.appendChild(
  div(malecards)
);
