class urlsVerify{
    constructor (men, area, button){
        this._men = String(men);
        this._area = area;
        this._button = button;
    }

    main(){
        if (this.urlRepetVerify(links)){
            if (this.validURL_Docs_Google()||this.validURL_Forms_Google(this._men)){
                links.push(this._men);
                mensage(this._area, "Link capturado, use !links ou !li para retornar a lista de links disponibilizados hoje!", this._button);
                mensage(this._area, "Mensagem automatica.", this._button);
                console.log(links)
            }
        }
    }
    urlRepetVerify(listLinks){
    let iq = 0;
    listLinks.forEach(links => {
        if (links === this._men){ iq ++}
    });
    if (iq != 0){
        return false;
    } else{
        return true;
    }
    }

    validURL_Docs_Google() {
        var pattern = new RegExp('(https:\/\/docs.google.com\/forms)')
        return pattern.test(this._men);
    }

    validURL_Forms_Google() {
        var pattern = new RegExp('(https:\/\/forms\.gle\/)')
        return pattern.test(this._men);
    }
}