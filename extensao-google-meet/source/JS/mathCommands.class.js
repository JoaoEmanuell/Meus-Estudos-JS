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
    /**
     * Extracts the numbers of the mensage
     * @param {String} el Numbers to extract
     * @returns Array, Valid numbers extracted.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the numbers of a P.A, must be informed a1 = value of the first term, r = ratio, an = last term.
     * @param {String} el String
     * @returns if the message informs the parameters correctly it will return to P.A if not it will not return an error message.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the value of the informed term of a P.A, must be informed a1 = value of the first term, r = reason, an = term that you want to know the value.
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the value of the term informed P.A otherwise it will return an error message.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the value of the ratio of a P.A, must be informed a1 = value of the first term, an = number of terms, vf = value of the last term.
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the P.A reason otherwise it will return an error message.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the sum of the values of a P.A, must be informed a1 = value of the first term, an = value of the last term, n number of terms
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the sum of the P.A otherwise it will return an error message.
    */
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