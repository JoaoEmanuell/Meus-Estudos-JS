const interval = setInterval(() => {
    main();
}, 10000);

function main(){
    let mens = mensages();
    let area = text_area();
    if (mens.length != 0) {
        
    }else{
    }
}

function mensages(){
    let men = document.querySelectorAll(".oIy2qc");
    return men;
}

function text_area(){
    let area = document.querySelector("textarea");
    return area;
}