function carregar() {//Assim que o corpo da pagina carregar essa função sera ativada
    var msg = window.document.getElementById('msg')// crie uma var chamada msg que ira pegar o elemento com a id 'msg'
    var img = window.document.getElementById('imagen')// crie uma var chamada imagen que ira pegar o elemento com a id 'imagen'
    var bom = window.document.getElementById('bom')
    var data = new Date()//crie uma var chamada data que recebe a new Date()
    var hora = data.getHours()//crie uma var chamada hora que recebe a data.getHours()
    msg.innerHTML = `Agora são ${hora} horas \n`//Modifique a msg
    if (hora >= 0 && hora < 12) {// se a hora for superior a 0 e inferior a 12
        //Bom dia
        img.src = 'imagens/Manha.jpg'//comando para alterar a imagen da tag img
        bom.innerHTML = 'Bom dia'
        document.body.style.background = 'rgb(255,230,113)'//essa linha altera o estilo do fundo do corpo para a cor desejada
    }
    else if (hora >= 12 && hora < 18) {//se a hora for superior a 12 e inferior a 18
        //Boa tarde
        img.src = 'imagens/tarde.jpg'//aletere a imagen da tag img
        bom.innerHTML = `Boa tarde`
        document.body.style.background = 'rgb(253,195,111)'
    }
    else {// se a hora não for nenhuma das indicadas
        //Boa noite
        img.src = 'imagens/noite.jpg'// aletere a imagen ta tag img
        bom.innerHTML = 'Boa noite'
        document.body.style.background = 'rgb(68,95,102)'
    }
}