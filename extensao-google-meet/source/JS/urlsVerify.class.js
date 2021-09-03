var links = [];
class urlsVerify{
    constructor (men){
        this._men = String(men);
        this.main();
    }
/**
 * Main function, check if a link is addable for links list.
 * If link is valid add a links list.
 * Else iginorate this link.
 */
    main(){
        if (this.urlRepetVerify(links)){
            if (this.validURL_Docs_Google()||this.validURL_Forms_Google()){
                links.push(this._men);
                mensage("Link capturado, use !links ou !li para retornar a lista de links disponibilizados hoje\nMensagem automatica");
                console.log(links)
            }
        }
    }
    /**
        * Check if the last message is a url and if this url has already been added to the link list.
        *  @param Array listLinks list links.
        *  @return [Boolean] false if the link is duplicated or true if the link is not duplicated.
    */
    urlRepetVerify(listLinks){
    let iq = 0;
    listLinks.forEach(links => {
        if (links === this._men|| this._men.indexOf(links) >= 0){ iq ++}
    });
    switch (iq){
        case 0:
            return true;
        default:
            return false;
    }
    }
    /**
     * Check if the a group mensage has a https://docs.google.com/forms 
     * It is a not shortened url in google forms.
     * @returns [boolean] 
     */
    validURL_Docs_Google() {
        var pattern = new RegExp('(https:\/\/docs.google.com\/forms)')
        return pattern.test(this._men);
    }
    /**
     * Check if the a group mensage has a https://forms.gle/ 
     * It is a shortened url in google forms.
     * @returns [boolean] 
     */
    validURL_Forms_Google() {
        var pattern = new RegExp('(https:\/\/forms\.gle\/)')
        return pattern.test(this._men);
    }
}