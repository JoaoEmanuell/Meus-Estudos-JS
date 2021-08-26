class urlsVerify{
    constructor (men){
        this._men = String(men);
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