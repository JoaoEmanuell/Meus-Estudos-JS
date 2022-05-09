// Factory function

function log2(prefix : string) {
    return function(target : Function) {
        console.log(prefix, target);
    };
};

// @log2('log2')
// class Foo {}

// Class decorator

function SetApiVersion(api_version : string) {
    return (target : any) => {
        return class extends target {
            version = api_version
        }
    }
}

@SetApiVersion('5')
class Api {}
// console.log(new Api());

// Property decorator

function MinLength(min : number) {
    return function(target : any, key : string) {
        let val = target[key]

        const getter = () => val;

        const setter = (value : string) => {
            if (value.length < min) {
                throw new Error(`${key} must be at least ${min} characters`);
            }
            val = value;
        }
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
    });
    };
};

class Movie {

    @MinLength(5)
    title : string;

    constructor (title : string){
        this.title = title;
    }

}

const movie = new Movie('abcde');

// Method decorator

function delay(ms : number) {
    return function(target : any, key : string, descriptor : PropertyDescriptor) {

        const original = descriptor.value; // Save the original function

        descriptor.value = function(...args : any[]) {
            setTimeout(() => {
                original.apply(this, args); // Claim the original function
            }
            , ms);
            console.log(`Await ${ms}ms`);
            return descriptor;
        }
    }
}

class Person {
    name : string;
    constructor (name : string){
        this.name = name;
    }
    @delay(100)
    hello() : void {
        console.log(`Hello, I'm ${this.name}`);
    }
}

const person = new Person('John');
person.hello();