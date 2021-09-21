/**
     * Extracts the numbers of the mensage
     * @param {String} el Numbers to extract
     * @returns Array, Valid numbers extracted.
     */
function ExtractNumbers(el){
    let tmp = '';
    let listNumbers = [];
    for (let e = 0; e < el.length; e++){
        tmp += el[e];
        if (el[e] == ' ' || el.length === e +1){
            if(!isNaN(tmp)){
                listNumbers.push(Number(tmp));
                tmp = '';
            }
        }
    }
    return listNumbers;
}