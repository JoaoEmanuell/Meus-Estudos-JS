class Math_PA{
    /*
    * Retorna todos os termos de uma P.A. sendo escritos de forma "termo, ".
    * a1 = Primeiro termo, numero float.
    * r = Razão da P.A. numero float.
    * n = Posição do numero que será retornado, numero inteiro.
    */
    classicPA(a1, r, n){
        this._a1 = a1;
        this._r = r;
        this._n = n;
        let tmp = 0;
        var fullPA = '';
        for (let i = this._a1; tmp < this._n; i += this._r){
            tmp ++;
            fullPA += `${i}, `;
        }
        return fullPA.slice(0, fullPA.length - 2);;
    }
    /*
    * Valor do termo N de uma P.A.
    * Retorna o valor do termo N, isso é o valor do termo que detem a posição N de uma 
    P.A
    * a1 = Primeiro termo, numero float.
    * r = Razão da P.A. numero float.
    * n = Posição do numero que será retornado, numero inteiro.
    */
    NPA(a1, r, n){
        this._a1 = a1;
        this._r = r;
        this._n = n - 1;
        return this._a1 + (this._n * this._r);
    }
    /*
    * Razão de P.A.
    * Retorna a razão de uma P.A.
    * a1 = Primeiro termo, numero float.
    * an = numero de termos, numero inteiro
    * vf = valor do ultimo termo, numero float.
    */
    RPA(a1, an, vf){
        this._a1 = a1;
        this._an = an - 1;
        this._vf = vf;
        const r = (this._vf + (-this._a1)) / this._an;
        return r;
    }
    /*
    * Soma de P.A.
    * Retorna a soma dos termos de uma P.A.
    * a1 = primeiro termo, numero float.
    * an = Valor do ultimo termo, numero float.
    * n = numero de termos, numero inteiro.
    */
    SPA(a1, an, n){
        this._a1 = a1;
        this._an = an;
        this._n = n;
        return ((this._a1 + this._an) * this._n) / 2
    }
}