class EQ2{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }

    main(){
        if (this._el.indexOf(`${mathPrefix}eq2`) >= 0){
            mensage(this.validateEq2());
        }
        
    }

    validateEq2(){
        const men = this._el.replace(`${mathPrefix}eq2 `, ``);
        console.log(men)
        const numbers = ExtractNumbers(men);
        console.log(numbers)
        if (numbers.length != 3){
            return "Algum numero invalido foi passado, por favor tente novamente!";
        }else{
            const eq2 = new Math_EQ2;
            const result = eq2.roots(numbers[0], numbers[1], numbers[2])
            return `Δ = ${result[0]}\nX' = ${result[1]}\nX'' = ${result[2]}`;
        }
    }
}