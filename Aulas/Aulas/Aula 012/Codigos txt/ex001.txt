var idade = 15
console.log(`Você tem ${idade} anos`)
if (idade < 16) {
    console.log('Não vota')
}else{
    if (idade < 18 || idade >= 65){//o pipe (||) serve como a palavra "or"
        console.log('Voto opcional')
    }
    else{(idade => 18)
        console.log('Voto obrigatorio')
    }
}