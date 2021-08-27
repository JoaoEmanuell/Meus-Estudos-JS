class publicCommands{
    constructor (el, area, button) {
        this._el = String(el).toLowerCase().trim();
        this._area = area;
        this._button = button;
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
        if (this._el === `${publicPrefix}help` || this._el === `${publicPrefix}h`){
            mensage(this._area, `"${publicPrefix}links" ou " ${publicPrefix}li " : Retorna os links que foram colocados no chat até o exato momento`, this._button);
            mensage(this._area, `"${publicPrefix}help" ou " ${publicPrefix}h " : Retorna esse bloco de comandos`, this._button);
            mensage(this._area, `"${publicPrefix}time" ou " ${publicPrefix}t " : Retorna a quanto segundos estamos na aula!`,this._button);
            setSpanTime(15);
        }
    }

    getLinks(){
        if (this._el === `${publicPrefix}links` || this._el === `${publicPrefix}li`){
            if (links.length != 0){
                links.forEach(link => {
                    mensage(this._area, link, this._button)
                });
                mensage(this._area, "Links de hoje :)", this._button);
            }
            else{
                mensage(this._area, "Nenhum link de frequencia foi disponibilizado ainda!", this._button);
            }
            setSpanTime(15);
        }
    }
    getTime(){
        if (this._el == `${publicPrefix}time` || this._el === `${publicPrefix}t`){
            mensage(this._area, `Estamos aqui a ${time} segundos`, this._button)
            setSpanTime(15);
        }
    }
    setTexToUpperCase(){
        if (this._el.indexOf(`${publicPrefix}upper`) >= 0 || this._el.indexOf(`${publicPrefix}up`) >= 0 ){
            console.log("setTexToUpperCase")
            let text = this._el.replace(`${publicPrefix}upper `, ``)
            text = text.replace(`${publicPrefix}up `, ``);
            mensage(this._area, `${text.toUpperCase()}`, this._button);
            setSpanTime(15);
        }
    }
    setTextToLowerCase(){
        if (this._el.indexOf(`${publicPrefix}lower`) >= 0 || this._el.indexOf(`${publicPrefix}lo`) >= 0 ){
            console.log("setTextToLowerCase")
            let text = this._el.replace(`${publicPrefix}lower `, ``)
            text = text.replace(`${publicPrefix}lo `, ``);
            mensage(this._area, `${text.toLowerCase()}`, this._button);
            setSpanTime(15);
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
            mensage(this._area, text_convert, this._button);
        }
    }
}