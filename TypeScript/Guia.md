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
- [Type Inference](#type-inference)
- [Union](#union)
- [Alias](#alias)
  - [Objetos](#objetos)
- [Intersection](#intersection)
- [Classes](#classes)
  - [Criando uma classe](#criando-uma-classe)
  - [Propriedades](#propriedades)
    - [Visibilidade](#visibilidade)
  - [Construtor](#construtor)
  - [Métodos](#métodos)
  - [Get](#get)
  - [Set](#set)
  - [Herança](#herança)
  - [Classe abstrata](#classe-abstrata)
  - [Instanciando uma classe](#instanciando-uma-classe)
- [Interfaces](#interfaces)
  - [Criando uma interface](#criando-uma-interface)
  - [Propriedades](#propriedades-1)
  - [Métodos](#métodos-1)
  - [Instanciando um objeto](#instanciando-um-objeto)
  - [Estendendo uma interface](#estendendo-uma-interface)
  - [Implementando uma interface](#implementando-uma-interface)
- [Generics](#generics)

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

# Type Inference

Type Inference é quando o typescript infere o tipo de uma variável, ou seja, se ela não for especificada, o typescript infere (coloca) o tipo de forma automática.

    let message = 'hello';

Esse let só irá aceitar valores do tipo string.

    message = '1';

No exemplo abaixo o typescript sabe que *e* é do tipo *MouseEvent*, não precisamos especificar o tipo, apesar disso poder ser feito, sendo assim *e* tem todos os métodos e propriedades do tipo MouseEvent.

    window.addEventListener("click", (e) => {
        console.log(e.target);
    });

# Union

Union serve para especificar que algo *um parâmetro, variável* pode ter vários tipos.

    let value : number | string;

# Alias

O Alias serve tanto para poupar linhas de código, quanto para evitar bugs.

**Nota** : Só é possível ter um type Alias com o mesmo nome por escopo, ele não permite a você reescrever, ou criar um novo com o mesmo nome.

    type StringOrNumber = string | number; 
    
Aqui especificamos que o tipo *StringOrNumber* é um *union* entre *string* e *number*.

    let value : StringOrNumber; 
    
Aqui especificamos que o tipo value é do tipo *StringOrNumber*, ou seja, ele pode ser *string* ou *number*.

    type Platform = 'windows' | 'linux' | 'mac';

Aqui dizemos que o tipo *Platform* só pode ser *windows*, *linux* ou *mac*, caso a variável ou o parâmetro não seja nenhum desses tipos, o typescript irá gerar um erro.

    function render_platform(platform : Platform) {
        console.log(`The platform is ${platform}`);
    };

    render_platform('windows');

Caso coloquemos *android* ou qualquer coisa diferente dos valores de *Platform*, o typescript irá gerar um erro.

## Objetos

Caso o *alias* seja do tipo objeto, você pode ter tanto *keys* obrigatórias quanto *keys* opcionais.

Utilizamos uma *?* após o nome da *key* para indicar que ela é opcional.

    type User = {
        name : string,
        age? : number
    };

*age* é **opcional**, pois ela tem uma *?* após a *declaração*.

# Intersection

Intersection é quando criamos um *alias* que une dois *alias* diferentes.

    type User = {
        name : string,
        age : number
    };

    type Admin = {
        name : string,
        age : number,
        is_admin : boolean
    };

    type UserOrAdmin = User & Admin;

    const user : UserOrAdmin = {
        name : "John Doe",
        age : 30,
        is_admin : false
    }

Sendo assim a constante *user* irá requisitar todos os dados dos *alias* User e Admin.

# Classes

## Criando uma classe

Primeiramente para criar uma classe é necessário definir o nome dela [iremos utilizar PascalCase para isso].

    class Class {. . .}

## Propriedades

Para definir as propriedades da classe, iremos fazer logo após a declaração dela, dentro do bloco da mesma, para definir uma propriedade é necessário colocar : 

  1. [visibilidade](#visibilidade) (public, private, protected, readonly)
  2. nome da propriedade
  3. [tipo da propriedade](#tipos)

    class Class {
        public name : string;
    }

### Visibilidade

public - A propriedade é visível para todos os outros métodos e classes, é a padrão então não precisa ser colocada.

    class Class {
        public name : string;
    }

private - A propriedade só pode ser acessada pela própria classe, não pode ser acessada por outras classes ou métodos externos.

    class Class {
        private name : string;
    }

protected - A propriedade só pode ser acessada pela classe que ela pertence e por classes que [estendem](#herança) ela.

    class Class {
        protected name : string;
    }

readonly - A propriedade só pode ser lida, não pode ser alterada.

    class Class {
        readonly name : string;
    }

## Construtor

O método construtor serve para 'construir' uma classe, ele será o método chamado ao instanciar a classe, deve ser passado as propriedades criadas para ele.

    class Class {

        public name : string;

        constructor(name : string) {
            this.name = name; // this serve para permitir que essa propriedade seja acessada dentro da classe.
        }
    }

## Métodos

Para declara um método você irá colocar :

1. O nome do método
2. Parâmetros do método
3. [Tipo de retorno](#tipos)

```

. . .

log_details() : void {
    console.log(`Name : ${this.name}`);
}

. . .

```

## Get

O get é uma espécie de método especial, que serve para retornar o valor de uma propriedade, por convenção se declara da seguinte forma :

    get get_name() : string {
        return this.name;
    }

## Set

O set é uma espécie de método especial, que serve para setar o valor de uma propriedade [desde que ela não seja do tipo readonly]. 

Por convenção se declara da seguinte forma :

    set set_name(name : string) {
        this.name = name;
    }

O set não deve ter retorno, nem utilize o *: void* para demonstrar que ele não retorna nada.

## Herança

A herança de *classes* no *typescript* é feita por de uma extensão da *classe mãe* para a *classe filha* : 

    class Class {
        public name : string;
    }

    class ChildClass extends Class {
        public age : number;
    }

O construtor deve incluir tanto as propriedades da *classe mãe* quanto as propriedades da *classe filha*, e deve ter um *super* passando os parâmetros para o construtor da *classe mãe*.

    class ChildClass extends Class {
        public age : number;
        constructor (name : string, age : number) {
            super(name); // Passando o parâmetro name para o construtor da classe mãe
            this.age = age;
        }
    }

## Classe abstrata

Classes abstratas são classes que **não** podem ser instanciadas, mas podem ser estendidas, ela serve como molde para outras classes.

    abstract class Class {
        public name : string;
    }

## Instanciando uma classe

    const class_instance = new Class('Class Name');

# Interfaces

## Criando uma interface

Para criar uma interface você irá utilizar a palavra chave *interface* e o nome da interface.

    interface Interface { . . . }

## Propriedades

Assim como nas classes as propriedades das interfaces também podem especificar a [visibilidade](#visibilidade) dela, além de indicar se elas são opcionais como no [alias](#alias) :

    interface Interface {
        readonly title : string;
        platform? : string[];
    }

## Métodos

Nas interfaces os métodos devem conter : 

1. Nome
2. Parâmetros
3. Tipo do retorno

```

interface Interface {
    log_details(log : string) : void;
}

```

## Instanciando um objeto

Para instanciar um objeto do tipo da interface [isso não é muito comum, mas pode ser feito], você deve passar os parâmetros como se estivesse criando um objeto :

    interface Interface {
        title : string;
        age : number;
    }

    const interface_object : Interface = {
        title : 'Hello World',
        age : 20
    }

Sendo assim você poderá acessar os valores da interface através do nome da propriedade.

    interface_object.title

## Estendendo uma interface

Uma interface pode estender outra, isso é semelhante ao conceito de herança : 

    interface Interface {
        title : string;
        age : number;
    }

    interface InterfaceExtended extends Interface {
        platform : string;
    }

No caso você também pode estender mais de uma interface, sendo assim é só passar o nome da outra interface separado por virgula :

    interface InterfaceExtended extends Interface, Interface2 { . . .}

Assim na hora de instanciar um objeto é necessário passar as propriedades de ambas as interfaces : 

    const interface_object : InterfaceExtended = {
        title : 'Hello World',
        age : 20,
        platform : 'Web'
    }

## Implementando uma interface

Esse é o uso mais comum das interfaces, a implementação dela em *classes*, sendo assim a *classe* deve ter todas as propriedades e métodos da interface :

    interface Interface {

        title : string;
        age : number;
        log_details() : void;

    }

    class InterfaceClass implements Interface {

        title : string;
        age : number;

        constructor (title : string, age : number) {
            this.title = title;
            this.age = age;
        }
        
        log_details() : void {
            console.log(`Name : ${this.title}`);
        }

    }

Lembre-se de passar as propriedades no construtor e permitir que elas sejam acessadas de qualquer lugar do código.

# Generics

Generics é uma forma de definir um tipo genérico, ou seja, um tipo que pode receber qualquer tipo de valor (esse tipo pode ser setado como sendo algum padrão) e uma vez que o tipo for definido ele não pode ser alterado.

    function generic< G extends tipo = tipo_padrão>() {. . .}

    function use_state< S extends number | string = string >() {. . .}

As letras tem significados diferentes : 

S => State
T => Type
K => Key
V => Value
E => Element

Normalmente são utilizados essas por padrão.

Iremos dizer que o tipo genérico pode ser tanto *number* como *string* e por padrão é uma *string*.

    function use_state< S extends number | string = string >() {

        let state : S;

        function get_state() : S {
            return state;
        };

        function set_state(new_state : S) : void {
            state = new_state;
        };

        return {get_state, set_state};
    };

    const new_state = use_state();

Iremos setar state como sendo uma *string*, dessa forma só poderemos alterar para novas *strings*.

    new_state.set_state('foo');

    new_state.set_state('bar');

Caso tentemos setar para um *number*, ele irá da erro : 

    new_state.set_state(1);

Agora caso no inicio dizemos que ele é um *number*, só poderemos alterar esse valor para *numbers* : 

    const new_state = use_state<number>();
    new_state.set_state(123);
    new_state.set_state(321);

Caso tentemos setar para uma string, ele irá da erro : 

    new_state.set_state('foo');
