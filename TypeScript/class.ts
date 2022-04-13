abstract class UserAccount {

    readonly name : string;
    protected age : number;

    constructor(name : string, age : number) {
        this.name = name;
        this.age = age;
    }
    
    log_details() : void {
        console.log(`The player ${this.name} is ${this.age} years old.`);
    }

}

class CharAccount extends UserAccount {

    private nickname : string;
    private level : number;

    constructor(name : string, age : number, nickname : string, level : number) {
        super(name, age);
        this.nickname = nickname;
        this.level = level;
    }

    get get_level() : number {
        return this.level;
    }

    set set_level(level : number) {
        this.level = level;
    }

    char_log_details() : void {
        console.log(`The player ${this.name} is ${this.age} years old and has the nickname ${this.nickname} and is level ${this.level}.`);
    }
}

const john = new CharAccount('John', 25, 'Johnny', 1);
john.char_log_details();
console.log(john.get_level);
john.set_level = 2;
console.log(john.get_level);