/**
     * Extracts the numbers of the mensage
     * @param {String} el Numbers to extract
     * @param {String} separate Separate of the numbers
     * @returns Array, Valid numbers extracted.
     */
function ExtractNumbers(el, separate){
    let tmp = '';
    let listNumbers = [];
    for (let e = 0; e < el.length; e++){
        tmp += el[e];
        if (el[e] == separate || el.length === e +1){
            tmp = tmp.replace(separate, '');
            if(!isNaN(tmp)){
                listNumbers.push(Number(tmp));
                tmp = '';
            }
        }
    }
    return listNumbers;
}
/**
 * 
 * @param {Float} rooting rooting, value of the rooting, must be a number greater than or equal to zero, never a negative number.
 * @param {Float} index index value of the root.
 * @returns root value.
 */
function root(rooting, index){
    return Math.pow(rooting, 1.0/index);
}