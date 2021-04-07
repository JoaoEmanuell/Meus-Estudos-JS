//Recursividade
function fatorial(x){
    if (x == 1){
        return 1
    }
    else{
        return x * fatorial(x - 1)
    }
}

console.log(fatorial(5))

/*

De forma geral o fatorial de um numero pode ser calculado a dorma anterior do ex004 ou o fatorial de um numero é igual a ele vezes o fatorial dele - 1

Teste para verificar a extensão nova
*/