type AccountInfo = {
    id : number;
    name : string;
    email? : string;
}

const account : AccountInfo = {
    id : 1,
    name : "John Doe"
}

type CharInfo = {
    nickname : string;
    level : number;
}

const char : CharInfo = {
    nickname : "John",
    level : 1
}

// Intersection types
type PlayerInfo = AccountInfo & CharInfo;

const player : PlayerInfo = {
    id : 123,
    name : "John Doe",
    nickname : "John",
    level : 1
}
