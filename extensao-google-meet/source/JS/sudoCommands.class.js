class sudoCommands{
    constructor (el, area, button){
        this._el = String(el).toLowerCase().trim();
        this._area = area;
        this._button = button;
    }
    main(){
        //verificate if your name is a sudo name

    if (names() === 'Você'){

        this.disable();
        this.enable();
        this.remove();
        this.help();
        
    } else if(this._el[0] === sudoPrefix){
        mensage(this._area, `Desculpe ${names()} mas você não tem permisão para usar comandos de administrador da extensão :/`, this._button);
    }
    }

    disable(){
        if (this._el === `${sudoPrefix}disable`){
            mensage(this._area, "Extensão desabilitada!", this._button)
            isAbilite = false;
        }
    }
    enable(){
        if (this._el === `${sudoPrefix}enable`){
            mensage(this._area, "Extensão habilitada!", this._button)
            isAbilite = true;
        }
    }
    remove(){
        if (this._el === `${sudoPrefix}remove`){
            links.pop();
            mensage(this._area, "Ultimo Link removido!", this._button)
        }
    }
    help(){
        if (this._el === `${sudoPrefix}help`){
            mensage(this._area, "Os comandos de permissão de administrador foram enviados para o console de log!", this._button);
            console.log(`${sudoPrefix}disable : desabilita a execução da extensão.`);
            console.log(`${sudoPrefix}enable : habilita a execução da extensão.`);
            console.log(`${sudoPrefix}remove : remove o ultimo link que está na lista de links.`);
            console.log(`${sudoPrefix}help : exibe esse quadro de ajuda.`)
        }
    }
}