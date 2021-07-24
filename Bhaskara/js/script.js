let state = 0;
function help() {
    let helpp = window.document.getElementById('help');
    let helpme = window.document.getElementById('help-exib');
    if (state == 0) {
        helpp.innerHTML = "Clique em mim para fechar a ajuda!";
        helpme.innerHTML = "<strong>A</strong> é o número que acompanha x², <strong>B</strong> é o número que acompanha x, <strong>C</strong> é o número que está solitario, caso a equação esteja igual a um número diferente de 0, passe esse número para o lado esquerdo, esse número terá o sinal invertido ou seja, se for postivo se tornará negativo, se for negativo se tornará positivo.";
        state = 1;
        
        } else {
            helpp.innerHTML = "Não sabe quais são os números correspondentes? Clique em mim para exibir uma ajuda.";
            helpme.innerHTML = "";
            state = 0;
            
        }
}
