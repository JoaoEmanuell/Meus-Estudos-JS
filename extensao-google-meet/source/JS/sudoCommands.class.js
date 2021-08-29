const sudoPrefix = `¬`
var isAbilite = true;
class sudoCommands{
    constructor (el){
        this._el = String(el).toLowerCase().trim();
        this.main();
    }
    main(){
        //verificate if your name is a sudo name

    if (names() === 'Você'){

        this.disable();
        this.enable();
        this.remove();
        this.help();
        this.links();
        
    } else if(this._el[0] === sudoPrefix){
        mensage(`Desculpe ${names()} mas você não tem permisão para usar comandos de administrador da extensão :/`);
    }
    }

    disable(){
        if (this._el === `${sudoPrefix}disable`){
            mensage("Extensão desabilitada!")
            isAbilite = false;
        }
    }
    enable(){
        if (this._el === `${sudoPrefix}enable`){
            mensage("Extensão habilitada!")
            isAbilite = true;
        }
    }
    remove(){
        if (this._el === `${sudoPrefix}remove`){
            links.pop();
            mensage("Ultimo Link removido!")
        }
    }
    help(){
        if (this._el === `${sudoPrefix}help`){
            mensage("Os comandos de permissão de administrador foram enviados para o console de log!");
            console.log(`${sudoPrefix}disable : desabilita a execução da extensão.`);
            console.log(`${sudoPrefix}enable : habilita a execução da extensão.`);
            console.log(`${sudoPrefix}remove : remove o ultimo link que está na lista de links.`);
            console.log(`${sudoPrefix}help : exibe esse quadro de ajuda.`)
        }
    }
    links(){
        if (this._el === `${sudoPrefix}links`){
            const publiccommands = new publicCommands(this._el.replace("¬", "!"));
            span_time = 0;
        }
    }
}