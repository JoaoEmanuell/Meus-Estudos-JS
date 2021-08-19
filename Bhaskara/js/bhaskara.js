function env(){
    var element_a = window.document.getElementById('element_a')
    var element_b = window.document.getElementById("element_b")
    var element_c = window.document.getElementById("element_c")
    element_a = element_a.value
    element_b = element_b.value
    element_c = element_c.value
    let del = window.document.getElementById('delta')
    let delt = delta(element_a, element_b, element_c)
    let x1 = window.document.getElementById('x1')
    let x2 = window.document.getElementById('x2');
    
    if (element_a == 0 && element_b == 0 && element_c == 0){
        del.innerHTML = `Δ = 0`
        x1.innerHTML = `X' = 0`
        x2.innerHTML = `X'' = 0`
    } else {
        var raizess = raizes(element_a, element_b, element_c)
        console.log(raizess)
        if (raizess[0] < 0){
            del.innerHTML = `Delta é igual a ${raizess[0]}, portanto a equação não possui raizes reais.`
            x1.innerHTML = ""
            x2.innerHTML = ""
        }
        else if (Number.isInteger(raizess[1])){
            del.innerHTML = `Δ = ${delt}`
            x1.innerHTML = `X' = ${raizess[1]}`
            x2.innerHTML = `X'' = ${raizess[2]}`
        } else{
            del.innerHTML = `Δ = ${delt}`
            x1.innerHTML = `X' ≈ ${Math.round(raizess[1])}`
            x2.innerHTML = `X'' ≈ ${Math.round(raizess[2])}`
        }
    }
}

function raizes(a, b, c){
    let delt = delta(a, b, c)
    if (delt < 0){
        console.log(`Delta é igual a ${delt}, portanto a equação não possui raizes reais.`)
        return [delt, 0, 0]
    }
    else{
        delt = Math.sqrt(delta(a, b, c))
        let x1 = (-b + delt) / (2*a)
        let x2 = (-b - delt) / (2*a)
        return [delt, x1, x2]
    }
}

function delta(a, b, c){
    return (b**2) - (4*a*c); 
}
