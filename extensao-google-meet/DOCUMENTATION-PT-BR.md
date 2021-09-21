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
    - [getJoker](#getjoker)
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
    - [setSilence](#setsilence)
  - [Class SudoHelp](#class-sudohelp)
    - [Constructor](#constructor-3)
    - [Main](#main-4)
- [Verificação de url](#verificação-de-url)
  - [Class urlsVerify](#class-urlsverify)
    - [constructor](#constructor-4)
    - [main](#main-5)
    - [urlRepetVerify](#urlrepetverify)
    - [validURL_Docs_Google](#validurl_docs_google)
    - [validURL_Forms_Google](#validurl_forms_google)
- [Piadas](#piadas)
  - [Class jokes](#class-jokes)
    - [Constructor](#constructor-5)
  - [Metodos internos](#metodos-internos-2)
    - [Main](#main-6)
    - [getNumber](#getnumber)
    - [question](#question)
    - [answers](#answers)
- [MATH COMMANDS](#math-commands)
  - [Class mathCommands](#class-mathcommands)
    - [Constructor](#constructor-6)
  - [Metodos internos.](#metodos-internos-3)
    - [Main](#main-7)
  - [Class helpMath](#class-helpmath)
    - [constructor](#constructor-7)
  - [Métodos Internos](#métodos-internos-1)
    - [Main](#main-8)
- [PA CLASS](#pa-class)
  - [Constructor](#constructor-8)
- [Métodos internos.](#métodos-internos-2)
  - [Main](#main-9)
  - [validateClassicPA](#validateclassicpa)
  - [validNPA](#validnpa)
  - [validRPA](#validrpa)
  - [validSPA](#validspa)
- [MATH OPERATIONS](#math-operations)
  - [Class Math_PA](#class-math_pa)
  - [Metodos internos](#metodos-internos-4)
    - [classicPA](#classicpa)
    - [NPA](#npa)
    - [RPA](#rpa)
    - [SPA](#spa)
- [MATH ESSENTIAL](#math-essential)
  - [ExtractNumbers](#extractnumbers)
     

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

**SILENCE :** Essa propiedade é definida como false por padrão, caso ela seja alterada para verdadeira a mensagem de link capturado não será enviada.
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

Se o if acima não for verdadeiro então ocorrerá outra verificação.

Essa verificação servirá convertera *el* para uma String e verificará se o primeiro caractere dela é verdadeiramente igual ao *mathPrefix* :

```
else if (String(el)[0] === mathPrefix){. . .}
```

Caso isso seja verdadeiro uma constante com o nome de *mathcommands* será criada, ela recebera todos os metodos internos da classe *mathCommands* e passará a ultima mensagem que foi enviada como pedido do constructor, esse caso ela passará *el* :

```
const mathcommands = new mathCommands(el);
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

### getJoker

getJoker é uma função que retorna uma piada aleatoria da lista de piadas.

Para chamar getJoker digite *!joker* ou *!jk* ou *!piada* ou *!pi*

Exemplo de execução:

![Exemplo de execução comando joker](https://user-images.githubusercontent.com/81983803/132422496-286faa2c-a96d-4061-a898-673834292cc2.png)

Sempre que é chamado ele gera retorna uma piada aleatoria, apesar da possibilidate ser baixa a piada pode acabar vindo repetida.

Apos isso ela chama a função de setSpanTime passando 20 segundos como paramentro.
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

### setSilence

setSilence serve para modificar o valor da propiedade silence.

Para chamar ela digite no chat *¬setsilence estado*

Caso o estado seja igual a *on* ela irá retornar o seguinte:

![Exemplo Silence On](https://user-images.githubusercontent.com/81983803/132108077-97cb3226-65dc-4cf3-bf00-3db6c37e41db.png)

E irá definir *silence* como **true**.

Caso o estado seja igual a *off* ela irá retornar o seguinte:

![Exemplo Silence Off](https://user-images.githubusercontent.com/81983803/132108098-4ded3477-2cda-42a8-8fcd-74ab487d0374.png)

E irá definir *silence* como **false**.

Caso o estado seja invalido, ela irá retornar o seguinte.

![Exemplo Silence Invalido](https://user-images.githubusercontent.com/81983803/132108111-64aa361c-7b22-4dc3-ad7a-6a4f5808d2fa.png)

## Class SudoHelp

Essa classe detem o sistema de ajuda dos metodos internos da classe SudoCommands.

### Constructor

O constructor não recebe paramentros e automaticamente chama a main.

### Main

Main é a função principal da classe.

Uma vez chamada ela irá retornar todos os comandos de sudo no console.

E exibir a seguinte mensagem no chat:

```
mensage("Os comandos de permissão de administrador foram enviados para o console!");
```


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

Caso ele seja verdadeiro outro if é acionado, esse if chama duas funções a *validURL_Docs_Google* e *validURL_Forms_Google* que servem para verificar o dominio do link, alguma das duas funções seja verdadeira o progama irá adicionar o link a lista de links e caso silence seja falso ele irá escrever:

```
mensage("Link capturado, use !links ou !li para retornar a lista de links disponibilizados hoje");
mensage("Mensagem automatica");
```

Senão nada será escrito.

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

# Piadas

## Class jokes

Essa classe detem as listas de piadas e os métodos para retornar uma piada aleatoria sempre que é chamada.

### Constructor

O construtor dessa classe chama o método interno main.

## Metodos internos

### Main

O metodo interno main é o metodo interno principal dessa classe.

Assim que é chamado ele cria uma constante que recebe o retorno do metodo interno question, no caso esse retorno é uma lista de perguntas que devem ser complementadas com as respostas.

```
const quest = this.question();
```

Logo em seguida ele cria outra const que irá deter todas as respostas das piadas.

```
const answer = this.answers();
```

Logo após isso uma constante chamada number irá ser criada, essa constante chama um método chamado *getNumber* esse método pede uma lista como paramentro e retorna uma posição aleatoria dessa lista.

```
const number = this.getNumber(quest);
```

Após isso ela irá enviar uma mensagem para o chat do google meet, essa mensagem irá conter a constante *quest* na posição *number*, logo em seguida uma quebra de linha e a constante *answer* na posição *number*.

```
mensage(`${quest[number]}\n${answer[number]}`);
```
### getNumber

getNumber necessita de um paramentro que deve ser uma lista.

Assim que for chamada ela irá retornar um numero aleatorio que será uma posição aleatoria dessa lista.

### question

Question retorna uma lista de perguntas que são basicamente perguntas de piadas.

### answers

Answers retora uma lista de respostas que são basicamente respostas das piadas que question detem.

**[Retorne ao inicio](#index)**

# MATH COMMANDS

Math Commands é a classe responsavel por validar os comandos matematicos e retornar os valores deles.

Atualmente ela possui uma sub-classe que é responsavel por relizar operações de P.A.

A primeira coisa que ela faz ao ser inicada é criar uma constante chamada de *"mathPrefix"* que irá deter o prefixo necessario para chamar todos os comandos dessa classe.

```
const mathPrefix = `+`;
```

## Class mathCommands
### Constructor
Assim que essa classe é instanciada na main ela irá pedir *el* que é a ultima mensagem passada, logo em seguida *el* será convertida para String e transformada em letras minuscula, após isso ela irá chamar o methodo interno *main*.

```
class mathCommands{
    constructor (el){
        this._el = String(el).toLowerCase();
        this.main();
    }
```

## Metodos internos.

### Main

Main é o método principal, ele é responsavel por criar duas constantes.

Uma é chamada de *pa* essa constante herda todas as caracteristicas da classe *PA* e passa *this._el* como paramentro.

Logo em seguida uma outra constante é criada, essa constante é chamada de *help* essa consante herda todas as caracteriscias da classe *helpMath* e passa *this._el* como paramentro.

```
    main(){
        // PA
        const pa = new PA(this._el);
        // HELP
        const help = new helpMath(this._el);
    }
}
```

## Class helpMath

Essa classe é responsavel por validar as páginas de help dos comandos de math.

### constructor

O constructor pede como paramentro *el* que é a ultima mensagem, *el* sera convetida para String e irá ser colocada em letras minusculas.

```
this._el = String(el).toLowerCase();
```

Então ocorrerá uma verificação, se dentro de *this._el* tiver *+help* ou *+h* ela irá converter *this._el* novamente para as letras minusculas e retirar o *+help* e *+h* deixando só o número da página.

```
this._el = String(el).toLowerCase();
if (this._el.indexOf(`${mathPrefix}help`) === 0 || this._el.indexOf(`${mathPrefix}h`) === 0 ){
    this._el = String(el).toLowerCase().replace(`${mathPrefix}help `, '').replace(`${mathPrefix}h `, '');
```

Logo após isso o método interno *main* será chamado.

```
this.main();
```

## Métodos Internos

### Main

Main é o método principal da classe *helpMath* ele é responsavel por validar as páginas e chamar a página correspondente aquele número.

Ela faz isso por meio de um switch

```
switch(this._el){
  case "pag":
    pag;
    break;
}
```

Se nenhuma condição for atendia ela irá enviar a seguinte mensagem:

"Pagina invalida, digite "+help pagina" ou "+h pagina", as paginas vão até a pagina numero 2"

E setar 3 segundos de *SpanTime*

Caso determinada página seja chamada a página irá enviar como mensagem o seu conteudo e setar um SpanTime de 15 segundos.

**[Retorne ao inicio](#index)**

# PA CLASS

Classe reponsavel por validar e retornar as respostas das progressões aritimeticas.

## Constructor

O construtor dessa classe pede um paramentro, que é chamado de *el*, *el* corresponde a ultima mensagem que foi enviada, após isso *el* é convertido em *String* e transformado para letras minusculas.

Logo em seguida o método interno *main* é chamado.

```
constructor (el){
      this._el = String(el).toLowerCase();
      this.main();
  }
```

# Métodos internos.

## Main

Main é o método principal, ele é responsavel por validar se o comando corresponde a algum dos comandos desejados para realização de uma P.A.

Primeiramente ele verifica se dentro da mensagem existe um comando para chamar a classe P.A.

 Caso isso seja possitivo ele verifica se dentro da mensagem existe um comando que seja valido, caso exista ele irá enviar uma mensagem que será o retorno do método interno *validate* daquele comando especificado.

```
if (this._el.indexOf(`${mathPrefix}p.a cl`) >= 0){
  mensage(this.validateClassicPA(this._el));
}
```

## validateClassicPA

validateClassicPA é um método interno que valida se o comando passa números suficientes para que uma operação de P.A. classica seja executada.

Ele pede a ultima mensagem como paramentro.

Automaticamente ela converte a ultima mensagem para String e retira o comando dela, dessa forma deixando só os números.

```
this._el = String(el).replace(`${mathPrefix}p.a cl `, ``);
```

Logo em seguida uma constante chamada de listNumbers é criada, ela recebe o retorno da função *ExtractNumbers* passando *this._el* como paramentro, dessa forma o método interno *ExtractNumbers* irá extair os números e retornar uma lista com eles.

```
const listNumbers = ExtractNumbers(this._el);
```

Se o length de listNumbers for diferente de 3 ela irá retornar "Algum numero invalido foi passado, tente novamente!"

```
if (listNumbers.length != 3){ return `Algum numero invalido foi passado, tente novamente!`; } 
```

Senão ela irá criar uma constante chamada de *classPa* que irá receber todos os métodos da classe *Math_PA*.

Dessa forma ela irá retornar o valor de retorno da constante *classPa* chamando o método interno *classicPA*, passando como paramentros: 

*listNumbers* na posição 0, que é o valor do primeiro termo da P.A.

*listNumbers* na posição 1, que é o valor da razão da P.A.

*listNumbers* na posição 2, que é a quantidade de termos da P.A.

```
else{
  const classPa = new Math_PA();
  return classPa.classicPA(listNumbers[0], listNumbers[1], listNumbers[2]);
}
```

## validNPA

validNPA é um método interno que valida se o comando passa números suficientes para que uma operação de N.P.A (isso é uma operação que tem por objetivo retornar o valor do termo desejado) seja executada.

Ele pede a ultima mensagem como paramentro.

Automaticamente ela converte a ultima mensagem para String e retira o comando dela, dessa forma deixando só os números.

```
this._el = String(el).replace(`${mathPrefix}p.a n `, ``);
```

Logo em seguida uma constante chamada de listNumbers é criada, ela recebe o retorno da função *ExtractNumbers* passando *this._el* como paramentro, dessa forma o método interno *ExtractNumbers* irá extair os números e retornar uma lista com eles.

```
const listNumbers = ExtractNumbers(this._el);
```

Se o length de listNumbers for diferente de 3 ela irá retornar "Algum numero invalido foi passado, tente novamente!"

```
if (listNumbers.length != 3){ return `Algum numero invalido foi passado, tente novamente!`; } 
```

Senão ela irá criar uma constante chamada de *classPa* que irá receber todos os métodos da classe *Math_PA*.

Dessa forma ela irá retornar o valor de retorno da constante *classPa* chamando o método interno *NPA*, passando como paramentros: 

*listNumbers* na posição 0, que é o valor do primeiro termo da P.A.

*listNumbers* na posição 1, que é o valor da razão da P.A.

*listNumbers* na posição 2, que é o termo que deseja ser descoberto.

```
else{
  const classPa = new Math_PA();
  return classPa.NPA(listNumbers[0], listNumbers[1], listNumbers[2]);
  }
```

## validRPA

validRPA é um método interno que valida se o comando passa números suficientes para que uma operação de R.P.A (isso é uma operação que tem por objetivo retornar o valor do termo desejado) seja executada.

Ele pede a ultima mensagem como paramentro.

Automaticamente ela converte a ultima mensagem para String e retira o comando dela, dessa forma deixando só os números.

```
this._el = String(el).replace(`${mathPrefix}p.a r `, ``);
```

Logo em seguida uma constante chamada de listNumbers é criada, ela recebe o retorno da função *ExtractNumbers* passando *this._el* como paramentro, dessa forma o método interno *ExtractNumbers* irá extair os números e retornar uma lista com eles.

```
const listNumbers = ExtractNumbers(this._el);
```

Se o length de listNumbers for diferente de 3 ela irá retornar "Algum numero invalido foi passado, tente novamente!"

```
if (listNumbers.length != 3){ return `Algum numero invalido foi passado, tente novamente!`; } 
```

Senão ela irá criar uma constante chamada de *classPa* que irá receber todos os métodos da classe *Math_PA*.

Dessa forma ela irá retornar o valor de retorno da constante *classPa* chamando o método interno *RPA*, passando como paramentros: 

*listNumbers* na posição 0, que é o valor do primeiro termo da P.A.

*listNumbers* na posição 1, que é o número de termos da P.A.

*listNumbers* na posição 2, que é o valor do ultimo termo conhecido da P.A.

```
else{
  const classPa = new Math_PA();
  return classPa.RPA(listNumbers[0], listNumbers[1], listNumbers[2]);
}
```

## validSPA

validSPA é um método interno que valida se o comando passa números suficientes para que uma operação de S.P.A. (isso é uma operação que tem por objetivo retornar o valor da soma de todos os termos da P.A.) seja executada.

Ele pede a ultima mensagem como paramentro.

Automaticamente ela converte a ultima mensagem para String e retira o comando dela, dessa forma deixando só os números.

```
this._el = String(el).replace(`${mathPrefix}p.a s `, ``);
```

Logo em seguida uma constante chamada de listNumbers é criada, ela recebe o retorno da função *ExtractNumbers* passando *this._el* como paramentro, dessa forma o método interno *ExtractNumbers* irá extair os números e retornar uma lista com eles.

```
const listNumbers = ExtractNumbers(this._el);
```

Se o length de listNumbers for diferente de 3 ela irá retornar "Algum numero invalido foi passado, tente novamente!"

```
if (listNumbers.length != 3){ return `Algum numero invalido foi passado, tente novamente!`; } 
```

Senão ela irá criar uma constante chamada de *classPa* que irá receber todos os métodos da classe *Math_PA*.

Dessa forma ela irá retornar o valor de retorno da constante *classPa* chamando o método interno *SPA*, passando como paramentros: 

*listNumbers* na posição 0, que é o valor do primeiro termo da P.A.

*listNumbers* na posição 1, que é o valor do ultimo termo da P.A.

*listNumbers* na posição 2, que é o número de termos da P.A.

```
else{
  const classPa = new Math_PA();
  return classPa.SPA(listNumbers[0], listNumbers[1], listNumbers[2]);
}
```

# MATH OPERATIONS

Math operations é a classe responsavel por realizar operações mátematicas.

## Class Math_PA

Math_PA é uma classe responsavel por realizar operações de progressão aritimetica ou P.A.

Essa classe não possui um construtor.

## Metodos internos

### classicPA

Esse método retorna uma P.A. com todos os membros dela escrito.

Paramentros:

a1 = Valor do primeiro termo da P.A.

r = Razão da P.A.

n = Ultimo termo da P.A.

Assim que é chamado esse método cria 3 elementos propios.

O primeiro chamado de *this._a1* recebe o resultado do paramentro a1.

```
this._a1 = a1;
```

O segundo chamado de *this._r* recebe o resultado do paramentro r.

```
this._r = r;
```

O terceiro chamado de *this._n* recebe o resultado do paramentro n.

```
this._n = n;
```

Logo em seguida ela cria uma let chamada de *tmp* que começa com 0, *tmp* é responsavel por limitar o funcionamento do for, assim impedindo ele de entrar em loop infinito.

```
let tmp = 0;
```

Após isso a variavel *fullPA* é criada, ela começa como uma string vazia e é responsavel por armazenar a P.A.

```
var fullPA = '';
```

Então occorre um for, a let *i* é criada, *i* começa com o valor de *this._a1* esse for ocorrera enquanto *tmp* for inferior a *this._n* e o *i* irá receber ele mais *this._r*.

```
for (let i = this._a1; tmp < this._n; i += this._r){. . .}
```

Sempre que o **for** for executado *tmp* irá receber ela mais ela mesmo e a variavel *fullPA* irá receber ela mais o valor de *i* com uma virgula e um espaço colocado.

```
tmp ++;
fullPA += `${i}, `;
```

Após isso o método irá retornar a *fullPA* eliminando a virgula e o espaço final pois não existe nenhum numero após ele.

```
return fullPA.slice(0, fullPA.length - 2);;
```

### NPA

Esse método retorna o valor do termo desejado de uma P.A.

Por meio da formula do termo geral da P.A.:

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/133949215-93f3fa7c-709a-456f-a523-66afa7cb41c0.png" alt="Formula do termo geral da P.A."/>
</p>

Paramentros:

a1 = Valor do primeiro termo da P.A.

r = Razão da P.A.

n = Ultimo termo da P.A.

Assim que é chamado esse método cria 3 elementos propios.

O primeiro chamado de *this._a1* recebe o resultado do paramentro a1.

```
this._a1 = a1;
```

O segundo chamado de *this._r* recebe o resultado do paramentro r.

```
this._r = r;
```

O terceiro chamado de *this._n* recebe o resultado do paramentro n menos um.

```
this._n = n - 1;
```

Então ela irá retornar o valor de "*this._a1* + (*this._n* * *this._r*)" conforme a formula acima ordena:

```
return this._a1 + (this._n * this._r);
```
### RPA

Esse método retorna a razão de uma P.A.

Por meio da seguinte formula:

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/134068616-495b1c0c-8086-489f-af94-c611c58d90e7.png" alt="Formula da razão da P.A."/>
</p>

Paramentros:

a1 = Valor do primeiro termo da P.A.

an = Valor do ultimo termo da P.A.

n = Numero de termos da P.A.

Assim que é chamado esse método cria 3 elementos propios.

O primeiro chamado de *this._a1* recebe o resultado do paramentro a1.

```
this._a1 = a1;
```

O segundo chamado de *this._an* recebe o resultado do paramentro an menos um.

```
this._an = an - 1;
```

O terceiro chamado de *this._vf* recebe o resultado do paramentro vf.

```
this._vf = vf;
```

Logo em seguida ela cria uma constante chamada de *r* que recebe "(*this._vf* + (-*this._a1*)) / *this._an*";

```
const r = (this._vf + (-this._a1)) / this._an;
```

O (-*this._a1*) serve para forçar o valor do this._a1 a se tornar negativo.

Então ela irá retornar o valor de r:

```
return r;
```

### SPA

Esse método retorna o valor do termo desejado de uma P.A.

Por meio da formula do termo geral da P.A.:

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/134069723-71abfc67-a42b-467f-8235-9176960d4f05.png" alt="Formula do termo geral da P.A."/>
</p>

Paramentros:

a1 = Valor do primeiro termo da P.A.

an = Valor do ultimo termo da P.A.

n = Numero de termos da P.A.

Assim que é chamado esse método cria 3 elementos propios.

O primeiro chamado de *this._a1* recebe o resultado do paramentro a1.

```
this._a1 = a1;
```

O segundo chamado de *this._an* recebe o resultado do paramentro an.

```
this._an = an;
```

O terceiro chamado de *this._n* recebe o resultado do paramentro n.

```
this._n = n;
```

Então ela irá retornar o valor de "*this._a1* + (*this._n* * *this._r*) / 2" conforme a formula acima ordena:

```
return ((this._a1 + this._an) * this._n) / 2;
```

**[Retorne ao inicio](#index)**

# MATH ESSENTIAL

Math essential é um arquivo .js que detem funções essenciais para o funcionamento das funções matematicas.

## ExtractNumbers

ExtractNumbers é um método interno que não é chamado por main, mas ele é essencial para o funcionamento dos outros métodos internos, ExtractNumbers é reponsavel por retirar os números da mensagem e converte-los para números, ao final ele irá retornar a lista de números retirados da mensagem.

Como paramentro obrigatorio você deve passar a ultima mensagem, é desejavel que essa mensagem só tenha os números e que todo o texto dela tenha sido removido.

E você deve passar o separador, separador é um caractere que indica a separação dos números.

Assim que criado *ExtractNumbers* cria uma let chamada *tmp* que começa como uma string vazia, logo em seguida ela cria uma lista chamada de *listNumbers* que começa como uma lista vazia.

```
let tmp = '';
let listNumbers = [];
```

Após isso ela faz um for começando com a let *e* no valor 0 enquanto *e* é inferior ao *el.length* e incrementando *e* mais um.

```
for (let e = 0; e < el.length; e++){ . . . }
```

Para cada ciclo do for *tmp* recebe ela mais igual a *el* na posição *e*.

```
tmp += el[e];
```

Se o *el* na posição *e* for igual a *separate* o que indica que chegou a um ponto de ruptura e que o proximo elemento outro termo ou se o length de *el* for verdadeiramente igual a *e* mais um o que indica que o proximo caractere é o caractere final.

```
if (el[e] == separate || el.length === e +1){
```

tmp remove o separate dela deixando somente os númeoros. 

Se a negação de isNaN (Método interno do javascript que verifica se determinado termo não é um número, se for um número ele irá retornar false, senão for um número ele irá retornar True) for verdadeira então adicione a conversão númerica de *tmp* para *listNumbers* e faça *tmp* retorna a uma lista vazia

```
tmp = tmp.replace(separate, '');
if(!isNaN(tmp)){
    listNumbers.push(Number(tmp));
    tmp = '';
}
        
```

Ao final de tudo isso retorne *listNumbers* que deve ser uma lista com todos os números extraidos da mensagem.

```
return listNumbers;
```

**[Retorne ao inicio](#index)**