function CategoryValidation(category_object){
    const category_basic = {
        name : String(category_object.name).trim().toUpperCase(),
        slug : String(category_object.slug).trim().toLowerCase().replaceAll(' ', '-')
    }
    const erros = [];

    if(!category_basic.name || typeof category_basic.name.length == undefined || category_basic.name.length == null) {
        erros.push({text : 'Nome inválido'});
    };

    if(!category_basic.slug || typeof category_basic.slug.length == undefined || category_basic.slug.length == null) {
        erros.push({text : 'Slug inválido'});
    };

    if (category_basic.slug.length < 3) {
        erros.push({text : 'Slug muito curto'});
    };

    if (erros.length > 0) {
        return {category : category_basic, erros : erros, status : true};
    }
    return {category : category_basic, erros : erros, status : false};
}

module.exports = CategoryValidation;