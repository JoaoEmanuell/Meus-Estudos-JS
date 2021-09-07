class jokes{
    constructor(){
        this.main();
    }
    /**
     * Main method
     */
    main(){
        const quest = this.question();
        const answer = this.answers();
        const number = this.getNumber(quest);
        mensage(`${quest[number]}\n${answer[number]}`);
    }
    /**
     * get random number for array.
     * @param {Array} Array list 
     * @returns A random number, this number is a random position of the Array.
     */
    getNumber(list){
        return Math.floor(Math.random() * list.length);
    }
    /**
     * A list for joke questions.
     * @returns list of jokes question.
     */
    question(){
        const quest = ['O que o pato disse para a pata?', 'Porque o menino estava falando no telefone deitado?', 'Qual é a fórmula da água benta?', 'O que o pintinho falou para a mãe dele?', 'Qual a cidade brasileira que não tem táxi?', 'O que o tijolo falou para o outro?', 'Porque o jacaré tirou o filho da escola?', 'Porque o Batman colocou o bat-móvel no seguro?', 'Quem é a vó dos trigos?', 'Qual é o alimento mais sagrado que existe?', 'Porque o rádio não pode ter filhos?', 'Por que o policial não usa sabão?','Por que as plantas pequenas não falam?', 'Qual a fruta que anda de trem?', 'O que é um astrólogo andando a cavalo?', 'Como se faz omelete de chocolate?', 'O que um cromossomo falou pro outro?', 'O que é um pontinho preto no avião?', 'Como que o mineiro usa a internet?', 'Qual é a galinha que cai no chão e surta?', 'Como que o Batman faz para entrar na Bat-caverna?','Qual é a diferença do lago e da padaria?', 'Qual é o melhor tratamento para pessoas que sofrem de queda constante?', 'Um tênis foi jogado ao mar e afundou. Qual o nome do filme?', 'Um garotinho tinha um cachorro chamado Tido e ele dormia em um cesto. Um dia, o cachorrinho fugiu, qual é o nome do filme?', 'Qual é a canção que emociona a pêra?', 'Uma menina chamada Fonia pediu seu melhor amigo em namoro. O que ele respondeu?', 'Qual é o tio da construção?', 'O que um álcool disse para outro álcool?', 'O que é uma pulga do lado de uma letra A?','Qual a semelhança entre eu, nós e um cantor de pop?', 'Um triângulo estava voando e o outro não. Porquê?', 'Como o médico descreve o nascimento do filho de Zeus?', 'Como que o Batman dorme?', 'Por que o pão não entende a batata?', 'Por que as estrelas não podem ser gatos?', 'Por que um frango conseguiu voar e o outro não?', 'O que a zebra disse para a mosca?', 'Quem são as dançarinas do Diabo?', 'Sabe porque o rapaz jogou o computador no mar?', 'Por que na Argentina as vacas vivem olhando pro céu?', 'Dois litros de leite atravessaram a rua e foram atropelados. Um morreu, o outro não, por quê?', 'Por que a Dora aventureira aprendeu capoeira?', 'O que tem 4 patas e voa?', 'O que o tubarão disse quando comeu o peixe-palhaço?', 'Porque coalas não são ursos de verdade?', 'Que raça de cachorro pula mais alto que um prédio?', 'O que o advogado do frango foi fazer na delegacia?', 'Por que a mulher do Hulk se divorciou dele?', 'Você conhece a piada do fotógrafo?', 'Sabe por que na nota de 100 tem um peixe?'];
        return quest;
    }
    /**
     * A list for joke answers.
     * @returns list of jokes answers.
     */
    answers(){
        const answer = ['Vem Quá!', 'Para não cair a ligação!', 'H Deus O!', 'Oi mãe!', 'Uberlândia!', 'Há um ciumento entre nós.', 'Porque ele réptil de ano.', 'Porque ele tem medo que Robin! (Roubem)', 'Avéia Quacker!', 'O amém doim.', 'Porque ele é stereo.', 'Porque ele prefere deter gente.', 'Porque elas são mudinhas.', 'O kiwiiiii.', 'Um Cavaleiro do Zodíaco.', 'Com ovos de páscoa.', 'Cromossomos bonitos! (Como somos bonitos)', 'Uma aeromosca', 'Pelo UAI-fai', 'A galinha cai-i-pira;', 'Ele bat-palma', 'No lago há sapinho e na padaria assa pão', 'Para-quedismo', 'Titanike', 'O Cesto sem Tido (O Sexto Sentido);', 'Ópera', 'Sinfonia', 'O Tio Jolo', 'Etanois', 'Um Assaltante', 'Eu rio, nós lago e o Bruno Mars', 'Porque um era uma asa delta', 'Ele disse que foi chocante!', 'De bruce! (De bruços)', 'Porque o pão é francês e a batata é inglesa', 'Porque astro não mia (astronomia)', 'Porque um era frango a passarinho', 'Você está na minha lista negra', 'As Diabetes', 'Pra ele navegar na internet!', 'Porque tem “Boi nos Ares”! (Buenos Aires)', 'Porque um deles era leite longa vida!', 'Para ela dar voa-Dora;', 'Um casal de passarinhos', 'Que gosto engraçado!', 'Porque eles não tem coalificações (qualificações);', 'Qualquer uma, porque prédio não pula.', 'Foi soltar a franga!', 'Porque ela queria um homem mais maduro', 'Ela ainda não foi revelada!', 'Porque dinheiro que é bom nada!'];
        return answer;
    }
}