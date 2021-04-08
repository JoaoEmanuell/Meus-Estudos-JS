let num = window.document.getElementById('num')
let lista = window.document.getElementById('lista')
let res = window.document.getElementById('res')
var valores = []

function isNumber(n){
    if (Number(n) >= 1 && Number(n) <= 100)
    return true
    else{
        return false
    }
}

function inLista(n, l){
    if (l.indexOf(Number(n)) != -1){
        return true
    } else{
        return false
    }
}

function add(){
    res.innerHTML = ''
    if (isNumber(num.value) && !inLista(num.value, valores)) {
        valores.push(Number(num.value))
        let item = window.document.createElement('option' )
        item.text = `Valor ${num.value} adicionado.`
        lista.appendChild(item)
        console.log(item)
        
    }else{
        window.alert('Valor invalido ou foi encontrado na lista')
    }
    num.value = ''
    num.focus()//focus serve para fazer o cursor focar aquela posição
}

function fim(){
    if (valores.length == 0){
        window.alert('Erro, coloque algum numero')
    }
    else if (valores.length == 1){
        res.innerHTML += `<br>Essa lista tem ${valores.length} valor <br><br>`
        res.innerHTML += `O maior valor é ${valores}<br><br>`
        res.innerHTML += `Somando os valore temos ${valores}<br><br>`
        res.innerHTML += `A media dos valores é ${valores}<br><br>`
    }
    else{
        res.innerHTML += `<p>Essa lista tem ${valores.length} valores</p>`

        let maior = valores[0]
        let menor = valores[0]
        for (c in valores){
            if (valores[c] > maior){
                maior = valores[c]
            }else if (valores[c] < menor){
                menor = valores[c]
            }
        }

        res.innerHTML += `<p>O maior valor é ${maior}</p>`

        res.innerHTML += `<p>O menor valor é ${menor}</p>`

        let soma = 0
        for (c in valores){
            soma += valores[c]
        }

        res.innerHTML += `<p>A soma entre todos os valores é ${soma}</p>`

        let media = soma / valores.length

        res.innerHTML += `<p>A media entre os valores é ${media}</p>`
    }
}