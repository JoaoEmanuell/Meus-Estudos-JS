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
        res.innerHTML = ''
        for (n; m <= 10; m++){
            let item = window.document.createElement('option')//let item cria um elemento opition do documento
            item.text = `${n} x ${m} = ${n * m} `//item.text adiciona texto ao elemento
            res.appendChild(item)//faça com que o intem seja implementado dentro de res
        }
        
    }
}