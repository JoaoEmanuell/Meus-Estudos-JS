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
    if (isNumber(num.value) && !inLista(num.value, valores)) {
        valores.push(Number(num.value))
        let item = window.document.createElement('option' )
        item.text = `Valor ${num.value} adicionado.`
        lista.appendChild(item)
        console.log(item)
        
    }else{
        window.alert('Valor invalido ou ja encontrado na lista')
    }
    num.value = ''
    num.focus()
    
}