function env(){
    //variaveis de escopo local
    let num = window.document.getElementById('num')
    let res = window.document.getElementById('tab')
    //verificador de erro
    if (num.value.length == 0){
        window.alert('Erro, coloque um numero')
    }
    //nenhum erro detectado
    else{
        //variavel de escopo local converter o num para um value
        let n = Number(num.value)
        //variavel de mutiplicador
        let m = 1
        //execução
        res.innerHTML = ''//serve parar limpar a lista
        for (n; m <= 10; m++){
            let item = window.document.createElement('option')//cria um elemento opition dentro do documento
            item.text = `${n} x ${m} = ${n * m} `//coloca o texto dentro da var intem
            res.appendChild(item)//adiciona a var intem dentro da var res
        }
        
    }
}
