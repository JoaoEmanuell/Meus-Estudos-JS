function env(){
    //let é uma variavel de escopo local
    //recebem os elementos
    let ini = window.document.getElementById('ini')//pega o elemento com a id ini e converte para value
    let fim = window.document.getElementById('fim')//pega o elemento com a id fim e converte para value
    let passo = window.document.getElementById('passo')//pega o elemento com a id passo e converte para value
    res = window.document.getElementById('res')//Pega o elemento com a id res
    
    
    //verificação de erros
    if (ini.value.length == 0 || fim.value.length == 0){
        window.alert('Erro')
    }
    
    if (passo.value.length == 0 || passo.value < 0 || passo.value > fim.value){
        window.alert('Passo esta vazio ou é inferior a zero ou é superiror ao fim, passo sera considerado como 1')
        var p = 1
    
    }else{
        var p = Number(passo.value)}
        res.innerHTML = 'Contando '
        let i = Number(ini.value)
        let f = Number(fim.value)
    
    
    
    //Execução da p.a
    
    for (let c = i; c <= f; c += p){
        res.innerHTML += `${c} `
    }  
    res.innerHTML += 'Fim?'
}