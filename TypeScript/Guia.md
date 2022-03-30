# Menu
- [Menu](#menu)
- [Começando](#começando)
  - [Instalação](#instalação)
  - [Compilação](#compilação)
- [Variáveis](#variáveis)
- [Funções](#funções)
- [Tsconfig](#tsconfig)
  - [Criando](#criando)
  - [Configurações importantes](#configurações-importantes)
- [Tipos](#tipos)
  - [boolean](#boolean)
  - [string](#string)
  - [number](#number)
  - [array](#array)
  - [tuple](#tuple)
  - [enum](#enum)
  - [any](#any)
  - [void](#void)
  - [null / undefined](#null--undefined)
  - [never](#never)
  - [object](#object)

# Começando

## Instalação

    sudo npm install typescript -g

*a flag -g serve para dizer que deve ser instalado globalmente*

## Compilação

    tsc arquivo.ts --watch

*a flag watch serve para recompilar o arquivo a cada nova alteração*

    tsc --watch

A forma acima compila todos os arquivos.

# Variáveis

Para declarar uma variável é igual no javascript, mantendo as regras de constantes, lets e vars, a diferença é que no typescript você pode colocar o tipo das variáveis.

    const input1 = document.getElementById('num1') as HTMLInputElement;

HTMLInputElement diz que o input1 é uma const do tipo HTMLInputElement.

Você também pode declarar elas antes de atribuir valores, para isso você irá colocar :

    var var_name : tipo;

    var name : string;

# Funções

No typescript os parâmetros das funções devem ser tipados.

    function nome(parâmetro1 : tipo, parâmetro2 : tipo) : tipo_retorno {
        . . .
    };

    function sum(a : number, b : number) : number {
        return a + b;
    };

O ts tem a vantagem gigantesca de exibir erros que aconteceriam no javascript, assim sendo quando você for compilar o código ts para js e tiver algo errado ele irá exibir o erro imediatamente.

# Tsconfig

Tsconfig é um arquivo de configuração do typescript.

## Criando

Para criar ele digite :

    tsc --init

## Configurações importantes

Existem diversas configurações que podem ser feitos nele, as principiais são :

    "outDir": "./scripts" 

Ele representa a pasta de saída dos scripts quando eles forem compilados.

    "noImplicitAny": true

Ele diz que não deve ser utilizado o any como tipagem de variáveis ou de parâmetros.

# Tipos

## boolean

Boolean é um tipo que determina verdadeiro (true) ou falso (false).

    let is_open : boolean;

## string

String são uma série de caracteres, existindo 3 formas de ser escritas ('foo', "foo", \`foo`)

    let message : string;

## number

Number são números :

    let age : number;

## array

Arrays são coleções, no caso dos arrays existem duas formas de se declarar : 

    let array : type[];
    let array : Array<type>;

    let list : number[];
    let array : Array<string>;

## tuple

Tuple é um array onde já se sabe o tipo de cada posição.

    let tuple : [type1, type2, type3];

## enum

Enum é um tipo que possui chave e valor semelhante ao objeto.

    enum colors {
        white = '#fff',
        black = '#000'
    }

## any

Any é qualquer coisa, no caso desse tipo o uso dele não é recomendado

    let value : any;

## void

O void é vazio, ele é utilizado para especificar funções que não retornam valor.

    function logger() : void {
        console.log('logger');
    };

## null / undefined

Null ou Undefined são tipos que não possuem valor.
    
    let value : null | undefined;

## never

Never indica que nunca terá retorno, normalmente utilizado em funções que criam erros, uma vez que ela quebra a execução do código.

    function error() : never {
        throw new Error('error');
    };

## object

Object é um objeto onde os elementos não tem o tipo definido, suportando muitos tipos.

    let obj : object;