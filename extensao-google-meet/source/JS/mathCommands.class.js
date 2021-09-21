const mathPrefix = `+`;

class mathCommands{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }
    main(){
        // PA
        const pa = new PA(this._el);
        // EQ 2
        const eq2 = new EQ2(this._el);
        // HELP
        const help = new helpMath(this._el);
    }
}

class helpMath{
    constructor(el){
        this._el = String(el).toLowerCase();
        if (this._el.indexOf(`${mathPrefix}help`) === 0 || this._el.indexOf(`${mathPrefix}h`) === 0 ){
            this._el = String(el).toLowerCase().replace(`${mathPrefix}help `, '').replace(`${mathPrefix}h `, '');
            this.main();
        }
    }
    main(){
            switch (this._el){
                case "1":
                    this.pag1();
                    break;
                case "2":
                    this.pag2();
                    break;
                case "3":
                    this.pag3();
                    break;
                default:
                    mensage(`Pagina invalida, digite "${mathPrefix}help pagina" ou "${mathPrefix}h pagina", as paginas vão até a pagina numero 3`);
                    setSpanTime(3);
            }
    }
    // Pages

    pag1(){
        mensage(`"${mathPrefix}p.a cl primeiro-numero razão numero-de-termos" retorna uma p.a classica, escrevendo todos os termos possiveis. Exemplo: "${mathPrefix}p.a cl 2 2 10" => "2, 4, 6...\n"${mathPrefix}p.a n primeiro-numero razão numero-do-ultimo-termo" retorna o valor do ultimo termo da p.a. Exemplo: "${mathPrefix}p.a n 2 2 10" => 20`)
        setSpanTime(15)
    }
    pag2(){
        mensage(`"${mathPrefix}p.a r primeiro-numero numero-de-termos valor-do-ultimo-termo" retorna a razão da P.A Exemplo: "${mathPrefix}p.a r 2 10 20" => 2\n"${mathPrefix}p.a s primeiro-termo valor-do-ultimo-termo numero-de-termos" Retorna a soma dos termos de uma P.A Exemplo: "${mathPrefix}p.a s 2 20 10"`);
        setSpanTime(15)
    }
    pag3(){
        mensage(`"${mathPrefix}eq2 a b c" retorna o delta, x' e x'' de uma equação do segundo grau, subistitua as letras pelos valores na hora de colocar.`)
        setSpanTime(15)
    }
}