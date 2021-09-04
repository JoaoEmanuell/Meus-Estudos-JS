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
        this.setSilence();
        
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
            const help = new SudoHelp();
        }
    }
    links(){
        if (this._el === `${sudoPrefix}links`){
            const publiccommands = new publicCommands(this._el.replace("¬", "!"));
            span_time = 0;
        }
    }
    setSilence(){
        if (this._el.indexOf(`${sudoPrefix}setsilence`) >= 0){
            const men = this._el.replace(`${sudoPrefix}setsilence `, ``);
            switch (men){
                case "on":
                    silence = true;
                    mensage("Extensão sendo executada em modo silencioso.");
                    break;
                case "off":
                    silence = false;
                    mensage("Extensão sendo executada em modo normal.");
                    break;
            }
        }
    }
}

class SudoHelp{
    constructor(){
        this.main();
    }
    main(){
        mensage("Os comandos de permissão de administrador foram enviados para o console!");
            console.log(`${sudoPrefix}disable : desabilita a execução da extensão.`);
            console.log(`${sudoPrefix}enable : habilita a execução da extensão.`);
            console.log(`${sudoPrefix}remove : remove o ultimo link que está na lista de links.`);
            console.log(`${sudoPrefix}help : exibe esse quadro de ajuda.`);
            console.log(`${sudoPrefix}links : Exibe no chat os links colocados e seta o spantime para 0`);
            console.log(`${sudoPrefix}setsilence : recebe o paramentro on ou off, caso seja on a extensão irá executar em modo silencioso, isso é quando ela capturar os links ela não irá exibir mensagens, caso seja off ela irá exibir mensagens normalmente.`);
    }
}