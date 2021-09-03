# Documentação da extensão

A extensão se trata de uma extensão que server para modificar o funcionamento do chat do google meet, capturando links que pertencem ao google forms.

## Index

- [Documentação da extensão](#documentação-da-extensão)
  - [Index](#index)
- [Propiedades Padrão](#propiedades-padrão)
- [Main](#main)
  - [Esquema de funcionalidade main:](#esquema-de-funcionalidade-main)
  - [FUNÇÕES MAIN](#funções-main)
    - [Names](#names)
    - [Mensage](#mensage)
    - [SetSpanTime](#setspantime)
- [PUBLIC COMMANDS](#public-commands)
  - [Class publicCommands](#class-publiccommands)
    - [Constructor](#constructor)
  - [Metodos internos.](#metodos-internos)
    - [main](#main-1)
    - [getHelp](#gethelp)
    - [getLinks](#getlinks)
    - [getTime](#gettime)
    - [setTexToUpperCase](#settextouppercase)
    - [setTextToLowerCase](#settexttolowercase)
    - [setTextToUpperCaseAndLowerCase](#settexttouppercaseandlowercase)
  - [Classe helpPublicCommands](#classe-helppubliccommands)
    - [Constructor](#constructor-1)
  - [Métodos internos](#métodos-internos)
    - [Main](#main-2)
    - [Pages](#pages)
- [SUDO COMMANDS](#sudo-commands)
  - [Class sudoCommands](#class-sudocommands)
    - [Constructor](#constructor-2)
  - [Metodos internos.](#metodos-internos-1)
    - [main](#main-3)
    - [disable](#disable)
    - [enable](#enable)
    - [remove](#remove)
    - [help](#help)
    - [links](#links)
- [Verificação de url](#verificação-de-url)
  - [Class urlsVerify](#class-urlsverify)
    - [constructor](#constructor-3)
    - [main](#main-4)
    - [urlRepetVerify](#urlrepetverify)
    - [validURL_Docs_Google](#validurl_docs_google)
    - [validURL_Forms_Google](#validurl_forms_google)
     

# Propiedades Padrão

**TIME :** Essa propiedade sempre recebe ela mais um a cada ciclo de execução da extensão, servindo para contabilizar quanto tempo a extensão está sendo executada e também servindo para facilitar a progamação da função span time.

[**SPAN_TIME :**](#setspantime) Essa propeidade é chamada pela função *setSpanTime* recebendo um valor, esse valor é verificado durante a execução da função *main* se o *span_time* for superior a propiedade *time* os comandos de execução publicos não poderão ser executados, portanto uma mensagem será exibida:

```
mensage(`Por favor espere mais ${span_time - time} segundos para chamar o comando novamente`)
```

**ISABILITE :** Essa propiedade só pode ser modificado pelos comandos da classe *sudoComands*.

Serve para verificar se os comandos publicos podem ser chamados, caso ela esteja como falsa nenhum comando publico será reconhecido porém se ela estiver como verdadeira todos os comandos publicos poderão ser utilizados.

**LINKS :** Essa propiedade é responsavel pelo armazentamento dos links verificados pela função *main* da classe *urlsVerify* caso o link seja verificado e seja verdadeiro, ele será adicionado dentro desse *array* e poderá ser removido pelo comando *remove* da classe *sudoCommands*.

**SUDOPREFIX :** Essa propiedade determina o prefixo dos comandos de sudo.

**PUBLICPREFIX :** Essa propiedade determina o prefixo dos comandos publicos.

# Main

Main é a função padrão da injeção de JavaScript no site.

Main é responsavel por chamar todas as outras classes e funções, ela é o "coração" da extensão.

## Esquema de funcionalidade main: 

Assim que main é chamada ela cria duas variaveis.

```
var time = 0;
var span_time = 0;
```

Logo em seguida ela cria uma constante que é executada em todo o tempo de vida da extensão, essa constante é responsavel por chamar a função *main()* e incrementar time, o numero 1000 representado após o fechamento de chaves e após a virgula é quantas vezes a extensão irá ser executada, nesse caso ela é executada uma vez a cada mil milesimos de segundo, ou simplificando uma vez a cada um segundo:

```
const interval = setInterval(() => {
    main();
    time ++;
}, 1000);
```

Assim que a função main é chamada ela cria uma variavel chamada de mens, que recebe o valor de todas as mensagens digitadas no chat:

```
var mens = document.querySelectorAll(".oIy2qc");
```

Logo em seguida ela verifica se o tamanho de mens é diferente de zero, pois se for igual a zero siginifica que o chat está vazio, portanto não haveria sentido em executar a verificação de comandos ou a verificação de links:

```
if (mens.length != 0) { . . .}
```

Caso o valor de mens seja diferente de zero o if é ativado portanto a primeira coisa que ele cria é a *let el* , que é responsavel por converter a ultima mensagem em um texto, usando a biblioteca [jquery](https://jquery.com).

```
let el = $(mens[mens.length - 1]).text();
```

Assim que *el* é criada *el* é convertida para String e verifica se a primeira letra de *el* é igual ao sudoPrefix, caso seja ele irá criar uma constante chamada de *sudocommands* que será um objeto que recebe todos os métodos da classe *sudoCommands* o constructor de *sudoCommands* pede que seja passado a ultima mensagem que foi enviada, nesse caso *el* é passada uma vez que ela já é a conversão direta para texto da ultima mensagem:

```
if (String(el)[0] === sudoPrefix){const sudocommands = new sudoCommands(el);}
```

Caso o primeiro caractere da ultima mensagem não possua o *sudoPrefix* ele irá verificar se a propiedade *isAbilite* é verdadeira:

```
else if (isAbilite){. . .}
```

Caso seja verdadeira a primeira coisa que ela irá verificar é se o primeiro caractere de *el* é verdadeiramente igual ao *publicPrefix* e se a propiedade *span_time* é superior ou igual a propiedade *time*:

```
if (String(el)[0] === publicPrefix && span_time >= time){. . .}
```

Caso o if seja verdadeiro então ele irá exibir a seguinte mensagem:

```
mensage(`Por favor espere mais ${span_time - time} segundos para chamar o comando novamente`)
```

Assim evitando que os usuarios chamem os comandos publicos diversas vezes em um curto periodo de tempo.

Se o if acima não for verdadeiro então ocorrerá outra verificação.

Essa verificação servirá convertera *el* para uma String e verificará se o primeiro caractere dela é verdadeiramente igual ao *publicPrefix* :

```
else if (String(el)[0] === publicPrefix){. . .}
```
Caso isso seja verdadeiro uma constante com o nome de *publiccommands* será criada, ela recebera todos os metodos internos da classe *publicCommands* e passará a ultima mensagem que foi enviada como pedido do constructor, esse caso ela passará *el* :

```
const publiccommands = new publicCommands(el);
```

Após todas essas verificações uma constante chamada de *addUrl* sera criada e ela recebera todos metodos internos da classe *urlsVerify* e passará a ultima mensagem que foi enviada como pedido do constructor, esse caso ela passará *el* :

```
const addUrl = new urlsVerify(el);
```

## FUNÇÕES MAIN

### Names

Essa função serve para retornar o nome de quem enviou a ultima mensagem.

Essa função não recebe paramentros, a primeira coisa que ela faz quando é executada é criar uma constante chamada de nameees, que recebe todos os dados de todas as divs que detem os nomes na página.

```
const nameees = document.querySelectorAll(".YTbUzc");
```

Após isso uma let chamada de lastname é criada, essa let receberá a conversão em texto da constante nameees.

```
let lastname = $(nameees[nameees.length - 1]).text();
```

Por ultimo a função retornará o lastname.

```
return lastname;
```
### Mensage

Essa função serve para enviar uma mensagem no chat.

Essa função recebe a mensagem como paramentro, o paramentro *mensagem* deve ser uma string.

Primeiramente essa função atribue ao campo do "textarea" o valor da mensagem.
```
$("textarea").val(mensage);
```

Após isso uma constante chamada *button* é criada, ela pega todos os elementos que possuem o ClassName *"VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd"* e retorna o primeiro indice que é o botão de enviar mensagens que fica ao lado ta text-area.
```
const button = document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ tWDL4c Cs0vCd")[0];
```

Após isso ela remove o atributo desabilitado do botão, dessa forma permitindo que mensagens sejam enviadas.
```
button.removeAttribute("disabled");
```

E por ultimo ela envia o sinal de click para o botão, fazendo com que ele seja clicado, dessa forma a mensagem é enviada
```
$(button).click();
```
### SetSpanTime

Essa função serve para setar um valor na propiedade [span_time](#propiedades-padrão).

Essa função recebe um paramentro chamado de *tim* esse paramentro deve ser um numero.

A propiedade span_time recebe time mais tim
```
span_time = time + tim;
```
Por ultimo span_time é escrito no console
```
console.log(span_time)
```

**Exit**

Essa função serve para perguntar se você deseja sair da pagina, para evitar que todos os links sejam perdidos.

Por algum motivo o google meet acaba retirando vc da reunião assim que vc sai ou recarega a chamada, por isso a extensão irá colar os links no console, copie-os e adicione novamente.

```
function confirmExit() {
  links.forEach(link => {
      console.log(link)
  });
}
```

[Retorne ao inicio](#index)

# PUBLIC COMMANDS

Essa classe detem todos os comandos publicos, isso é os comandos que podem ser usados por qualquer usuario.

A primeira coisa que ela faz é criar a constante publicprefix:

```
const publicPrefix = `!`
```

## Class publicCommands

Essa classe é responsavel por validar e executar os comandos publicos

### Constructor

O construtor dessa classe recebe um unico paramentro que é el.
```
constructor (el) {. . .}
```
Automaticamente ela converte el para casa minscula e elimina espaços existentes antes e depois dela.
```
this._el = String(el).toLowerCase().trim();
```
Logo após isso ela chama o metodo interno *main*
```
this.main();
```

## Metodos internos.
### main

Main é o metodo prinicipal da classe *publicCommands*, sendo responsavel por chamar todas os metodos internos da classe.

### getHelp

getHelp é um metodo interno responsavel por retornar a guia de ajuda da extensão. 

Que por sua vez retorna todos os comandos publicos disponiveis.

Para chamar getHelp digite *!help pagina* ou *!h pagina* no chat do google meet.

Exemplo de utilização de help:

![Exemplo de utilização de !help](https://user-images.githubusercontent.com/81983803/131933893-4968a458-a36f-4ca9-9a0f-8ecd62ca0fb4.png)

Após sua utilização ela utiliza a função setSpanTime passando 15 segundos como paramentro.

Para aprender sobre as páginas do help [clique aqui](#pages)

getHelp possui também uma função interna, que serve para validar se o texto digitado é realmente um *!help* ou *!h* isso para que o sistema de paginção funcione
### getLinks

Metodo interno que retorna os links armazenados até o momento.

Para chamar getLinks digite *!links* ou *!li* no chat do google meet.

Caso não aja nenhum link armazenado em links ela irá retornar a seguinte mensagem:

![Caso não exista nenhum link](https://user-images.githubusercontent.com/81983803/131264124-9e441882-88df-4074-b429-d63800ee6c25.png)

Mas caso aja algum link armazenenado dentro de links ela irá retornar:

![Caso aja algum link](https://user-images.githubusercontent.com/81983803/131264168-6e523c39-b3ae-4def-bf89-bfea3c890275.png)

Apos isso ela chama a função de setSpanTime passando 15 segundos como paramentro.
### getTime

getTime retorna a quantos segundos a extensão está sendo executada.

Para chamar getTime digite *!time* ou *!t* no chat do google meet.

Exemplo de execução:

![Exemplo de execução de getTime](https://user-images.githubusercontent.com/81983803/131264205-f46d9bd4-6953-4ad0-9d3c-11a8599ac364.png)

Apos isso ela chama a função de setSpanTime passando 15 segundos como paramentro.

### setTexToUpperCase

setTexToUpperCase é um metodo interno que faz qualquer texto colocado apos o comando ser devolvido em caixa alta.

Para chamar setTexToUpperCase digite *!upper* ou *!up* de um espaço e digite o texto.

Exemplo de execução:

![Exemplo de execução upper](https://user-images.githubusercontent.com/81983803/131264291-39faacb7-8d17-41b0-ad5a-6bfd70f6ad09.png)

Apos isso ela chama a função de setSpanTime passando 5 segundos como paramentro.

### setTextToLowerCase

setTextToLowerCase é um metodo interno que faz qualquer texto colocado apos o comando ser devolvido em caixa baixa.

Para chamar setTextToLowerCase digite *!lower* ou *!lo* de um espaço e digite o texto.

Exemplo de execução:

![Exemplo de execução lower](https://user-images.githubusercontent.com/81983803/131264346-c4827a0e-d32b-4a42-8f3a-6ce5c9e3ab73.png)

Apos isso ela chama a função de setSpanTime passando 5 segundos como paramentro.

### setTextToUpperCaseAndLowerCase

setTextToUpperCaseAndLowerCase é um metodo interno que faz com quer a primeira letra da palavra fique em caixa alta, logo apos isso a segunda fica em caixa baixa e assim o ciclo continua até acabar a frase.

Para chamar setTextToUpperCaseAndLowerCase digite *!lp* de um espaço e digite o texto.

Exemplo de execução:

![Exemplo de execução lp](https://user-images.githubusercontent.com/81983803/131264402-0bec4113-b33e-4cd4-98c5-616fd5d1c0db.png)

Apos isso ela chama a função de setSpanTime passando 5 segundos como paramentro.

## Classe helpPublicCommands

Essa classe é responsavel pela paginação do comando help, sendo ela um guia de ajuda para o uso da extensão e facilitadora do tamanho do help.

### Constructor

O construtor dessa classe recebe um unico paramentro que é el, el representa a ultima mensagem do chat.

```
constructor (el){. . .}
```

Automaticamente el é convertida para a casa minuscula e recebe dois replaces para subistituir o *!help* ou o *!h* deixando apenas um número que será a pagina de ajuda e por ultimo atribuida a *this._el*

```
this._el = String(el).toLowerCase().replace(`${publicPrefix}help `, '').replace(`${publicPrefix}h `, '');
```

Logo após isso o constructor chama a main.

```        
this.main();
```

## Métodos internos

### Main

Main é a função principal da classe, ela é responsavel por verificar se após o replace a pagina é um numero valido e a qual página ele corresponde, a partir disso ela irá chamar a página correspondende, caso não tenha nenhuma página correspondente ela irá exbiri uma mensagem de erro e setar 5 segundos de span_time.


```
main(){
  if (this._el == 1){ this.pag1(); }
  else if (this._el == 2){ this.pag2(); }
  else{
      mensage(`Pagina invalida, digite ${publicPrefix}help pagina ou ${publicPrefix}h pagina, as paginas vão até a pagina numero 2`);
      setSpanTime(5);
  }
}
```

### Pages

Pages são metodos internos que são denominados pela seguinte nomeclatura:

```
pagNumero(){. . .}
```

Eles são as páginas do sistema de help, servindo para enviar as mensagens referentes a página especificada.

Lembrando que a cada nova pagina criada, uma nova regra de verificação deve ser adicionada a main.

[Retorne ao inicio](#index)

# SUDO COMMANDS

Essa classe detem todos os comandos privados, isso é os comandos que só podem ser usados por você.

A primeira coisa que ela faz é criar a constante sudoPrefix:

```
const sudoPrefix = `¬`
```

## Class sudoCommands

Essa classe é responsavel por validar e executar os comandos privados

### Constructor

O construtor dessa classe recebe um unico paramentro que é el.
```
constructor (el) {. . .}
```
Automaticamente ela converte el para casa minscula e elimina espaços existentes antes e depois dela.
```
this._el = String(el).toLowerCase().trim();
```
Logo após isso ela chama o metodo interno *main*
```
this.main();
```

## Metodos internos.

### main

A primeira coisa que main faz ao ser chamada é validar chamar a função names para verificar se o resultado é extreiatamente igual a 'Você'.

Caso não seja ela irá exibir a seguinte mensagem:

```
mensage(`Desculpe ${names()} mas você não tem permisão para usar comandos de administrador da extensão :/`);
```

Caso o if seja verdadeiro ela irá chamar todos os metodos internos da classe.

### disable

Metodo interno que desabilita o funcionamento da extensão, impedindo que links sejam capturados e comandos publicos sejam utilizados.

Para chamar ela digite *¬disable* no chat.

Assim que chamada ela exibirá a seguinte mensagem:

![Exemplo execução comando disable](https://user-images.githubusercontent.com/81983803/131264601-290df5f2-e698-4e24-a844-a35ec0629711.png)

Após isso nenhum comando publico poderá ser chamado.

![Exemplo de tentativa de chamar o comando links com a extensão desabilitada](https://user-images.githubusercontent.com/81983803/131264622-41bf43b9-49a5-450d-a84f-468fd0421674.png)

Esse comando faz com que a propiedade isAbilite se torne falso.
### enable

enable é um metodo interno que habilita o funcionamento da extensão, fazendo com que caso ela tenha sido desativada ela volte a funcionar.

Para chamar ela digite ¬enable no chat.

Assim que for chamada ela irá exibir a seguinte mensagem:

![exemplo de execução enable](https://user-images.githubusercontent.com/81983803/131264658-ea3181e1-58fc-4f0c-9755-ece8e1741e02.png)

Após isso comandos publicos e captura de links estarão novamente disponivel.

![exemplo de chamar o comando links apos enable está disponivel](https://user-images.githubusercontent.com/81983803/131264673-a3e7ed3e-7696-47ef-982d-71ce7174b293.png)

Esse metodo modifica a propiedade isAbilite fazendo ela se tornar verdadeira.

### remove

remove é um metodo interno que serve para remover o ultimo link da lista de links.

Para chamar ele digite *¬remove* no chat.

Após ser chamado ele irá exibir a seguinte mensagem:

![image](https://user-images.githubusercontent.com/81983803/131264750-66f6d888-21a3-4d3a-8f39-94673331c78c.png)

Dessa forma se dermos um *!links* ele irá retornar a lista sem o ultimo link.

![image](https://user-images.githubusercontent.com/81983803/131264806-80d17fb1-7ca2-4248-b261-e2b1721104e3.png)

### help

help é um metodo interno que irá retornar no console todos os comandos privados.

Para chamar help digite *¬help* no chat do google meet.

Apos ser chamado help irá exibir a seguinte mensagem:

![Exemplo de execução de help](https://user-images.githubusercontent.com/81983803/131264826-73e8e9d0-5764-46ae-9a21-2717743a1cfa.png)

Caso você cheque o seu console a seguinte mensagem estará escrita:

![Resultado no console](https://user-images.githubusercontent.com/81983803/131264870-302f43f8-b557-4393-9cb6-7e27b53c5d99.png)

### links

links é um metodo interno que serve para chamar o metodo publico links porém esse metodo interno não sofre com o span_time.

Para chamar ele digite *¬links* no chat.

Exemplo após ser chamado:

![image](https://user-images.githubusercontent.com/81983803/131264938-4e5a11e6-a1f4-4fb4-9d82-9d11bd839c79.png)

Nesse caso ele acaba por não sofrer com o span_time então esse comando pode ser chamado mesmo se a extensão estiver desabilitada ou durante o tempo de span.

[Retorne ao inicio](#index)

# Verificação de url

Essa classe detem todas os metodos de verificação e validação de url.

A primeira coisa que ela faz é criar a lista de links, que começa com uma lista vazia.

```
var links = [];
```

## Class urlsVerify

Essa classe detem todas os metodos de verificação e validação de url e permite com que links sejam adicionados a lista.

### constructor

O construtor dessa classe recebe um paramentro *men* que é uma String.

Logo em seguida ele chama o metodo main.

### main

main é o metodo principal da classe, ele é responsavel por chamar os outros metodos.

Inicialmente main verifica se a url é repetida, por meio do metodo *urlRepetVerify* passando a lista de links como paramentro.

Caso o if seja falso nada acontece.

Caso ele seja verdadeiro outro if é acionado, esse if chama duas funções a *validURL_Docs_Google* e *validURL_Forms_Google* que servem para verificar o dominio do link, alguma das duas funções seja verdadeira o progama irá adicionar o link a lista de links e em seguida escrever.

```
mensage("Link capturado, use !links ou !li para retornar a lista de links disponibilizados hoje");
mensage("Mensagem automatica");
```

### urlRepetVerify

urlRepetVerify é um metodo interno que recebe um paramentro chamado de *listLinks* esse paramentro deve ser um array.

```
urlRepetVerify(listLinks) {. . .}
```

Assim que é chamada ela cria uma variavel local chamada *iq* e faz um foreach dentro de *listlinks* e verifica se o link é igual ao link da mensagem ou se a mensagem possui um link.
```
let iq = 0;
listLinks.forEach(links => {. . .})
```

Caso possua ele irá fazer a variavel local *iq* receber ela mais ela mesmo.

```
if (links === this._men|| this._men.indexOf(links) >= 0){ iq ++}
```

Caso *iq* seja igual a zero o metodo irá retornar verdadeiro pois isso inidica que *iq* foi intocada, senão ele irá retornar falso.

```
switch (iq){
    case 0:
        return true;
    default:
        return false;
}
```

### validURL_Docs_Google

validURL_Docs_Google é um metodo interno que serve para validar se o dominio da url é *https://docs.google.com/forms* que é a versão não encurtada.

Ela faz isso por meio do RegExp.

### validURL_Forms_Google

validURL_Forms_Google é um metodo interno que serve para validar se o dominio da url é *https://forms.gle/* que é a versão encurtada

Ela faz isso por meio do RegExp.

[Retorne ao inicio](#index)