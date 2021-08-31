var time = 0;
var span_time = 0;

const interval = setInterval(() => {
    exit();
    main();
    time ++;
}, 1000);

function main(){
    var mens = document.querySelectorAll(".oIy2qc");
    if (mens.length != 0) {
        // Last Mensage
        let el = $(mens[mens.length - 1]).text();
        //sudo commands
        if (String(el)[0] === sudoPrefix){
            const sudocommands = new sudoCommands(el);
        }         
        else if (isAbilite){

            // public commands
            if (String(el)[0] === publicPrefix && span_time >= time){
                mensage(`Por favor espere mais ${span_time - time} segundos para chamar o comando novamente`)
            } else if (String(el)[0] === publicPrefix){
                const publiccommands = new publicCommands(el);
            }
            // add Url
            const addUrl = new urlsVerify(el);
        }
    }
}

//FUNCTIONS

function names(){
    const nameees = document.querySelectorAll(".YTbUzc");
    let lastname = $(nameees[nameees.length - 1]).text();
    return lastname;
}

function mensage(mensage){
    $("textarea").val(mensage);
    const button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd")[0];
    button.removeAttribute("disabled");
    $(button).click();
}

function setSpanTime(tim){
    span_time = time + tim;
    console.log(span_time)
}

function exit(){
    window.onbeforeunload = confirmExit;
    function confirmExit() {
    links.forEach(link => {
        console.log(link)
    });
    return "You have attempted to leave this page. Are you sure?";
    }
}