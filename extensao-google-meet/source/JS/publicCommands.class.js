const publicPrefix = `!`
/**
 * Execute all public commands.
 */
class publicCommands{
    /**
     * constructor publicCommands, call the main method
     * @param {String} el last mensage sent in chat
     */
    constructor (el) {
        this._el = String(el).toLowerCase().trim();
        this.main();
    }
/**
 * main method, call all methods.
 */
    main(){
        this.getHelp();
        this.getLinks();
        this.getTime();
        this.setTexToUpperCase();
        this.setTextToLowerCase();
        this.setTextToUpperCaseAndLowerCase();
        this.getJoker();
    }
    // Local Methods
    /**
     * get Help, check if mensage is a help mensage, if is true call the helpPublicCommands class
     */
    getHelp(){
        if (this._el.indexOf(`${publicPrefix}help`) === 0 || this._el.indexOf(`${publicPrefix}h`) === 0 ){
            const help = new helpPublicCommands(this._el);
        }
    }
/**
 * get Links, check if message is a get link message, if is true send a links list.
 * else send a mensage.
 */
    getLinks(){
        if (this._el === `${publicPrefix}links` || this._el === `${publicPrefix}li`){
            let preText = '';
            if (links.length != 0){
                links.forEach(link => {
                    preText += `${link}\n`
                });
                mensage(`${preText}\nLinks de hoje :)`);
            }
            else{
                mensage("Nenhum link de frequencia foi disponibilizado ainda!");
            }
            setSpanTime(15);
        }
    }
    /**
     * get Time, if a last message is a getTime message, send the time.
     */
    getTime(){
        if (this._el == `${publicPrefix}time` || this._el === `${publicPrefix}t`){
            mensage(`Estamos aqui a ${time} segundos`)
            setSpanTime(15);
        }
    }
    /**
     * set Tex To UpperCase, check if a last message is a setTexToUpperCase, if is true return the text in full uppercase.
     */
    setTexToUpperCase(){
        if (this._el.indexOf(`${publicPrefix}upper`) >= 0 || this._el.indexOf(`${publicPrefix}up`) >= 0 ){
            console.log("setTexToUpperCase")
            let text = this._el.replace(`${publicPrefix}upper `, ``)
            text = text.replace(`${publicPrefix}up `, ``);
            mensage(`${text.toUpperCase()}`);
            setSpanTime(5);
        }
    }
    /**
     * set Text To LowerCase, check if a last message is a setTextToLowerCase, if is true return the text in full lowercase.
     */
    setTextToLowerCase(){
        if (this._el.indexOf(`${publicPrefix}lower`) >= 0 || this._el.indexOf(`${publicPrefix}lo`) >= 0 ){
            console.log("setTextToLowerCase")
            let text = this._el.replace(`${publicPrefix}lower `, ``)
            text = text.replace(`${publicPrefix}lo `, ``);
            mensage(`${text.toLowerCase()}`);
            setSpanTime(5);
        }
    }
    /**
     * set Text To UpperCase And LowerCase, check if a last message is a setTextToUpperCaseAndLowerCase, if is true return the text in a char "A" and char "b".
     * 
     * Exemple : "Hello World" => "HeLlO WoRlD".
     */
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
    getJoker(){
        if (this._el === `${publicPrefix}joker` || this._el === `${publicPrefix}jk` || this._el === `${publicPrefix}piada` || this._el === `${publicPrefix}pi`){
            const joker = new jokes();
            //setSpanTime(20);
        }
    }
}

/**
 * Return a help for public commands
 */
class helpPublicCommands{
    /**
     * Replace *el* and to remove publicPrefixhelp or publicPrefixh leaving only the page number .
     * 
     * Call main.
     * @param {String} el last message sent in the chat.
     */
    constructor (el){
        this._el = String(el).toLowerCase().replace(`${publicPrefix}help `, '').replace(`${publicPrefix}h `, '');
        this.main();
    }
    /**
     * Main method, check if is a valid number, if is true, call the page corresponding to this number, else sent an invalid message.
     */
    main(){
        switch (this._el){
            case "1":
                this.pag1();
                break;
            case "2":
                this.pag2();
                break;
            default:
                mensage(`Pagina invalida, digite "${publicPrefix}help pagina" ou "${publicPrefix}h pagina", as paginas vão até a pagina numero 2`);
            setSpanTime(3);
        }
    }
    /**
     * page 1 for help.
     */
    pag1(){
        mensage(`"${publicPrefix}links" ou " ${publicPrefix}li " : Retorna os links que foram colocados no chat até o exato momento
        \n"${publicPrefix}help" ou " ${publicPrefix}h " : Retorna esse bloco de comandos mensagem
        \n"${publicPrefix}time" ou " ${publicPrefix}t " : Retorna a quanto segundos estamos na aula!`);
        setSpanTime(15);
    } 
    /**
     * page 2 for help.
     */
    pag2(){
        mensage(`"${publicPrefix}upper texto" ou " ${publicPrefix}up texto" : retorna o texto inserido em letras maiúsculas.
        \n"${publicPrefix}lower texto" ou " ${publicPrefix}lo texto" : retorna o texto inserido em letras minúsculas.
        \n"${publicPrefix}lp texto" : retorna o texto inserido em uma letra maiscula e outra minuscula, exemplo "ExEmPlO"`);
        setSpanTime(15);
    }
}