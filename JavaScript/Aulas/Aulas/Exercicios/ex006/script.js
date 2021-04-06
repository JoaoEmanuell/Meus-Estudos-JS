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
            let item = window.document.createElement('option')
            item.text = `${n} x ${m} = ${n * m} `
            res.appendChild(item)
        }
        
    }
}