const publicPrefix = `!`
class publicCommands{
    constructor (el) {
        this._el = String(el).toLowerCase().trim();
        this.main();
    }

    main(){
        this.getHelp();
        this.getLinks();
        this.getTime();
        this.setTexToUpperCase();
        this.setTextToLowerCase();
        this.setTextToUpperCaseAndLowerCase();
    }
    // Local Methods
    getHelp(){
        if (validHelp(this._el)){
            const help = new helpPublicCommands(this._el);
        }
        function validHelp(men) {
            const help = new RegExp(`^(${publicPrefix}help)`);
            const simplHelp = new RegExp(`^(${publicPrefix}h)`)
            if (help.test(men) || simplHelp.test(men)) { return true; }
            else { return false; }
        }
    }

    getLinks(){
        if (this._el === `${publicPrefix}links` || this._el === `${publicPrefix}li`){
            if (links.length != 0){
                links.forEach(link => {
                    mensage(link)
                });
                mensage("Links de hoje :)");
            }
            else{
                mensage("Nenhum link de frequencia foi disponibilizado ainda!");
            }
            setSpanTime(15);
        }
    }
    getTime(){
        if (this._el == `${publicPrefix}time` || this._el === `${publicPrefix}t`){
            mensage(`Estamos aqui a ${time} segundos`)
            setSpanTime(15);
        }
    }
    setTexToUpperCase(){
        if (this._el.indexOf(`${publicPrefix}upper`) >= 0 || this._el.indexOf(`${publicPrefix}up`) >= 0 ){
            console.log("setTexToUpperCase")
            let text = this._el.replace(`${publicPrefix}upper `, ``)
            text = text.replace(`${publicPrefix}up `, ``);
            mensage(`${text.toUpperCase()}`);
            setSpanTime(5);
        }
    }
    setTextToLowerCase(){
        if (this._el.indexOf(`${publicPrefix}lower`) >= 0 || this._el.indexOf(`${publicPrefix}lo`) >= 0 ){
            console.log("setTextToLowerCase")
            let text = this._el.replace(`${publicPrefix}lower `, ``)
            text = text.replace(`${publicPrefix}lo `, ``);
            mensage(`${text.toLowerCase()}`);
            setSpanTime(5);
        }
    }
    setTextToUpperCaseAndLowerCase(){
        if (this._el.indexOf(`${publicPrefix}lp`) >= 0){
            this._el = this._el.replace(`${publicPrefix}upperlower `, ``);
            this._el = this._el.replace(`${publicPrefix}lp `, ``);
            let letter = 0;
            let text_convert = '';
            while (letter != this._el.length){
                const div = (letter % 2);
                if (div === 0){
                    text_convert += this._el[letter].toUpperCase();
                } else if(div === 1){
                    text_convert += this._el[letter].toLowerCase();
                }
                letter ++;
            }
            mensage(text_convert);
            setSpanTime(5);
        }
    }
}

class helpPublicCommands{
    constructor (el){
        this._el = String(el).toLowerCase().replace(`${publicPrefix}help `, '').replace(`${publicPrefix}h `, '');
        this.main();
    }
    main(){
        switch (this._el){
            case "1":
                this.pag1();
                break;
            case "2":
                this.pag2();
                break;
            default:
                mensage(`Pagina invalida, digite ${publicPrefix}help pagina ou ${publicPrefix}h pagina, as paginas vão até a pagina numero 2`);
            setSpanTime(5);
        }
    }

    pag1(){
        mensage(`"${publicPrefix}links" ou " ${publicPrefix}li " : Retorna os links que foram colocados no chat até o exato momento`);
        mensage(`"${publicPrefix}help" ou " ${publicPrefix}h " : Retorna esse bloco de comandos`);
        mensage(`"${publicPrefix}time" ou " ${publicPrefix}t " : Retorna a quanto segundos estamos na aula!`);
        setSpanTime(15);
    } 
    pag2(){
        mensage(`"${publicPrefix}upper texto" ou " ${publicPrefix}up texto" : retorna o texto inserido em letras maiúsculas.`)
        mensage(`"${publicPrefix}lower texto" ou " ${publicPrefix}lo texto" : retorna o texto inserido em letras minúsculas.`)
        mensage(`"${publicPrefix}lp texto" : retorna o texto inserido em uma letra maiscula e outra minuscula, exemplo "ExEmPlO"`)
        setSpanTime(15);
    }
}