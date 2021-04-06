function verificar() {//Função verificar on
    var data = new Date()//variavel da data
    var ano = data.getFullYear()//variavel ano
    var res = window.document.getElementById('foto')//var elemento id 'foto'
    var fano = window.document.getElementById('txtano')// var elemento id 'txtano'
    var img = window.document.createElement('img')//var elemento id 'img'
    img.setAttribute('id', 'imagem')//a id imagem é setada a var img
    if (fano.value.length == 0 || fano.value > ano){//se o numero de digitos de f ano for igual a 0 ou ser superiro ao ano atual
        window.alert('Erro nos dados, por favor tente novamente')//exiba um erro
    }else{//senão
        var fsex = window.document.getElementsByName('radsex')//var recebe os elementos que tem o nome 'radsex'
        var idade = ano - Number(fano.value)// var idade recebe o ano - o fano convertido para valor e colocado de forma numerica
        var gen = ''//var genero é vazia
        if (fsex[0].checked){// caso a caixa fsex 0 esteja marcada
            gen = 'Homem'// var gen recebe homem
            if (idade > 0 && idade < 12){// se idade for superior a 0 e inferior a 12
                //criança
                img.setAttribute('src', 'fotos/homem_criança.jpg')// img recebe o atributo src com a foto
            }else if (idade < 18){// mesma regra para as demais
                //adolecente
                img.setAttribute('src', 'fotos/homem_adolescente.jpg')
            }else if (idade < 60){
                //adulto
                img.setAttribute('src', 'fotos/homem_adulto.jpg')
            }else{
                //idoso
                img.setAttribute('src', 'fotos/homem_idoso.jpg')
            }
        }else{// senão
            gen = 'Mulher'//genero recebe mulher
            if (idade > 0 && idade < 12){// se idade for superior a 0 e inferior a 12
                //criança
                img.setAttribute('src', 'fotos/mulher_criança.jpg')// img recebe o atributo src com a foto
            }else if (idade < 18){// mesma regra para as demais
                //adolecente
                img.setAttribute('src', 'fotos/mulher_adolescente.jpg')
            }else if (idade < 60){
                //adulto
                img.setAttribute('src', 'fotos/mulher_adulta.jpg')
            }else{
                //idoso
                img.setAttribute('src', 'fotos/mulher_idosa.jpg')
            }
        }
        res.style.textAlign = 'center'// isso alinha o estilo de res para centro
        res.innerHTML = `Detectamos ${gen} com ${idade} anos`//mensagem que subistitui res
        res.appendChild(img)//isso faz a imagem ser carregada dinamicamente
    }
}