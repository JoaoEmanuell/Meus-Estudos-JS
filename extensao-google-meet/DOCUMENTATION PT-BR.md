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

[Retorne ao inicio](#index)