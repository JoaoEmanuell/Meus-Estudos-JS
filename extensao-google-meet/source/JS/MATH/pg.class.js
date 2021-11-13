class PG{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }
    main(){
        // P.G
        if (this._el.indexOf(`${mathPrefix}p.g`) >= 0){

            const men = this._el.replace(`${mathPrefix}p.g `, ``);

            const pg_dict = {cl : this.validateClassicPG(this._el), n : this.validNPG(this._el), q : this.validRPG(this._el), s : this.validSPG(this._el)};

            for (const key in pg_dict){ if (men.indexOf(key) >= 0){ mensage(pg_dict[key]); break;}}

        }
    }
    // Validates
    
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the numbers of a P.G, must be informed a1 = value of the first term, q = ratio, an = last term.
     * @param {String} el String
     * @returns if the message informs the parameters correctly it will return to P.G if not it will not return an error message.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the value of the informed term of a P.G, must be informed a1 = value of the first term, q = reason, an = term that you want to know the value.
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the value of the term informed P.G otherwise it will return an error message.
     */
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
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the value of the ratio of a P.A, must be informed a1 = value of the first term, a2 = value of the second term.
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the P.G reason otherwise it will return an error message.
     */
    validRPG(el){
        this._el = String(el).replace(`${mathPrefix}p.g q `, ``);
        const listNumbers = ExtractNumbers(this._el, ' ');
        if (listNumbers.length != 3){
            return `Algum numero invalido foi passado, tente novamente!`;
        } else{
            const classPg = new Math_PG();
            return classPg.RPG(listNumbers[0], listNumbers[1], listNumbers[2]);
        }
    }
    /**
     * Checks if the string has valid numbers to perform an operation that aims to return the sum of the values of a P.G, must be informed a1 = value of the first term, q = ratio, n number of terms
    * @param {String} el String
    * @returns if the message informs the parameters correctly it will return the sum of the P.G otherwise it will return an error message.
    */
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