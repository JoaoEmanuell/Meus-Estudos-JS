class Math_PA{
   /**
    * ClassicPA returns all terms of a P.A. being written in the form "term, ".
    * @param {Float} a1 First term, float number.
    * @param {Float} r P.A. ratio float number.
    * @param {Int} n Position of the number that will be returned, integer. 
    * @returns Returns all terms of a P.A. being written in the form "term, ".
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
   /**
    * Value of the N term of a P.A.
    * @param {Float} a1 First term, float number.
    * @param {Float} r P.A. ratio float number.
    * @param {Int} n Position of the number that will be returned, integer. 
    * @returns  Returns the value of the term N, this is the value of the term that holds the position N of a
    */
    NPA(a1, r, n){
        this._a1 = a1;
        this._r = r;
        this._n = n - 1;
        return this._a1 + (this._n * this._r);
    }
   /**
    * Ratio of a P.A.
    * @param {Float} a1 First term, float number.
    * @param {Int} an number of terms, integer
    * @param {Float} vf value of the last term, float number.
    * @returns Returns the ratio of a P.A.
    */
    RPA(a1, an, vf){
        this._a1 = a1;
        this._an = an - 1;
        this._vf = vf;
        const r = (this._vf + (-this._a1)) / this._an;
        return r;
    }
   /**
    * Sum of P.A.
    * @param {Float} a1 first term, float number.
    * @param {Float} an Value of the last term, float number.
    * @param {Int} n number of terms, integer.
    * @returns Returns the sum of terms of a P.A.
    */
    SPA(a1, an, n){
        this._a1 = a1;
        this._an = an;
        this._n = n;
        return ((this._a1 + this._an) * this._n) / 2
    }
    /**
     * Number of terms of a P.A.
     * @param {Float} a1 first term, float number.
     * @param {Float} r P.A. ratio float number.
     * @param {Float} an Value of the last term, float number.
     * @returns Number of terms of a P.A.
     */
    NTPA(a1, r, an){
        return (an - a1 + r) / r;
    }
}
/**
 * Class to perform second degree equation
 */
class Math_EQ2{
    /**
     * Calculate a delt value.
     * @param {float} a number corresponding to the letter a 
     * @param {float} b number corresponding to the letter b
     * @param {float} c number corresponding to the letter c
     * @returns {float} the delt value
     */
    delt(a, b, c){
        return (b**2) - (4*(a*c));
    }
    /**
     * Calculate a roots
     * @param {float} a number corresponding to the letter a
     * @param {float} b number corresponding to the letter b
     * @param {float} c number corresponding to the letter c
     * @returns {Array} delt value, x' and x''
     */  
    roots(a, b, c){
        let del = this.delt(a, b, c);
        if (del < 0 || a === 0){
            return [del, 0, 0];
        } else{
            del = Math.sqrt(del);
            const x1 = (-b + del) / (2*a);
            const x2= (-b - del) / (2*a);
            return [del**2, x1, x2];
        }
    }
}

class Math_PG{
    /**
    * ClassicPA returns all terms of a P.G. being written in the form "term, ".
    * @param {Float} a1 First term, float number.
    * @param {Float} q P.G. ratio float number.
    * @param {Int} n Position of the number that will be returned, integer. 
    * @returns Returns all terms of a P.G. being written in the form "term, ".
    */
    classicPG(a1, q, n){
            this._a1 = a1;
            this._q = q;
            this._n = n;
            let tmp = 0;
            var fullPG = '';
            for (let i = this._a1; tmp < this._n; i *= this._q){
                tmp ++;
                fullPG += `${i}, `;
            }
            return fullPG.slice(0, fullPG.length - 2);
        }
    /**
    * Value of the N term of a P.G.
    * @param {Float} a1 First term, float number.
    * @param {Float} q P.G. ratio float number.
    * @param {Int} n Position of the number that will be returned, integer. 
    * @returns  Returns the value of the term N, this is the value of the term that holds the position N of a
    */
    NPG(a1, q, n){
          this._a1 = a1;
          this._q = q;
          this._n = n - 1;
          return this._a1 * (this._q**this._n);
      }
    /**
    * Ratio of a P.G.
    * @param {Float} a1 First term, float number.
    * @param {Float} a2 Second term, float number.
    * @returns Returns the ratio of a P.G.
    */
    RPG(a1, a2){
      return a2/a1
    }
    /**
    * Sum of P.G.
    * @param {Float} a1 first term, float number.
    * @param {Float} q P.G. ratio float number.
    * @param {Int} n number of terms, integer.
    * @returns Returns the sum of terms of a P.G.
    */
    SPG(a1, q, n){
          this._a1 = a1;
          this._q = q;
          this._n = n;
          return this._a1 * ((this._q**this._n)- 1 ) / (this._q - 1);
      }
  }