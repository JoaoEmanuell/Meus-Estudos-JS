# Menu

- [Menu](#menu)
- [EXPORTS](#exports)
  - [SERVIDOR](#servidor)
- [Express](#express)
  - [PARAMENTOS-NAS-ROTAS](#paramentos-nas-rotas)
  - [ENVIANDO-ARQUIVO-HTML-PELA-ROTA.](#enviando-arquivo-html-pela-rota)
  - [Grupo de rotas](#grupo-de-rotas)
    - [Arquivo de rota](#arquivo-de-rota)
    - [Arquivo principal](#arquivo-principal)
  - [Renderizando templates nos grupos de rotas](#renderizando-templates-nos-grupos-de-rotas)
  - [Configurando a pasta com os arquivos estaticos](#configurando-a-pasta-com-os-arquivos-estaticos)
- [Nodemon](#nodemon)
- [Sequelize](#sequelize)
  - [Criando tabelas](#criando-tabelas)
  - [Criando dados](#criando-dados)
- [Handlebars](#handlebars)
  - [Renderizar templates](#renderizar-templates)
  - [Enviando dados via post](#enviando-dados-via-post)
  - [Dividindo template em partes](#dividindo-template-em-partes)
- [Body-Parse](#body-parse)
- [Listando-os-dados-do-banco-de-dados](#listando-os-dados-do-banco-de-dados)
- [Apagando dados do banco de dados](#apagando-dados-do-banco-de-dados)
- [Mongoose](#mongoose)
  - [Mongoose](#mongoose-1)
    - [Instalando o pacote](#instalando-o-pacote)
    - [Configurando uma conexão com o banco de dados](#configurando-uma-conexão-com-o-banco-de-dados)
    - [Métodos anti-bug](#métodos-anti-bug)
  - [Criando um modelo de dados](#criando-um-modelo-de-dados)
  - [Inserindo valor no modelo](#inserindo-valor-no-modelo)
  - [Listando os dados do banco de dados](#listando-os-dados-do-banco-de-dados-1)
  - [Editando os dados do banco de dados](#editando-os-dados-do-banco-de-dados)
  - [Deletando dados do banco](#deletando-dados-do-banco)
- [Middlewares](#middlewares)
  - [Declarando um Middleware](#declarando-um-middleware)
- [Sessions](#sessions)
  - [Instalações](#instalações)
  - [Configurando Sessions](#configurando-sessions)
  - [Enviando dados para o session](#enviando-dados-para-o-session)
  - [Acessando a session em um template partial](#acessando-a-session-em-um-template-partial)

****


# EXPORTS

Para exportar um objeto / função / variavel...
Você deve criar um arquivo com o nome que você deseja e dentro dele criar o objeto que será exportado, após o objeto ser criado você deve colocar o export default para exportar o objeto.

```
function sum (a,b) { return a+b; }
module.exports = sum;
```

Então para usar o objeto que foi exportado, você deve importar o objeto por meio da função require, passando o caminho até o arquivo e atribuindo a uma variavel, por definição todo objeto que foi exportado deve ter o mesmo nome do arquivo que ele está.

```
var sumFunction = require("./source/sum");
```

Dessa forma poderá ser usado a função soma mesmo ela estando em outro arquivo.

## SERVIDOR

Para criar um servidor é necessário importar o modulo http do node.

```
var http = require('http');
```

Após isso utilize a função createServer para criar um servidor e o método listen passando a porta onde o servidor irá responder.
```
http.createServer(. . .).listen(porta);
```
Dentro da função createServer ela recebe um callback (nada mais é do que uma função que recebe dois paramentros um chamado req [requisição] e outro chamado res que é a resposta do servidor) que é chamado quando o servidor recebe uma requisição, para retornar algo para o usuario você pode utilizar :

    res.end("Mensage");

Exemplo : 

    var http = require('http');

    http.createServer(function(req, res){
        res.end("Hello World");
    }).listen(8786);

****

# Express

https://expressjs.com // site do express

Express é um framework para javascript que facilita a criação de aplicações web.

Primeiro instale o express com o comando:
    
    npm install express --save

Para utilizar o express você irá criar uma constante chamada express que irá requerir o express.

    const express = require("express");

O retorno desse require é uma função

Depois crie uma constante app que irá chamar a função express

    const app = express();

O express é orientado a rotas, então para criar uma rota é necessário utilizar o método app.get, passando o caminho que será acessado e o callback que será chamado quando o usuario acessar o caminho.

    app.get("/nome_da_rota", function(req, res){
        res.send("Resposta da rota");
    });

    app.get("/", function(req, res){
        res.send("Hello World");
    });

Para executar o servidor você deve utilizar o método app.listen, passando a porta que será utilizada e uma função de callback que será chamada quando o servidor estiver pronto.

    app.listen(porta, function(){
        console.log("Server is running on port porta");
    });

    app.listen(8081, function(){
        console.log("Server is running on port 8081");
    });

## PARAMENTOS-NAS-ROTAS

Para criar um paramentro na rota faça o seguinte :

    app.get("/nome_rota/:nome_do_paramentro")

Para utlizar os dados do paramentro utilize a função de callback e no paramentro req você utilize .params.nome_do_paramentro :

    app.get("/nome_rota/:nome_do_paramentro", function(req, res){
        res.send(req.params.nome_do_paramentro);
    });

Exemplo :

    app.get("/hello/:name", function(req, res) {
        res.send(`<h1>Hello ${req.params.name}!</h1>`);
    });

## ENVIANDO-ARQUIVO-HTML-PELA-ROTA.

Para enviar uma arquivo html utilize o res.sendFile passando o caminho até o arquivo.

    app.get("/rota", function(req, res){
        res.sendFile(__dirname + "/index.html"); // A variavel __dirname serve para indicar o caminho completo até a aplicação.
    });

    app.get("/", function(req, res) {
        res.sendFile(`${__dirname}/templates/html/index.html`);
    });

## Grupo de rotas

Grupo de rotas é uma forma fácil de gerenciar rotas sem ter que colocar todas elas no mesmo arquivo.

Crie uma pasta com o nome routes que irá ter as rotas, para organizar o projeto.

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/151057811-2f2fb62a-851b-47d4-a5a0-69912de6cdb8.png" alt="Routes directory example"/>
</p>

Dentro dessa pasta crie um arquivo js que irá ter algumas rotas.

### Arquivo de rota

Dentro desse arquivo você deve ter duas constantes, uma é o express e a outra é o Router que irá direcionar as rotas.

    const express = require("express");
    const router = express.Router();

Para criar uma rota nova nesse arquivo você deve fazer o seguinte :

    router.get("/nome_da_rota", function(req, res){
        res.send("Resposta da rota");
    });

Exemplo :

    router.get('/', (req, res) => {
        res.send('Admin Page');
    });

Exporte o router para o arquivo principal.

    module.exports = router;

### Arquivo principal

Dentro do seu arquivo principal importe o arquivo de rotas, de preferencia que o nome da constante seja o mesmo do arquivo de rotas.

    const index = require("./routes/index");

    const admin = require("./routes/admin");

Para o app utilizar o arquivo de rotas use : 

    app.use('/prefixo_da_rota', index);

    app.use('/admin', admin);

Esse prefixo da rota serve para acessar as rotas, sendo assim será necessario colocar :

    http://localhost:8081/prefixo_da_rota/rota

## Renderizando templates nos grupos de rotas

Para renderizar templates devemos criar uma pasta com o nome do nosso grupo de rotas dentro da nossa pasta views

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/151227977-24221a21-24db-44e7-9ee1-98479b52f914.png" alt="Example"/>
</p>

Dentro dessa pasta os nossos arquivos de template do grupo de rotas serão mantidos.

Para renderizar um template devemos utilizar : 

    router.get('/rota', (req, res) => {
        res.render('./pasta_template_grupos/template');
    });

    router.get('/', (req, res) => {
        res.render('./admin/index');
    });

## Configurando a pasta com os arquivos estaticos

Dentro do seu arquivo main utilize : 

    const path = require("path")

Nas configs utilize : 

    // Public
        
    app.use(express.static(path.join(__dirname, 'public')));

*__dirname* é uma variavel padrão do node que indica o caminho absoluto até o diretório atual.

Agora para utilizar os arquivo estaticos basta ir no seu template e digitar 

    <tag>/pasta/arquivo.extensão</tag>

    <img src="/img/logo.png" alt="Logo"/>

****

# Nodemon

O Nodemon é um pacote que executa o código automaticamente caso ele seja alterado.

Primeiramente instale ele a flag -g serve para instalar ele de forma global.

    sudo npm install nodemon -g

Após isso para executar utilize :

    nodemon nome_arquivo.js

****

# Sequelize

https://sequelize.org // site do sequelize

Sequelize é um pacote que facilita a conexão com o banco de dados.

Primeiramente instale o pacote com o comando:

    npm install --save sequelize

Para utilizar o mysql você irá precisar de outro pacote, instale ele :

    npm install --save mysql2

Depois crie uma constante que irá receber a função Sequelize.

    const Sequelize = require("sequelize");

Depois crie uma constante que irá receber todos os dados de Sequelize, dentro dessa constante você deve passar a database, nome de usuario, senha e um objeto contendo dois campos o primeiro chamado de host que é o endereço do banco de dados e o segundo chamado de dialect que é o tipo de banco de dados que será utilizado.

    const sequelize = new Sequelize("database", "username", "password", {
        host: "localhost",
        dialect: "mysql"
    });

Exemplo : 

    const sequelize = new Sequelize('NODE', 'root', 'root', {
        host : "localhost",
        dialect : "mysql",
    });

Dessa forma a conexão será criada com sucesso, para verificar se a conexão foi bem sucedida você pode fazer o seguinte :

    sequelize.authenticate().then(function(){
        console.log("Conectado com sucesso");
    }).catch(function(erro){
        console.log("Falha ao se conectar : " + erro);
    }); 

## Criando tabelas

https://sequelize.org/v5/manual/data-types.html // Documentação dos tipos de dados do sequelize.

https://sequelize.org/v5/manual/models-definition.html // Documentação dos models do sequelize.

Para criar uma tabela importe o sequelize e o connection que está conectando com o banco de dados :

    const Sequelize = require("sequelize");
    const connection = require('./connection');

Depois crie uma constante que irá receber a tabela, dentro dele você irá passar o nome da tabela e um json com os campos da tabela.

const Nome = connection.define('nome_tabela', {
    campo : {
        type : Sequelize.type,
        constrags
    }
})

Exemplo :

    const User = connection.define('user', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        }
    });

// O id não é necessario o sequelize acaba criando ele de forma automatica.

// allowNull indica que aquele campo não pode ser nulo.

Para enviar a sua tabela para o mysql utilize : 

    Nome.sync({force : true});

Exemplo :

    User.sync({force : true});

## Criando dados

Para criar um dado utilize o método create :

    Nome.create({
        campo : valor
    });

Exemplo :

    User.create({
        name : "Nome",
        password : "senha"
    });

Dessa forma o dado será automaticamente enviado para o banco de dados assim que o código for executado.

****

# Handlebars

Handlebars é uma template engine que permite que você crie páginas dinâmicas, adicionando mais funcionalidades ao html.

Para instalar o pacote utilize o comando :

    npm install --save express-handlebars

Para configurar o handlebars no arquivo js faça o seguinte : 

    const exphbs = require("express-handlebars"); // constante chamada de express-handlebars.
    const handlebars = exphbs.create({ defaultLayout: "main" }); // constante de configuração do handlebars, dentro dele iremos criar um novo objeto handlebars e configurar para o layout padrão dele ser o main.

Para configurar o handlebars no app faça o seguinte :

    app.engine("handlebars", handlebars.engine); // configuração do handlebars no app.
    app.set("view engine", "handlebars"); // Seta o handlebars como a engine padrão para templates.

Para utilizar o handlebars seguindo o modelo acima é necessario criar uma pasta chamada views e dentro dela outra chamada de layouts, dentro dessa pasta layouts você deve criar um arquivo chamado de main.handlebars, esse arquivo será o arquivo que será utilizado como layout padrão, normalmente é utilizado um arquivo com o template html simples.

<p align="center">
  <img src="https://user-images.githubusercontent.com/81983803/150643908-fad42cd9-fe8b-4350-81f3-5f598bb62fbe.png" alt="directory-tree"/>
</p>

Dentro do body do arquivo main.handlebars você deve colocar "{{{body}}}", isso será subisituido pela outra view quando ela for chamada pela rota, ai nesse caso não será necessario criar o html padrão, somente o que você deseja exibir.

## Renderizar templates

Para renderizar um template utilize o método render dentro da sua rota:

    app.get('/rota', function(req, res) {
        res.render('nome_view');
    });

    app.get('/cad', function(req, res) {
        res.render('form');
    });

Os templates devem estar dentro da pasta views, como já temos o template padrão configurado devemos apenas colocar os elementos desejados no nosso novo template.

## Enviando dados via post

Dentro da tag form você deve colocar o método post, e um action que irá redirecionar para a rota desejada.

    <form action="/rota" method="POST">...</form>

Exemplo :

    <form action="/visualize" method="POST">...</form>

Dessa forma os dados serão enviados para a rota especificada.

No app você deve criar uma rota do tipo post, essa rota só poderá ser acessada quando um evento do tipo post for acionado.

    app.post('/nome_rota', function(req, res) {
        res.send('Send');
    });

Exemplo :

    app.post('/visualize', function(req, res) {
        res.send('Form added');
    });

Rotas do tipo post não podem ser acessadas pela url, se ela for colocado como tipo get ela não irá funcionar.

## Dividindo template em partes

Dividir um template em partes siginifica que podemos utilizar ele diversas vezes.

Para dividir o template devemos criar uma pasta chamada "partials" dentro da nossa pasta views, essa pasta irá guardar os templates divididos.

<p align="center">
    <img src="https://user-images.githubusercontent.com/81983803/151228796-75c5f392-f333-4eeb-9835-56517d7b58ce.png" alt="Exemple"/>
</p>

A nomeclatura do template dividido deve ser "_nome_template"

Para utilizar o template dividido vá no template desejado e digite :

{{>_nome_template}}

Esse > antes do nome do template serve para indicar ao handlebars que ele é um template dividido.

Dessa forma o template será utilizado dentro do site.

****

# Body-Parse

O pacote body-parser é um pacote que permite que você receba dados via post, ou seja, dados que serão enviados via formulário e tratar esses dados no seu back-end.

Para instalar o pacote utilize o comando :

    npm install --save body-parser

Para configurar o body-parser no app faça o seguinte :

    const bodyParser = require("body-parser"); // constante chamada de body-parser.
    app.use(bodyParser.urlencoded({ extended: false })); // configuração do body-parser, dentro dele iremos passar um json com um objeto que irá permitir que o body-parser entenda o formato urlencoded.
    app.use(bodyParser.json());

Dessa forma o bodyParser está configurado.

Para pegar os valores que vem via post na rota desejado você deve fazer o seguinte :

    app.post('/visualize', function(req, res) {
        const nome_elemento = req.body.nome_elemento;
        res.send(nome_elemento);
    });

Exemplo :

    app.post('/visualize', function(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        res.send(`<p>Title : ${title}</p><p>Content : ${content}</p>`);
    });

Dessa forma o dado que foi passado será atribuindo a constante indicada e você poderá utiliza-lo da maneira que desejar.

    res.redirect('/rota'); // redireciona para a rota especificada.

****

# Listando-os-dados-do-banco-de-dados

Primeiramente no arquivo js na rota especificada precisamos pegar todos os dados do banco de dados, para isso utilizaremos o método findAll que pertence ao objeto que está com o modelo de dados :

    app.get('rota', function(req, res) {
        Nome.findAll({
            {order : [['id', 'desc']]} // Esse order serve para ordernar do mais novo para o mais antigo.
        }).then(function(dados) {
            res.render("template", {dados : dados}); // Isso irá enviar os dados para o template
        });
    });

Exemplo : 

    app.get('/', function(req, res) {
        Post.findAll({order : [['id', 'desc']]}).then(function(posts) {
            res.render("home", { posts: posts });
        });
    });

O retorno de Post.findAll é um objeto que contém todos os dados do banco de dados.

    /* Essa solulção só funciona no express-handlebars 3.0.0 e utilizando a 
    "devDependencies": {
        "handlebars": "^4.5.0"
    }

    Pois o handlebars atualizou e acabou invalidando essa forma de enviar dados.
    */

Para exibir os dados na pagina você deve fazer o seguinte no seu arquivo de layout :

    {{#each dados}} <!--Essa estrutura é semelhante ao for in do python, ela basicamente pega os dados de dados e permite que utilizemos eles.-->
        <div>
            <p>{{dado_valor}}</p>
        </div>
    {{/each}}

    Exemplo :

    {{#each posts}}
        <div>
            <h1>{{title}}</h2>
            <p>{{content}}</p>
            <p>{{createdAt}}</p>
        </div>
    {{/each}}

Dessa forma os dados serão exibidos na página.

****

# Apagando dados do banco de dados

Para apagar um dado do banco de dados você deve utilizar : 

    Objeto_banco_de_dados.destroy({
        where : {
            campo : valor
        }
    });

Exemplo :

    app.get('/delete/:id', function(req, res) {
        Post.destroy(
            {where : {id : req.params.id}} // Destrua o registro onde o id seja igual o id passado na rota
        ).then(function() {
        res.redirect('/'); // Caso seja bem sucedido redirecione para a rota /
        });
        }).catch(function(err) {
            res.send(`Erro ao deletar post ${err}`); // Caso ocorra algum erro, mostre o erro.
        }
        );
    });

Dessa forma o dado será apagado do banco de dados.

****

# Mongoose

## Mongoose

Mongoose é um pacote que permite trabalhar com o mongodb

### Instalando o pacote

    npm install --save mongoose

### Configurando uma conexão com o banco de dados

Para conectar com o banco de dados crie um objeto que irá ter o mongoose

    const mongoose = require('mongoose'); // Objeto que irá ter o mongoose

Configure ele para utilizar a promisse do node.js

    mongoose.Promise = global.Promise; // Configura o mongoose para utilizar o promise do node.js

Para conectar ele com banco de dados você irá passar "mongodb://localhost/nome_do_banco" e parametros opcionais para evitar erros.

    mongoose.connect('mongodb://localhost/node', {
        // Paramentors de conexão com o banco de dados
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB'); // Caso a conexão seja bem sucedida, mostre a mensagem de conexão.
    }).catch(err => {
        console.log(`Error connecting to MongoDB ${err}`); // Caso ocorra algum erro, mostre o erro.
    });

Dessa forma você estará conectado com o banco de dados.

### Métodos anti-bug

    mongoose.set('useFindAndModify', false); 
    
Remove a mensagem :

*"DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify (Use `node --trace-deprecation ...` to show where the warning was created)"*

Ao utilizar os métodos *findOneAndUpdate* e *findOneAndDelete*

## Criando um modelo de dados

Para criar um novo modelo de dados utilizando o mongoose você deve criar um objeto que irá ter o modelo de dados.

    const mongoose = require('mongoose'); // Objeto que irá ter o mongoose
    const name_Schema = mongoose.Schema({. . .}); // Objeto que irá ter o Schema

Esse objeto dentro de Schema são os campos do model, eles são referenciados por : 

    nome : {
        type : tipo_do_dado,
        required : true, // Caso seja definido como true, o campo é obrigatório, por padrão é false.
        default : valor_padrão, // Caso nenhum valor seja passado esse valor será utilizado.
    }

Exemplo : 

    name : {
        type: String,
        required: true
    }

O mongoose permite trabalhar com os tipos do javascript.

[Documentação do mongoose com os tipos de dados.](https://mongoosejs.com/docs/schematypes.html)

Para exportar o model você deve utilizar : 
    
    module.exports = mongoose.model('nome_do_modelo', name_Schema);

Exemplo : 

    const mongoose = require('./connection.js');

    // Create a schema

    const User_Schema = mongoose.Schema({
        name : {
            type: String,
            required: true
        }, 
        email : {
            type: String,
            required: true
        },
        password : {
            type: String,
            required: true
        },
        age : {
            type: Date,
            required: true
        },
        country : {
            type: String
        }
    });

    mongoose.model('User', User_Schema); // Export the model

## Inserindo valor no modelo

Para inserir valor no modelo primeiro você deve criar uma constante que irá receber o modelo.

    const constante = mongoose.model('nome_do_modelo');

Exemplo : 

    const new_user = mongoose.model('User');

Para inserir dados nesse modelo você deve utilizar a seguinte sintaxe : 

    new constante({
        campo : 'valor'
    }).save(); // Salve o dado no banco de dados.

Exemplo : 

    new new_user({
        name : 'root',
        email : 'root@root.com.br',
        password : 'root',
        age : new Date(2000, 1, 1),
        country : 'Brasil'
    }).save();

## Listando os dados do banco de dados

Para listar os dados é bastante simples, primeiramente chame o metodo find do objeto de banco de dados que você deseja listar e dentro do find passe um objeto vazio *esse objeto vazio irá retornar todos os dados, caso queira retornar dados especificos coloque {campo : 'valor'}*, depois chame o método *lean* ele irá converter os dados em modo json ao inves do objeto virutal mongoose e por fim chame o método *exec* que irá executar a consulta, crie um then para o retorno do método find e passe ele para onde você desejar exibir os dados.

[Documentação contendo o find](https://mongoosejs.com/docs/api.html#model_Model.find)

    OBJ.find({}).lean().then(function(data) {
        console.log(data);
    });

Entre o *find* e o *lean* você pode utilizar varios paramentros, entre eles está o sort, que quando passado um objeto com o campo e o valor, irá ordenar os dados por esse campo.

**Nota os valores que podem ser passados são : "asc, desc, ascending, descending, 1, and -1"**

[Documentação com o sort](https://mongoosejs.com/docs/api.html#query_Query-sort)

[Documentação com o lean](https://mongoosejs.com/docs/api.html#query_Query-lean)

Exemplo :

    Category.find({}).sort({
        date : 'desc'
    }).lean().exec().then((categories) => {
        res.render('./admin/categories', {categories : categories});
    })

Você também pode retornar apenas um elemento por meio do *findOne* passando um objeto com campo e valor desejados.

    Category.findOne({_id : req.params.id}).lean().exec().then((category) => {
        res.render('./admin/editcategories', {category : category});
    }).catch(err => {
        req.flash('error_msg', `Erro, categoria inexistente`);
        res.redirect('/admin/categories');
    }
    );

## Editando os dados do banco de dados

Para editar dados do banco precisamos utilzar o método *findOneAndUpdate*, passando 2 objetos, o primeiro objeto será a query que irá selecionar aquele elemento especifico que desejamos editar e o segundo campo será o objeto que irá atualizar os dados.

    ObjetoBanco.findOneAndUpdate({campo : valor}, {campo : valor_modificado}).lean().exec()

Exemplo :

    Category.findOneAndUpdate({_id : req.body.id}, { name : new_category.category.name, slug : new_category.category.slug }).lean().exec().then(() => {
        req.flash('success_msg', `Categoria editada com sucesso`);
        res.redirect('/admin/categories');
    }).catch(err => {
        req.flash('error_msg', `Erro ao editar categoria`);
        res.redirect('/admin/categories');
    });

## Deletando dados do banco

Para deletar o um dado do banco utilizaremos o método deleteOne passando uma query com o campo e o valor que desejamos deletar.

    ObjetoBanco.deleteOne({campo : valor}).lean().exec()

Exemplo :

    Category.deleteOne({_id : req.params.id})
****

# Middlewares

Middlewares são funções que atuam entre o cliente e o servidor, básicamente o cliente faz uma requisição ao servidor e a resposta do servidor passa pelo Middleware antes de ser entregue ao cliente.

## Declarando um Middleware

    // Middlewares

    app.use((req, res, next) => {
        [ . . . ]
        next(); // Sempre coloque o next no final do middleware pois se não for colocado ele não irá retornar nada para o cliente e a pagina irá ficar carregando infinitamente.
    });

Exemplo :

    // Middlewares

    app.use((req, res, next) => {
        console.log(`${req.url}`);
        next();
    });

****

# Sessions

Sessions são dados que ficam guardados do lado do servidor, o úsuario recebe uma chave e então quando o úsuario acessa a aplicação passando essa chave os dados podem ser transeferidos para o lado do cliente [seria semelhante ao cookie mas com um maior poder de armazenamento].

## Instalações

    npm install --save express-session@1.15.6

    npm install --save connect-flash@0.1.1

## Configurando Sessions

Para configurar um session você deve criar um objeto que irá ter o session e um objeto que irá ter o flash.

    const session = require('express-session');
    const flash = require("connect-flash");

Após isso configurar no seu app :

    app.use(session({
        secret: "secret", // Isso é a chave secreta,quanto maior a chave mais seguro.
        resave: true,
        saveUninitialized: true
    }));

    app.use(flash());

Agora configure o middleware para a session : 

    // Middlewares

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });

As duas variaves criadas "success_msg" e "error_msg" irão receber as mensagens de sucesso e erro, elas são variaves globais e podem ser acessadas em qualquer lugar do código do projeto.

## Enviando dados para o session

Para enviar dados para o session você deve utilizar o seguinte dentro da sua rota :

    req.flash("Nome_da_session", "Mensagem");

    req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente');

Dessa forma essa mensagem se tornará uma variavel global e poderá ser acessada de qualquer lugar do código do projeto.

****

## Acessando a session em um template partial

Para acessar a session em um template você utilza o seguinte : 

    {{#if nome_session}}
        {{success_msg}}
    {{/if}}

    {{#if success_msg}}
        <div class="alert alert-success">
            {{success_msg}}
        </div>
    {{/if}}

O if irá servir para validar se a session existe, caso exista ele irá exibir a mensagem, caso não exista ele irá não exibir nada.

Para exibir essa mensagem na pagina, após o envio pelo flash coloque um redirect para o template desejado.

    res.redirect('/admin/categories');

E dentro do seu template adicione o template partial

    <div>
        {{>_msg}}
    </div>

Quando o redirect for ativado a mensagem será exibida, caso a pagina seja recaregada a mensagem será excluida.

**Nota : O redirect deve estar no mesmo bloco do flash, caso contrario a mensagem não irá ser enviada!**
****