'use strict';

// VARIABLES

// variable with let keyword
let age = 25;
let year = 2019;

console.log(age, year); // 25 2019

// variable with const keyword
const myAge = 44;

console.log(myAge); // 44

// STRINGS

console.log('hello sanjeev'); // hello sanjeev

// string concatenation

let firstName = 'Sanjeev';
let lastName = 'Jha';

let name = firstName + ' ' + lastName;

console.log(name); // Sanjeev Jha

// getting characters from string

console.log(name[4]); // e

// string length

console.log(name.length); // 11

// string methods
// Uppercase // add () at the end of methods like toUppercase
console.log(name.toUpperCase()); // SANJEEV JHA
let result = name.toLowerCase();

console.log(result); // sanjeev jha

// indexOf -- finds the position of first occurance
let email = 'sanjeev@waituk.com';

console.log(email.indexOf('@')); // 7

// lastIndexOf -- finds last occurance of character in string
let result1 = email.lastIndexOf('e');

console.log(result1); // 5

// slice -- it slice from first argument to second argument
let anEmail = 'anything@waituk.com';

console.log(anEmail.slice(2, 5)); // yth

// substr -- same as slice but first argument is from and second is how many

console.log(anEmail.substr(2, 5)); // ythin

// replace - takes two args, replaces first with second

let myText5 = 'ME@waituk.com';
console.log(myText5.replace('ME', 'SA')); // SA@waituk.com

// Template Strings || Template Literals

const title = 'Best result of 2019';
const author = 'Mario';
const likes = 30;

// Concatenation way
//let result2 = 'The blog called ' + title + ' by ' + author + ' has ' + likes + ' likes';

let result2 = `The blog called ${title} by ${author} has ${likes} likes`;

console.log(result2);

// Arrays

// store arrays in a variable
let array1 = ['Kathmandu', 'Janakpur', 'Biratnagar'];
let array2 = [45, 75, 100];
let array3 = ['Kathmandu', 'Janakpur', 45, 75, 100];

console.log(array1); //(3) ["Kathmandu", "Janakputr", "Biratnagar"]

console.log(array1.length); // 3

// Array Methods - join // joins with provided character

let result3 = array1.join(', ');
console.log(result3);

// Array method - concat // concatinates or adds to existing array
let result4 = array1.concat(['Birgunj', 'Rajbiraj']);
console.log(result4);

let result5 = array1.push('pokhara');

console.log(array1);
