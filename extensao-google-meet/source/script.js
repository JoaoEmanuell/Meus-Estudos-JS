var isAbilite = true;
var links = [];
var time = 0;
var span_time = 0;
const sudoPrefix = `¬`
const publicPrefix = `!`
const interval = setInterval(() => {
    main();
    time ++;
}, 3000);

function main(){
    var mens = document.querySelectorAll(".oIy2qc");
    var area = document.querySelector("textarea");
    var button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd")[0];
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

function names(){
    const nameees = document.querySelectorAll(".YTbUzc");
    let lastname = $(nameees[nameees.length - 1]).text();
    return lastname;
}

function mensage(area, mensage, button){
    $(area).val(mensage);
    button.removeAttribute("disabled");
    $(button).click();
}
// Sudo Commands

function SC(el, area, button){
    const sudocommands = new sudoCommands(el, area, button);
    sudocommands.main();
}

// Public Commands

function PC(el, area, button){
    const publiccommands = new publicCommands(el, area, button);
    publiccommands.main();
}
// Add url

function addUrl(el, area, button){
    const urlvalidate = new urlsVerify(el, area, button);
    urlvalidate.main();
}

// Span

function setSpanTime(tim){
    span_time = time + tim;
    console.log(span_time)
}