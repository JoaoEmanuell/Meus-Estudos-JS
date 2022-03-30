// boolean (true or false)
let is_open : boolean;
is_open = true;

// string ('foo', "foo", `foo`)
let message : string;
message = `foo ${is_open}`;

// number (int, float, decimal, octal, hexadecimal, binary)
let age : number;
age = 10;

// array
let list : number[];
list = [1, 2, 3];

let array : Array<string>;
array = ['foo', 'bar'];

// tuple
let tuple : [string, number];
tuple = ['foo', 10];

// enum
enum colors {
    white = '#fff',
    black = '#000'
};

// any (not recommended)
let value : any;
value = 'eqw';

// void

function logger() : void {
    console.log('logger');
};

// null / undefined
type bla = string | undefined;

// never
function error() : never {
    throw new Error('error');
};

// object
let obj : object;
obj = {
    name : 'foo',
    age : 10,
};