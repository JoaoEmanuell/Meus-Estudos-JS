var isAbilite = true;
var links = [];
var time = 0;
var span_time = 0;
const sudoPrefix = `¬`
const publicPrefix = `!`
const interval = setInterval(() => {
    main();
    time ++;
}, 1000);

function main(){
    let mens = getMensages();
    let area = getText_area();
    let button = getMensage_button();
    if (mens.length != 0) {
        // Last Mensage
        let el = $(mens[mens.length - 1]).text();
        //sudo commands
        if (String(el)[0] === sudoPrefix){
            SC(el, area, button);
        }
            

        if (isAbilite){

            // public commands
            if (String(el)[0] === publicPrefix && span_time >= time){
                mensage(area, `Por favor espere mais ${span_time - time} segundos para chamar o comando novamente`, button)
            } else if (String(el)[0] === publicPrefix){
                PC(el, area, button);
            }
            // add Url
            addUrl(el, area, button);
        }
    }
}

//FUNCTIONS

function getMensages(){
    let men = document.querySelectorAll(".oIy2qc");
    return men;
}

function getText_area(){
    let area = document.querySelector("textarea");
    return area;
}

function getMensage_button(){
    let button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd");
    return button[0];
}

function names(){
    let nameees = document.querySelectorAll(".YTbUzc");
    let lastname = $(nameees[nameees.length - 1]).text();
    return lastname;
}

function sendMensage(button){
    button.removeAttribute("disabled");
    $(button).click();
}

function mensage(area, mensage, button){
    $(area).val(mensage);
    sendMensage(button)
}
// Sudo Commands

function SC(el, area, button){
    const sudocommands = new sudoCommands(el, area, button);
    sudocommands.main();
}

// Public Commands

function PC(el, area, button){
    const publicCommnds = new publicCommands(el, area, button);
    publicCommnds.getHelp();
    publicCommnds.getLinks();
    publicCommnds.getTime();
}
// Add url

function addUrl(el, area, button){
    const urlValidate = new urlsVerify(el);
    if (urlValidate.urlRepetVerify(links)){
        if (urlValidate.validURL_Docs_Google()||urlValidate.validURL_Forms_Google(el)){
            links.push(el);
            mensage(area, "Link capturado, use !links ou !li para retornar a lista de links disponibilizados hoje!", button);
            mensage(area, "Mensagem automatica.", button);
            console.log(links)
        }
    }
}

// Span

function setSpanTime(tim){
    span_time = time + tim;
    console.log(span_time)
}