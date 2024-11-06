const { singlePerson } = require('../06-alternative-flavor');
const names = require('./04-names');
const sayHi = require ('./05-utils');
const data = require ('./06-alternative-flavor');

console.log(names);
console.log(data);

sayHi('Susan');
sayHi('Peter');
sayHi(names.arthur);
sayHi(names.joshua);

console.log(singlePerson)