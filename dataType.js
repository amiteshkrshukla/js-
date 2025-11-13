// number 
/* JavaScript has a single number type: double-precision 64-bit binary format IEEE 754 value. This means that all numbers in JavaScript, whether they are integers or floating-point numbers, are represented in this format. */
// string => sequence of characters used to represent text 
/* In JavaScript, strings are used to store and manipulate text. A string is a sequence of characters enclosed in single quotes (' '), double quotes (" "), or backticks (` `). */
// boolean => true or false
/* In JavaScript, a boolean is a primitive data type that can have one of two values: true or false. Booleans are often used in conditional statements and logical operations to control the flow of a program based on certain conditions. */
// undefined => variable declared but not assigned any value
/* In JavaScript, if a variable is declared but not assigned a value, it is automatically assigned the value undefined. This means that the variable exists, but it does not have a meaningful value yet. */
// null => represents the intentional absence of any object value
/* 
In JavaScript, null is a primitive value that represents the intentional absence of any object value. It is often used to indicate that a variable should not point to any object or that a function does not return a meaningful value. */
// object => collection of properties
/* In JavaScript, an object is a complex data type that allows you to store collections of data and more complex entities. Objects are used to represent real-world entities and can contain properties (key-value pairs) and methods (functions associated with the object). */
// symbol => unique and immutable primitive value
/* In JavaScript, a symbol is a primitive data type that represents a unique and immutable value. Symbols are often used as unique identifiers for object properties to avoid name collisions. Each time you create a new symbol, even with the same description, it is guaranteed to be unique. */
// bigInt => represents integers with arbitrary precision
/* In JavaScript, BigInt is a built-in object that provides a way to represent whole numbers larger than the maximum safe integer limit for the Number type (which is 2^53 - 1). BigInt allows you to work with integers of arbitrary precision, meaning you can perform calculations on very large integers without losing accuracy. */
// Example usage of different data types
const num = 42; // number
const str = "Hello, World!"; // string
const bool = true; // boolean
let undef; // undefined
const nul = null; // null
const obj = { name: "John", age: 30 }; // object
const sym = Symbol("unique"); // symbol
const bigIntNum = BigInt(9007199254741991); // bigInt
console.log(typeof num); // "number"
console.log(typeof str); // "string"
console.log(typeof bool); // "boolean"
console.log(typeof undef); // "undefined"
console.log(typeof nul); // "object"
console.log(typeof obj); // "object"
console.log(typeof sym); // "symbol"
console.log(typeof bigIntNum); // "bigint"
// Note: The typeof null returns "object" due to a historical bug in JavaScript.








// data type summary 
// 1. Primitive Data Types:
//    - Number
//    - String
//    - Boolean
//    - Undefined
//    - Null
//    - Symbol
//    - BigInt
// 2. Non-Primitive Data Types:
//    - Object
//    - Array
//    - Function
// 3. Dynamic Typing: JavaScript is dynamically typed, meaning variables can hold values of any data type and can change types at runtime.
// 4. Type Conversion: JavaScript performs automatic type conversion (coercion) in certain operations, but explicit conversion can also be done using functions like Number(), String(), and Boolean().
// 5. Type Checking: The typeof operator is used to check the data type of a variable or value.
// 6. Special Values: JavaScript has special values like NaN (Not-a-Number) and Infinity, which are part of the Number data type.
// when i check data types in js i use typeof operator
