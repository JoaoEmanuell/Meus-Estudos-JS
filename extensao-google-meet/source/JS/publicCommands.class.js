class publicCommands{
    constructor (el, area, button) {
        this._el = String(el).toLowerCase().trim();
        this._area = area;
        this._button = button;
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
                links.forEach(element => {
                    mensage(this._area, element, this._button)
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
}