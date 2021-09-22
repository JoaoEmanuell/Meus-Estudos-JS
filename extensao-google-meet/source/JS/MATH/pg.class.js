class PG{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }
    main(){
        if (this._el.indexOf(`${mathPrefix}p.g`) >= 0){
            if (this._el.indexOf(`${mathPrefix}p.g cl`) >= 0){
                mensage(this.validateClassicPG(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.g n`) >= 0){
                mensage(this.validNPG(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.g r`) >= 0){
                mensage(this.validRPG(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.g s`) >= 0){
                mensage(this.validSPG(this._el));
            }
        }
    }
    validateClassicPG(el){
        this._el = String(el).replace(`${mathPrefix}p.g cl `, ``);
        const listNumbers = ExtractNumbers(this._el, ' ');
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPg = new Math_PG();
            return classPg.classicPG(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validNPG(el){
        this._el = String(el).replace(`${mathPrefix}p.g n `, ``);
        const listNumbers = ExtractNumbers(this._el, ' ');
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPg = new Math_PG();
            return classPg.NPG(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validRPG(el){
        this._el = String(el).replace(`${mathPrefix}p.g r `, ``);
        const listNumbers = ExtractNumbers(this._el, ' ');
        if (listNumbers.length != 2){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPg = new Math_PG();
            return classPg.RPG(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validSPG(el){
        this._el = String(el).replace(`${mathPrefix}p.g s `, ``);
        const listNumbers = ExtractNumbers(this._el, ' ');
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPg = new Math_PG();
            return classPg.SPG(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
}