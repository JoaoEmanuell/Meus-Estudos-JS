function user_validation(user_obj){
    const user_basic = {
        name : String(user_obj.name).trim().toLowerCase().replaceAll(' ', '-'),
        email : String(user_obj.email).trim().toLowerCase().replaceAll(' ', '-'),
        password : String(user_obj.password).trim(),
        confirm_password : String(user_obj.confirm_password).trim()
    }
    const erros = []
    if (!user_basic.name || user_basic.name.length < 3){
        erros.push({text : 'Nome invalido!'});
    }
    if (!user_basic.email){
        erros.push({text : 'Email invalido'})
    }
    if (!user_basic.password || user_basic.password.length < 8){
        erros.push({text : 'Senha invalida'})
    }
    if (user_basic.password != user_basic.confirm_password || !user_basic.confirm_password){
        erros.push({text : 'Senhas não conferem'})
    }
    if (erros.length == 0){
        return {'status' : false, 'user' : user_basic};
    }
    return {'status' : true, 'erros' : erros};
}

module.exports = user_validation;