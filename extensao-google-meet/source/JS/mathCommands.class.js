const mathPrefix = `+`;

class mathCommands{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }
    main(){
        // P.A
        if (this._el.indexOf(`${mathPrefix}p.a`) >= 0){
            if (this._el.indexOf(`${mathPrefix}p.a cl`) >= 0){
                mensage(this.validateClassicPA(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.a n`) >= 0){
                mensage(this.validNPA(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.a r`) >= 0){
                mensage(this.validRPA(this._el));
            } else if(this._el.indexOf(`${mathPrefix}p.a s`) >= 0){
                mensage(this.validSPA(this._el));
            }
        }
    }
    // Validates
    ExtractNumbers(el){
        let tmp = '';
        let listNumbers = [];
        for (let e = 0; e < el.length; e++){
            tmp += el[e];
            if (el[e] == ' ' || el.length === e +1){
                if(!isNaN(tmp)){
                    listNumbers.push(Number(tmp));
                    tmp = '';
                }
            }
        }
        return listNumbers;
    }
    validateClassicPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a cl `, ``);
        const listNumbers = this.ExtractNumbers(this._el);
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.classicPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validNPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a n `, ``);
        const listNumbers = this.ExtractNumbers(this._el);
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.NPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validRPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a r `, ``);
        const listNumbers = this.ExtractNumbers(this._el);
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.RPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validSPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a s `, ``);
        const listNumbers = this.ExtractNumbers(this._el);
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.SPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
}