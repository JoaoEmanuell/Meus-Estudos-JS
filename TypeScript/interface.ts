interface GameInterface {
    title : string;
    description : string;
    readonly genre : string;
    platform? : string[];
    get_similar(title : string) : void;
}

const game : GameInterface = {
    title : 'Generic Game',
    description : 'A Generic Game',
    genre : 'Generic',
    platform : ['Windows', 'Linux'],
    get_similar(title : string) : void {
        console.log(`Getting similar games to ${title}`);
    }
}

console.log(game.genre)
game.get_similar('Generic Game');

interface DlcInterface extends GameInterface {
    original_game : GameInterface;
    new_features : string[];
}

const dlc : DlcInterface = {
    title : 'DLC',
    description : 'DLC',
    genre : 'DLC',
    platform : ['Windows', 'Linux'],
    original_game : game,
    new_features : ['New Features'],
    get_similar(title : string) : void {
        console.log(`Getting similar games to ${title}`);
    }
}

class CreateGame implements GameInterface {
    title : string;
    description : string;
    genre : string;
    platform : string[];
    constructor (title : string, description : string, genre : string, platform : string[]) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.platform = platform;
    }
    
    get_similar(title : string) : void {
        console.log(`Getting similar games to ${title}`);
    }
}

const new_game = new CreateGame('New Game', 'New Game', 'New Game', ['Windows', 'Linux']);
new_game.get_similar('New Game');