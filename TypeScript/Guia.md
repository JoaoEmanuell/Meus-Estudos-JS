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