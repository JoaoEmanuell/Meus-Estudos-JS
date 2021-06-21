function env(){
    var element_a = window.document.getElementById('element_a')
    var element_b = window.document.getElementById("element_b")
    var element_c = window.document.getElementById("element_c")
    element_a = element_a.value
    element_b = element_b.value
    element_c = element_c.value
    var raizess = raizes(element_a, element_b, element_c)
    console.log(raizess)
    let del = window.document.getElementById('delta')
    let delt = delta(element_a, element_b, element_c)
    let x1 = window.document.getElementById('x1')
    let x2 = window.document.getElementById('x2')
    if (raizess === 999){
        del.innerHTML = `Delta é igual a ${delt}, portanto a equação não possui raizes reais.`
        x1.innerHTML = ""
        x2.innerHTML = ""
    }
    else{
        del.innerHTML = `Delta = ${delt}`
        x1.innerHTML = `X' = ${Math.round(raizess[0])}`
        x2.innerHTML = `X'' = ${Math.round(raizess[1])}`
    }
}



function raizes(a, b, c){
    let delt = delta(a, b, c)
    if (delt < 0){
        console.log(`Delta é igual a ${delt}, portanto a equação não possui raizes reais.`)
        return 999
    }
    else{
        delt = Math.sqrt(delta(a, b, c))
        if (a < 0){
            var divisor = 2 * (-a)
        }
        else{
            var divisor = 2 * a
        }
        if (b < 0){
            var x1 = Math.abs(b)
            var x2 = x1
        }
        else{
            var x1 = (-b)
            var x2 = x1
        }
        x1 = x1 += delt
        x2 = x2 -= delt
        let final_x1 = x1 / divisor
        let final_x2 = x2 / divisor
        let x1_x2 = [(final_x1), (final_x2)]
        return x1_x2
    }
}

function delta(a, b, c){
    let b2 = Math.abs(Math.pow(b, 2)) //b²
    let a_x_c = a * c // a * c
    let axc_x_4 = -4 * a_x_c // 4 * (a * c)
    let end = b2 - (-axc_x_4) // b² - [4 * (a * c)]
    return end
}
