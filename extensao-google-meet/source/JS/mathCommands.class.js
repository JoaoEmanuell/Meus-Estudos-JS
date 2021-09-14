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
    validateClassicPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a cl `, ``);
        let tmp = '';
        let listNumbers = [];
        for (let e = 0; e < this._el.length; e++){
            tmp += this._el[e];
            if (this._el[e] == ' ' || this._el.length === e +1){
                if(!isNaN(tmp)){
                    listNumbers.push(Number(tmp));
                    tmp = '';
                }
            }
        }
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.classicPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validNPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a n `, ``);
        let tmp = '';
        let listNumbers = [];
        for (let e = 0; e < this._el.length; e++){
            tmp += this._el[e];
            if (this._el[e] == ' ' || this._el.length === e +1){
                if(!isNaN(tmp)){
                    listNumbers.push(Number(tmp));
                    tmp = '';
                }
            }
        }
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.NPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validRPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a r `, ``);
        let tmp = '';
        let listNumbers = [];
        for (let e = 0; e < this._el.length; e++){
            tmp += this._el[e];
            if (this._el[e] == ' ' || this._el.length === e +1){
                if(!isNaN(tmp)){
                    listNumbers.push(Number(tmp));
                    tmp = '';
                }
            }
        }
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.RPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    validSPA(el){
        this._el = String(el).replace(`${mathPrefix}p.a s `, ``);
        let tmp = '';
        let listNumbers = [];
        for (let e = 0; e < this._el.length; e++){
            tmp += this._el[e];
            if (this._el[e] == ' ' || this._el.length === e +1){
                if(!isNaN(tmp)){
                    listNumbers.push(Number(tmp));
                    tmp = '';
                }
            }
        }
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPa = new Math_PA();
            return classPa.SPA(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
}