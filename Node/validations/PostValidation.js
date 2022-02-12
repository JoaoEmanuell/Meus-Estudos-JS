function PostValidation(post_object){
    const post_basic = {
        title : String(post_object.title).trim().toUpperCase(),
        slug : String(post_object.slug).trim().toLowerCase().replaceAll(' ', '-'),
        category : String(post_object.category).trim().toLowerCase(),
        descb : String(post_object.descb).trim().toLowerCase(),
        content : String(post_object.content).trim().toLowerCase(),
    }
    const erros = [];

    if(!post_basic.title || typeof post_basic.title.length == undefined || post_basic.title.length == null) {
        erros.push({text : 'Nome inválido'});
    };

    if(!post_basic.slug || typeof post_basic.slug.length == undefined || post_basic.slug.length == null) {
        erros.push({text : 'Slug inválido'});
    };

    if (post_basic.slug.length < 3) {
        erros.push({text : 'Slug muito curto'});
    };

    if (post_basic.descb.length < 5){
        erros.push({text : 'Descrição muito curta'});
    }

    if (post_basic.content.length < 5){
        erros.push({text : 'Conteudo muito curto'});
    }

    if (erros.length > 0) {
        return {post : post_basic, erros : erros, status : true};
    }
    return {post : post_basic, erros : erros, status : false};
}

module.exports = PostValidation;